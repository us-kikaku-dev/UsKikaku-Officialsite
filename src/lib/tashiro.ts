import {
  client,
  capitalVoiceClient,
  TashiroArticle,
  CapitalVoiceArticle,
} from './client';

// CVJのインタビュアー(コンテンツ参照)で田代氏に該当するID
const TASHIRO_INTERVIEWER_ID = '4c-d2skvh';
const CAPITAL_VOICE_BASE = 'https://capital-voice.com';
const MAX_PER_REQUEST = 100; // microCMS APIの1回あたり最大取得件数

export type UnifiedTashiroArticle = {
  id: string;
  source: 'tashiro' | 'capital_voice';
  title: string;
  date: string;
  image?: { url: string; width?: number; height?: number };
  url: string;
  media: string;
  category?: string[];
};

type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

/**
 * microCMSのリストAPIから全件取得する。
 * 1回目のレスポンスのtotalCountを見て、不足分を並列で追加取得してマージする。
 * fetchPage には offset を引数に取り、その offset から MAX_PER_REQUEST 件を返す関数を渡す。
 */
async function fetchAllPages<T>(
  fetchPage: (offset: number) => Promise<MicroCMSListResponse<T>>,
): Promise<T[]> {
  const first = await fetchPage(0);
  if (first.totalCount <= MAX_PER_REQUEST) {
    return first.contents;
  }

  const additionalOffsets: number[] = [];
  for (
    let offset = MAX_PER_REQUEST;
    offset < first.totalCount;
    offset += MAX_PER_REQUEST
  ) {
    additionalOffsets.push(offset);
  }

  const additionalPages = await Promise.all(
    additionalOffsets.map((offset) => fetchPage(offset)),
  );

  return [
    ...first.contents,
    ...additionalPages.flatMap((page) => page.contents),
  ];
}

const normalizeTashiroArticle = (a: TashiroArticle): UnifiedTashiroArticle => ({
  id: `tashiro-${a.id}`,
  source: 'tashiro',
  title: a.title,
  date: a.date,
  image: a.image,
  url: a.url,
  media: a.media,
  category: a.category,
});

const normalizeCapitalVoiceArticle = (
  a: CapitalVoiceArticle,
): UnifiedTashiroArticle => ({
  id: `cvj-${a.id}`,
  source: 'capital_voice',
  title: a.title,
  date: a.publishdate || a.publishedAt,
  image: a.eyecatch,
  url: `${CAPITAL_VOICE_BASE}/article/${encodeURIComponent(a.id)}`,
  media: 'Capital Voice Japan',
  category: a.category,
});

/**
 * 田代氏の執筆記事を両APIから取得し、日付降順でマージして返す。
 * - Tashiro microCMS: 全件(田代氏寄稿の前提)
 * - Capital Voice Japan microCMS: interviewer = 田代氏 で絞り込み
 * 各ソースとも100件超でも全件取得する。
 * 片側が失敗してももう片方の結果は返す。
 */
export const fetchUnifiedTashiroArticles = async (): Promise<
  UnifiedTashiroArticle[]
> => {
  const [tashiroRes, cvjRes] = await Promise.allSettled([
    fetchAllPages<TashiroArticle>((offset) =>
      client.get({
        endpoint: 'article',
        queries: { limit: MAX_PER_REQUEST, offset, orders: '-date' },
      }) as Promise<MicroCMSListResponse<TashiroArticle>>,
    ),
    fetchAllPages<CapitalVoiceArticle>((offset) =>
      capitalVoiceClient.get({
        endpoint: 'articles',
        queries: {
          limit: MAX_PER_REQUEST,
          offset,
          orders: '-publishdate',
          filters: `interviewer[equals]${TASHIRO_INTERVIEWER_ID}`,
        },
      }) as Promise<MicroCMSListResponse<CapitalVoiceArticle>>,
    ),
  ]);

  const tashiroArticles =
    tashiroRes.status === 'fulfilled'
      ? tashiroRes.value.map(normalizeTashiroArticle)
      : [];
  if (tashiroRes.status === 'rejected') {
    console.error('Failed to fetch Tashiro articles:', tashiroRes.reason);
  }

  const cvjArticles =
    cvjRes.status === 'fulfilled'
      ? cvjRes.value.map(normalizeCapitalVoiceArticle)
      : [];
  if (cvjRes.status === 'rejected') {
    console.error(
      'Failed to fetch Capital Voice Japan articles:',
      cvjRes.reason,
    );
  }

  return [...tashiroArticles, ...cvjArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

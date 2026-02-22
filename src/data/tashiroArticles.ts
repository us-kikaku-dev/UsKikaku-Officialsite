export type TashiroArticle = {
  id: string;
  title: string;
  media: string;
  date: string;
  image: string;
  url: string;
  order?: number;
  category?: string;
};

/**
 * 記事データ（date desc 順。order がある場合は order 優先）
 * /tashiro では最新6件、/tashiro/articles では全件を表示
 */
const articles: TashiroArticle[] = [
  {
    id: '1',
    title: '新NISA始動目前、個人投資家が今準備すべきポートフォリオ戦略',
    media: '東洋経済',
    date: '2023.11.15',
    image: '',
    url: '#',
    category: '資本政策',
  },
  {
    id: '2',
    title: '日本株「PBR1倍割れ」改革の衝撃、企業価値向上の本気度を探る',
    media: 'マネー現代',
    date: '2023.10.28',
    image: '',
    url: '#',
    category: '市場分析',
  },
  {
    id: '3',
    title: '金利ある世界への転換点、銀行株への投資視点とは',
    media: 'ZUU online',
    date: '2023.09.10',
    image: '',
    url: '#',
    category: '市場分析',
  },
  {
    id: '4',
    title: '半導体市場の底入れはいつか？サイクルの見極め方',
    media: '週刊エコノミスト',
    date: '2023.08.22',
    image: '',
    url: '#',
    category: 'マクロ経済',
  },
  {
    id: '5',
    title: '東証再編から1年、プライム市場の現在地を検証する',
    media: '東洋経済',
    date: '2023.07.05',
    image: '',
    url: '#',
    category: '市場分析',
  },
  {
    id: '6',
    title: '中小型株の逆襲、グロース市場で光る銘柄の共通点',
    media: 'ZUU online',
    date: '2023.06.18',
    image: '',
    url: '#',
    category: '市場分析',
  },
  {
    id: '7',
    title: '為替150円時代の資産運用、外貨建て投資のリスクと機会',
    media: 'マネー現代',
    date: '2023.05.30',
    image: '',
    url: '#',
    category: 'マクロ経済',
  },
  {
    id: '8',
    title: '決算シーズン到来、IRの質が株価を左右する時代へ',
    media: '週刊エコノミスト',
    date: '2023.04.12',
    image: '',
    url: '#',
    category: '資本政策',
  },
];

function comparator(a: TashiroArticle, b: TashiroArticle): number {
  if (a.order !== undefined && b.order !== undefined) {
    return a.order - b.order;
  }
  if (a.order !== undefined) return -1;
  if (b.order !== undefined) return 1;
  return b.date.localeCompare(a.date);
}

export function getLatestArticles(count: number): TashiroArticle[] {
  return [...articles].sort(comparator).slice(0, count);
}

export function getAllArticles(): TashiroArticle[] {
  return [...articles].sort(comparator);
}

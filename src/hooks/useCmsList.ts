import { useCallback, useEffect, useRef, useState } from 'react';
import type { MicroCMSQueries } from 'microcms-js-sdk';
import { client } from '../lib/client';

/**
 * CMS一覧取得の状態。
 * 「通信エラー」と「記事0件」を区別できるようにする（従来はエラーが空表示に化けていた）。
 */
export type CmsListState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; contents: T[]; totalCount: number }
    | { status: 'empty' }
    | { status: 'error' };

interface UseCmsListOptions {
    endpoint: string;
    queries: MicroCMSQueries;
    /** falseのときは取得しない（CMS未設定時にモック表示へ切り替える用途） */
    enabled?: boolean;
}

/**
 * microCMSの一覧取得フック（監査バッチ5B）。
 *
 * - AbortController でアンマウント・条件変更時に進行中のリクエストを中断する
 * - リクエストIDでも古いレスポンスの反映を防ぐ（連続ページ操作の後勝ち対策の二重ガード）
 * - Abort はエラー扱いにしない
 * - retry() は同一条件で再取得する（エラー表示の「再試行」ボタン用）
 */
export function useCmsList<T>({ endpoint, queries, enabled = true }: UseCmsListOptions): {
    state: CmsListState<T>;
    retry: () => void;
} {
    const [state, setState] = useState<CmsListState<T>>({ status: enabled ? 'loading' : 'idle' });
    const [attempt, setAttempt] = useState(0);
    const requestIdRef = useRef(0);
    // queriesはレンダーごとに新しいオブジェクトになるため、内容で比較する
    const queriesKey = JSON.stringify(queries);

    useEffect(() => {
        // effect実行のたびにIDを進め、以前のリクエストの解決を無効化する
        // （enabled=falseへの切替時も、進行中リクエストがidleをsuccessで上書きしないように）
        const requestId = ++requestIdRef.current;

        if (!enabled) {
            setState({ status: 'idle' });
            return;
        }
        const controller = new AbortController();
        setState({ status: 'loading' });

        client
            .get({
                endpoint,
                queries: JSON.parse(queriesKey) as MicroCMSQueries,
                customRequestInit: { signal: controller.signal },
            })
            .then((data: { contents: T[]; totalCount: number }) => {
                if (controller.signal.aborted || requestId !== requestIdRef.current) return;
                if (data.contents.length === 0) {
                    setState({ status: 'empty' });
                } else {
                    setState({ status: 'success', contents: data.contents, totalCount: data.totalCount });
                }
            })
            .catch((error: unknown) => {
                if (controller.signal.aborted || requestId !== requestIdRef.current) return;
                console.error(`Failed to fetch ${endpoint}:`, error);
                setState({ status: 'error' });
            });

        return () => {
            // アンマウント・条件変更時: このリクエストを失効させたうえで中断する
            requestIdRef.current++;
            controller.abort();
        };
    }, [endpoint, queriesKey, enabled, attempt]);

    const retry = useCallback(() => setAttempt((n) => n + 1), []);

    return { state, retry };
}

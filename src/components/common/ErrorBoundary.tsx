import React from 'react';

interface ErrorBoundaryProps {
    fallback: React.ReactNode;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * 描画時例外でSPA全体が白画面になるのを防ぐError Boundary（監査バッチ5B）。
 * 通信エラーは useCmsList 側の責務であり、ここでは捕捉しない（描画例外のみ）。
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: React.ErrorInfo) {
        console.error('描画エラーを捕捉しました:', error, info);
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children;
    }
}

/**
 * アプリ最上位用フォールバック。
 * Routerごと壊れている可能性があるため、導線は素の<a>タグにする。
 */
export const AppErrorFallback = () => (
    <div
        style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '24px',
            textAlign: 'center',
            background: '#ffffff',
            color: '#050A14',
        }}
    >
        <p style={{ fontWeight: 600 }}>ページの表示中に問題が発生しました</p>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
            お手数ですが、再読み込みするか時間をおいてお試しください。
        </p>
        <p>
            <button
                type="button"
                onClick={() => window.location.reload()}
                style={{ border: '1px solid #D4AF37', background: 'none', color: '#050A14', padding: '10px 24px', cursor: 'pointer', marginRight: '12px' }}
            >
                再読み込み
            </button>
            <a href="/" style={{ color: '#050A14' }}>トップページへ戻る</a>
        </p>
    </div>
);

/** ページ表示領域用フォールバック（ヘッダー・フッターは生きている状態で表示される） */
export const PageErrorFallback = () => (
    <div style={{ padding: '160px 24px', textAlign: 'center', color: '#050A14' }}>
        <p style={{ fontWeight: 600, marginBottom: '8px' }}>ページの表示中に問題が発生しました</p>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
            お手数ですが、再読み込みするか時間をおいてお試しください。
        </p>
        <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ border: '1px solid #D4AF37', background: 'none', color: '#050A14', padding: '10px 24px', cursor: 'pointer', marginRight: '12px' }}
        >
            再読み込み
        </button>
        <a href="/" style={{ color: '#050A14' }}>トップページへ戻る</a>
    </div>
);

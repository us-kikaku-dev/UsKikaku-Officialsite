import React from 'react';

/**
 * IR Voice の音声波形ロゴマーク。5本のバーで「声」を表現する。
 * 公式LP（IR-SaaS apps/web-biz の BrandMark.tsx）からの移植。
 *
 * 原典の viewBox は "0 0 120 80" だが、周囲の余白が大きく
 * ロックアップ（ロゴ＋製品名の並び）で整列しづらいため、
 * バー周辺までトリミングしている。描画内容（バーの座標・色）は原典と同一。
 *
 * このサイトでは常に「IR Voice」のテキストと並べて使うため、
 * SVG自体は装飾扱い（aria-hidden）とし、読み上げの重複を避ける。
 *
 * tone="light" は濃色背景向け、"dark" は明色背景向け。
 */
export function BrandMark({
    className,
    tone = 'dark',
    size = 24,
    animated = false,
}: {
    className?: string;
    tone?: 'light' | 'dark';
    /** 表示高さ(px)。幅はロゴの縦横比から自動で決まる */
    size?: number;
    /** 音声のようにバーを脈動させる（スタイルは IRVoicePage.css 側で定義） */
    animated?: boolean;
}) {
    const bars =
        tone === 'light'
            ? ['#5f83a3', '#2dd4bf', '#ffd83d', '#2dd4bf', '#5f83a3']
            : ['#5f83a3', '#0d9488', '#1e3a5f', '#0d9488', '#5f83a3'];
    const heights = [12, 24, 36, 24, 12];
    const ys = [34, 28, 22, 28, 34];
    return (
        // バーの描画範囲は x:44〜81, y:22〜58（中央バーは y=22 + 高さ36 = 58 まで伸びる）。
        // 上下左右に2ずつ余白を持たせてトリミングする
        <svg
            className={`${className ?? ''} ${animated ? 'irv-brandmark--animated' : ''}`.trim() || undefined}
            viewBox="42 20 41 40"
            aria-hidden="true"
            height={size}
            width={Math.round((size * 41) / 40)}
        >
            {heights.map((h, i) => (
                <rect
                    key={i}
                    x={44 + i * 8}
                    y={ys[i]}
                    width="5"
                    height={h}
                    rx="2.5"
                    fill={bars[i]}
                />
            ))}
        </svg>
    );
}

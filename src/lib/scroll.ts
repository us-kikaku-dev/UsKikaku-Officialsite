/**
 * OSの「動きを減らす」設定（prefers-reduced-motion）を尊重したスクロール挙動を返す。
 * JSの scrollIntoView / scrollTo に behavior: 'smooth' を直接指定すると
 * CSS側の縮小設定では抑制できないため、必ずこの関数を経由すること。
 */
export const scrollBehavior = (): ScrollBehavior =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';

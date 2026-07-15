import React from 'react';
import './ComingSoonBadge.css';

type ComingSoonBadgeProps = {
    /** 置く面の明暗 */
    tone?: 'dark' | 'light';
    size?: 'md' | 'lg';
};

/**
 * 「近日公開」バッジ。
 * アプリがApp Storeで公開されるまで、掲載箇所すべてでこの表示に揃える。
 */
export const ComingSoonBadge = ({ tone = 'dark', size = 'md' }: ComingSoonBadgeProps) => {
    return (
        <span className={`irv-badge irv-badge--on-${tone} ${size === 'lg' ? 'irv-badge--lg' : ''}`}>
            近日公開
        </span>
    );
};

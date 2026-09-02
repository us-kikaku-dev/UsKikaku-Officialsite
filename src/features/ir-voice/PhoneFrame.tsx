import React from 'react';
import './PhoneFrame.css';

type PhoneFrameProps = {
    src: string;
    alt: string;
    /** 明るい背景に置く場合は影を弱める */
    onLight?: boolean;
    className?: string;
};

/** アプリのスクリーンショットをスマホ実機の枠に収めて表示する */
export const PhoneFrame = ({ src, alt, onLight = false, className = '' }: PhoneFrameProps) => {
    return (
        <div className={`irv-phone ${onLight ? 'irv-phone--on-light' : ''} ${className}`}>
            <img src={src} alt={alt} className="irv-phone-screen" loading="lazy" decoding="async" />
        </div>
    );
};

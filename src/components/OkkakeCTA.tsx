import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const OkkakeCTA = () => {
    return (
        <React.Fragment>
            <style>{`
                .okkake-cta-btn {
                    background: linear-gradient(90deg, #E6007E 0%, #FF6B6B 100%);
                    border-radius: 16px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    transform: translateY(0);
                    cursor: pointer;
                    text-decoration: none;
                    color: #FFFFFF !important;
                    
                    /* Layout Enforcements */
                    display: inline-flex !important;
                    width: auto !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    align-items: center !important;
                    justify-content: center !important;
                    white-space: nowrap !important;
                    font-weight: 800 !important;
                }
                .okkake-cta-btn:hover {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transform: translateY(6px);
                    color: #FFFFFF !important;
                }
                .okkake-cta-btn:active {
                    transform: translateY(6px) scale(0.95);
                    color: #FFFFFF !important;
                }
                
                /* Mobile Override */
                @media (max-width: 480px) {
                    .okkake-cta-btn {
                        width: auto !important;
                        max-width: 90% !important;
                        white-space: nowrap !important;
                        padding: 12px 10px !important;
                        font-size: clamp(11px, 3.8vw, 15px) !important;
                        box-sizing: border-box !important;
                        height: auto !important;
                        line-height: 1.5 !important;
                    }
                }
            `}</style>
            <a
                href="https://okkake.us-kikaku.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="okkake-cta-btn inline-flex flex-nowrap items-center justify-center gap-2 text-white px-5 py-3 md:px-6 md:py-4 text-base md:text-lg font-extrabold whitespace-nowrap"
            >
                OKKAKEのサービスサイトを見る
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
            </a>
        </React.Fragment>
    );
};

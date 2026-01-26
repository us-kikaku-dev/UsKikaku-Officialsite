import React from 'react';

export const ProductPhilosophy = () => {
    return (
        <section className="bg-white py-24 md:py-36 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
                <span className="about-label font-outfit uppercase mb-8 inline-block">
                    OUR PRODUCT PHILOSOPHY
                </span>
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-relaxed mb-12 font-rounded tracking-wide">
                    プロダクトを通じて、<br className="md:hidden" />情報体験を設計する
                </h2>

                <div className="text-custom-gray leading-relaxed text-16px md:text-17px font-sans space-y-8 text-justify md:text-center max-w-2xl mx-auto">
                    <p>
                        当社は、情報や予定がどのように整理され、<br className="hidden md:inline" />
                        どのタイミングで届くか——その体験そのものを設計することが、<br className="hidden md:inline" />
                        価値につながると考えています。
                    </p>
                    <p>
                        OKKAKEは、こうした考え方を形にした自社プロダクトのひとつです。<br className="hidden md:inline" />
                        あわせて現在、社内利用を前提としたプロジェクト管理ツールやCMSの開発にも取り組み、<br className="hidden md:inline" />
                        情報管理や業務の進め方を、よりシンプルにする仕組みづくりを進めています。
                    </p>
                </div>
            </div>
            {/* Background decoration (optional/subtle) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        </section>
    );
};

import React from 'react';
import { Calendar, Users, Bell } from 'lucide-react';
import AboutOkkakeVisual from '../assets/about-okkake-visual.jpg';


export const AboutOkkake = () => {
    return (
        <section className="relative py-48 md:py-80 overflow-hidden bg-fun-yellow" id="about-okkake">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text */}
                    <div>
                        <div className="mb-16">
                            <span className="about-label font-outfit uppercase mb-4">
                                ABOUT OKKAKE
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-custom-relaxed mb-6 font-rounded tracking-wider">
                                OKKAKEとは
                            </h2>
                            <div className="text-custom-gray leading-185 text-17px font-sans">
                                <p>
                                    OKKAKEは、イベントや配信情報を予定として受け取り、発信できる<br />
                                    「カレンダー」×「SNS」アプリです。
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-custom-10">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-icon-pink flex items-center justify-center text-icon-gray">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 mb-1">情報が予定として並ぶ</span>
                                    <span className="text-sm text-gray-600">タイムラインではなく、カレンダーで把握</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-icon-orange flex items-center justify-center text-icon-gray">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 mb-1">フォローが整理につながる</span>
                                    <span className="text-sm text-gray-600">関心のある情報が自動的に集まる</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-icon-green flex items-center justify-center text-icon-gray">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900 mb-1">見逃しを減らす</span>
                                    <span className="text-sm text-gray-600">必要なタイミングで気づける設計</span>
                                </div>
                            </li>
                        </ul>


                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={AboutOkkakeVisual}
                                alt="OKKAKE App Experience"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

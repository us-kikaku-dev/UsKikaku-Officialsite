import React from 'react';

// Using simple HTML/CSS to avoid any motion issues for now, 
// mimicking the Top Page Hero style but half height.
export const ServiceHero = () => {
    const scrollToContent = () => {
        // Scroll to the next section logic if needed, or remove.
    };

    return (
        <header
            className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
            style={{
                backgroundImage:
                    "linear-gradient(to bottom, rgba(5, 10, 20, 0.6), rgba(5, 10, 20, 0.7)), url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop')",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/40 via-transparent to-[#050A14]/10"></div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16">
                <p className="text-[#F3E5AB] tracking-[0.3em] text-sm md:text-base mb-6 uppercase">
                    SERVICE
                </p>

                <h1 className="serif-text text-4xl md:text-6xl font-medium leading-tight md:leading-snug text-white tracking-wider">
                    事業内容
                </h1>
            </div>
        </header>
    );
};

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        num: "01",
        title: "Intelligent Diagnostic",
        desc: "Structural forensics and comprehensive capacity evaluation before schematic intervention."
    },
    {
        num: "02",
        title: "Precision Modeling",
        desc: "Finite element analysis tailored to New Zealand soil composition and seismic hazard factors."
    },
    {
        num: "03",
        title: "Governed Execution",
        desc: "End-to-end design delivery verified by PS1, PS2, and PS4 council-approved authoring."
    }
];

const ProtocolCard = ({ data, index }) => {
    return (
        <div
            className={`protocol-card panel-${index} absolute w-full h-[85vh] flex flex-col md:flex-row items-center border border-white/5 bg-primary overflow-hidden origin-top rounded-[3rem]`}
            style={{ zIndex: protocols.length - index, height: "100%", willChange: "transform, opacity, filter" }}
        >
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center h-full">
                <div className="text-xl font-mono text-accent mb-6">Phase // {data.num}</div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-background mb-6">{data.title}</h3>
                <p className="text-lg text-background/70 leading-relaxed font-sans max-w-lg">{data.desc}</p>
            </div>

            <div className="w-full md:w-1/2 h-full bg-textDark/20 relative flex items-center justify-center p-12 overflow-hidden border-t md:border-t-0 md:border-l border-white/5">
                {index === 0 && (
                    <div className="w-64 h-64 border border-accent/30 rounded-full flex items-center justify-center relative animate-spin-slow">
                        <div className="w-48 h-48 border border-accent/50 rounded-full border-dashed animate-reverse-spin" />
                        <div className="w-32 h-32 border border-accent/80 rounded-full absolute" />
                    </div>
                )}
                {index === 1 && (
                    <div className="w-full h-64 flex flex-col justify-between items-center opacity-80">
                        <div className="w-full h-[1px] bg-accent/30 relative">
                            <div className="absolute top-0 left-0 h-[2px] w-24 bg-accent animate-scan-horizontal" />
                        </div>
                        <div className="w-full h-[1px] bg-accent/30 relative">
                            <div className="absolute top-0 left-12 h-[2px] w-24 bg-accent animate-scan-horizontal delay-100" />
                        </div>
                        <div className="w-full h-[1px] bg-accent/30 relative">
                            <div className="absolute top-0 left-0 h-[2px] w-24 bg-accent animate-scan-horizontal delay-200" />
                        </div>
                        <div className="w-full h-[1px] bg-accent/30 relative">
                            <div className="absolute top-0 left-24 h-[2px] w-24 bg-accent animate-scan-horizontal delay-300" />
                        </div>
                        <div className="w-full border border-accent/30 h-32 grid grid-cols-6 grid-rows-3 gap-[1px] bg-accent/10">
                            {[...Array(18)].map((_, i) => (
                                <div key={i} className={`bg-primary ${i % 3 === 0 ? 'opacity-80' : 'opacity-100'}`} />
                            ))}
                        </div>
                    </div>
                )}
                {index === 2 && (
                    <svg className="w-full h-48" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path
                            d="M0,50 L40,50 L50,20 L60,80 L70,50 L200,50"
                            fill="none"
                            stroke="#C9A84C"
                            strokeWidth="2"
                            className="stroke-dash-animate opacity-80"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

const Protocol = () => {
    const containerRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');
            const numTransitions = cards.length - 1; // 2 transitions for 3 cards
            const scrollPerTransition = 45; // vh per card swap — smooth & deliberate
            const dwellPadding = 35; // vh of extra hold — lets the weighted scrub fully finish Phase 3
            const totalScroll = numTransitions * scrollPerTransition + dwellPadding;

            // We use native CSS sticky instead of GSAP pinning for vastly superior mobile momentum.
            // No ScrollTrigger.create({ pin: true }) needed!

            // Apple-style: cards lift upward, scale, blur, and fade — with weighted scrub lag
            cards.forEach((card, i) => {
                if (i < numTransitions) {
                    gsap.to(card, {
                        scale: 0.92,
                        yPercent: -8,
                        opacity: 0,
                        filter: "blur(10px)",
                        ease: "power1.in",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: () => `top -${i * scrollPerTransition}vh`,
                            end: () => `top -${(i + 1) * scrollPerTransition}vh`,
                            scrub: 1.2, // weighted lag — the Apple signature feel
                        }
                    });
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" className="bg-primary text-background">
            <div className="pt-32 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 mb-16 relative z-20">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-background mb-4">
                    The <span className="font-drama italic text-accent">Protocol.</span>
                </h2>
                <p className="text-xl font-sans text-background/60 max-w-2xl text-balance">
                    Our rigid methodology for assessing and engineering structural brilliance.
                </p>
            </div>

            {/* The native scrolling track that determines total scroll duration */}
            <div ref={containerRef} className="relative w-full z-10" style={{ height: '225vh' }}>
                {/* The visually pinned frame */}
                <div className="sticky top-0 w-full h-[100dvh] flex items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden">
                    <div ref={wrapRef} className="relative w-full max-w-5xl h-full flex items-center justify-center">
                        {protocols.map((p, i) => (
                            <ProtocolCard key={i} data={p} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Protocol;

import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { caseStudies } from '../data/caseStudies';

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
    const { id } = useParams();
    const study = caseStudies.find(s => s.id === id) || caseStudies[0]; // fallback for demo

    // Always start at top of page on route load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }
            );

            gsap.fromTo(".line-draw",
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: "power3.inOut", transformOrigin: "left center", delay: 0.5 }
            );
        }, headerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-primary min-h-screen text-background relative font-sans selection:bg-accent selection:text-primary pb-32">
            {/* Global Noise Overlay */}
            <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-5 mix-blend-overlay">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>

            {/* Minimalist Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 mix-blend-difference">
                <Link to="/" className="text-white hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors flex items-center gap-4">
                    <span>←</span> Return to Protocol
                </Link>
            </nav>

            {/* Hero Headers */}
            <header ref={headerRef} className="relative w-full h-[70dvh] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={study.heroImage} alt="Structural Blueprint" className="w-full h-full object-cover filter grayscale opacity-40 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl">
                    <div className="flex flex-wrap gap-4 mb-8">
                        <span className="fade-up font-mono text-xs tracking-widest uppercase text-accent border border-accent/20 px-3 py-1 rounded-full">{study.category}</span>
                        <span className="fade-up font-mono text-xs tracking-widest uppercase text-white/50 border border-white/10 px-3 py-1 rounded-full">{study.location}</span>
                    </div>
                    <h1 className="fade-up text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tight leading-[1.05] mb-8">
                        {study.title}
                    </h1>
                    <div className="line-draw w-full h-[1px] bg-accent/30" />
                </div>
            </header>

            {/* Content Body */}
            <main ref={contentRef} className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 mt-16 grid grid-cols-1 md:grid-cols-12 gap-16">

                {/* Left Col: Details */}
                <aside className="md:col-span-4 flex flex-col gap-8 text-sm font-mono tracking-wide text-white/50 uppercase">
                    <div>
                        <span className="block text-[10px] text-accent mb-2">Client</span>
                        <span className="text-white">{study.client}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] text-accent mb-2">Service</span>
                        <span className="text-white">{study.category}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] text-accent mb-2">Location</span>
                        <span className="text-white">{study.location}</span>
                    </div>
                </aside>

                {/* Right Col: Narrative */}
                <article className="md:col-span-8 flex flex-col gap-24 font-sans">

                    <section className="scroll-reveal">
                        <h2 className="text-3xl font-bold text-white mb-6 font-drama italic tracking-wide">{study.challenge.title}</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">{study.challenge.description}</p>
                        <ul className="flex flex-col gap-4">
                            {study.challenge.points.map((pt, i) => (
                                <li key={i} className="flex gap-4 items-start text-white/60">
                                    <span className="font-mono text-accent text-xs mt-1 shrink-0">0{i + 1}.</span>
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="scroll-reveal">
                        <h2 className="text-3xl font-bold text-white mb-6 font-drama italic tracking-wide">{study.solution.title}</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">{study.solution.description}</p>
                        <ul className="flex flex-col gap-4">
                            {study.solution.points.map((pt, i) => (
                                <li key={i} className="flex gap-4 items-start text-white/60">
                                    <span className="font-mono text-accent text-xs mt-1 shrink-0">0{i + 1}.</span>
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* KPI Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-t border-accent/20">
                        {study.results.map((res, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-4xl font-sans font-bold text-accent">{res.metric}</span>
                                <span className="text-xs font-mono uppercase tracking-widest text-white/50">{res.label}</span>
                            </div>
                        ))}
                    </div>

                </article>

            </main>
        </div>
    );
};

export default CaseStudy;

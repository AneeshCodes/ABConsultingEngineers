import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Projects from './components/Projects';
import Team from './components/Team';
import Consultation from './components/Consultation';
import Footer from './components/Footer';

import CaseStudy from './pages/CaseStudy';

gsap.registerPlugin(ScrollTrigger);

// Global Lenis smooth scroll — eliminates mouse wheel chunking
const lenis = new Lenis({
    duration: 1.2,       // lerp duration — how long scroll takes to "catch up"
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential decay
    smoothWheel: true,   // smooth mouse wheel specifically
    touchMultiplier: 2,  // keep trackpad/touch responsive
});

// Sync Lenis scroll position → GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Prevent URL bar show/hide jumps without hijacking native scroll
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const Navbar = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[500] w-[90%] max-w-5xl rounded-[3rem] px-8 py-4 backdrop-blur-xl bg-primary/60 border border-white/5 flex items-center justify-between transition-all duration-300">
            <div className="font-sans font-bold text-background text-xl tracking-tight interactive-link cursor-pointer uppercase tracking-widest text-sm">
                AB Consulting
            </div>
            <div className="hidden md:flex gap-8 text-background/80 font-sans text-sm tracking-wider">
                <a href="#expertise" className="interactive-link hover:text-accent">Expertise</a>
                <a href="#projects" className="interactive-link hover:text-accent">Recent Work</a>
                <a href="#protocol" className="interactive-link hover:text-accent">Protocol</a>
            </div>
            <a href="#consultation" className="btn-magnetic bg-accent text-primary px-6 py-2 h-10 rounded-[2rem] text-sm font-semibold border border-transparent hover:border-accent/50 group relative overflow-hidden hidden md:inline-flex items-center justify-center">
                <span className="relative z-10 transition-colors group-hover:text-primary">Consultation</span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] transition-transform duration-500 rounded-[2rem] group-hover:translate-y-0" />
            </a>
        </nav>
    );
};

const HeaderBackground = () => (
    <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10" />
        <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=85&w=2940&auto=format&fit=crop"
            alt="Modern architectural facade with dramatic shadows"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
    </div>
);

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-text", {
                y: 40,
                opacity: 0,
                stagger: 0.08,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] bg-primary flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
            <HeaderBackground />
            <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-start gap-4">
                <p className="hero-text text-accent font-mono text-sm tracking-widest uppercase mb-4">
                    Chartered Structural & Civil Engineers
                </p>
                <h1 className="text-background text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
                    <span className="hero-text font-sans font-bold block mb-2">Structural Excellence meets</span>
                    <span className="hero-text font-drama italic block text-accent text-6xl md:text-8xl lg:text-9xl mt-2">Precision.</span>
                </h1>
                <div className="hero-text mt-12 flex flex-col sm:flex-row flex-wrap gap-4 items-center w-full sm:w-auto">
                    <a href="#consultation" className="btn-magnetic btn-primary group w-full sm:w-auto inline-flex items-center justify-center">
                        <span className="relative z-10 font-bold">Start Your Project Conversation</span>
                        <div className="btn-bg" />
                    </a>
                    <a href="#projects" className="btn-magnetic btn-secondary group w-full sm:w-auto ml-0 sm:ml-4">
                        <span className="relative z-10 font-sans">View Our Work</span>
                        <div className="btn-bg" />
                    </a>
                </div>
            </div>
        </section>
    );
};

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <Projects />
            <Team />
            <Consultation />
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <div className="bg-primary min-h-screen text-background relative">
                <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-5 mix-blend-overlay">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/case-studies/:id" element={<CaseStudy />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

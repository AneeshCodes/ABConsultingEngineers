import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".phil-text-1", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".phil-text-2", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-40 px-6 md:px-12 lg:px-24 bg-primary text-background overflow-hidden flex flex-col justify-center min-h-[80vh]">
            <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
                <img
                    src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2930&auto=format&fit=crop"
                    alt="Dark marble texture"
                    className="w-full h-full object-cover scale-105"
                />
            </div>

            <div className="relative z-10 max-w-6xl w-full mx-auto">
                <p className="phil-text-1 text-xl md:text-3xl font-sans text-background/60 mb-12 max-w-3xl leading-relaxed">
                    Most engineering firms focus purely on: ticking the compliance boxes and moving on.
                </p>
                <h2 className="text-4xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight">
                    <span className="phil-text-2 font-sans font-bold block mb-2">We focus on:</span>
                    <span className="phil-text-2 font-drama italic block text-accent mt-4">your project, not the paperwork.</span>
                </h2>
                <p className="phil-text-2 text-lg md:text-xl font-sans text-background/50 mt-12 max-w-2xl text-balance">
                    We work closely with you, your builder, and your architect to find solutions that are practical, cost-effective, and actually straightforward to construct on-site.
                </p>
            </div>
        </section>
    );
};

export default Philosophy;

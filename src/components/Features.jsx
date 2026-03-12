import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MousePointer2 } from 'lucide-react';

const DiagnosticShuffler = () => {
    const [cards, setCards] = useState([
        { id: 1, title: '22+ Years Global', desc: 'UK, Middle East, India, and NZ expertise.' },
        { id: 2, title: 'Waikato Precision', desc: 'Intimate knowledge of local soil, councils, and codes.' },
        { id: 3, title: 'Hands-on Approach', desc: 'Direct partner involvement in every design phase.' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) => {
                const newCards = [...prevCards];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[320px] flex items-center justify-center">
            {cards.map((card, index) => {
                const isFront = index === 0;
                const scale = 1 - index * 0.05;
                const yOffset = index * 20;
                const opacity = 1 - index * 0.2;
                const zIndex = 30 - index;

                return (
                    <div
                        key={card.id}
                        className="absolute w-full max-w-sm rounded-[2rem] bg-background border border-textDark/10 p-8 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center h-[220px]"
                        style={{
                            transform: `translateY(${yOffset}px) scale(${scale})`,
                            opacity,
                            zIndex
                        }}
                    >
                        <div className="text-xs font-mono text-accent mb-3 uppercase tracking-widest">0{card.id} // Expertise</div>
                        <h3 className="text-2xl font-bold font-sans text-primary mb-2 line-clamp-1">{card.title}</h3>
                        <p className="text-textDark/70 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                );
            })}
        </div>
    );
};

const TelemetryTypewriter = () => {
    const text = "From seismic risk to structural confidence... Specializing in ISA-DSA seismic assessment, unreinforced masonry, and strengthening. Protecting buildings and the people inside.";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[320px] rounded-[2rem] bg-primary text-background p-8 border border-accent/20 flex flex-col relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-accent">Live Feed</span>
            </div>
            <div className="font-mono text-sm leading-relaxed text-background/90 h-full">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle" />
            </div>
        </div>
    );
};

const CursorProtocolScheduler = () => {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);
    const dayRefs = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

            // Target days: index 2 (T), 3 (W), 5 (F)
            const targetIndices = [2, 3, 5];
            // Approximate x positions for each day (evenly spaced across 260px, starting ~24px for padding)
            const dayPositions = targetIndices.map(i => ({ x: 24 + i * 37, y: 158 }));

            // Initial state — cursor offscreen bottom-right
            gsap.set(cursorRef.current, { x: 240, y: 220, opacity: 0 });

            // Fade in
            tl.to(cursorRef.current, { opacity: 1, duration: 0.4 });

            // Click each target day
            dayPositions.forEach((pos, idx) => {
                const dayEl = dayRefs.current[targetIndices[idx]];
                if (!dayEl) return;

                // Move to day
                tl.to(cursorRef.current, { x: pos.x, y: pos.y, duration: 0.6, ease: "power2.inOut" })
                    // Press
                    .to(cursorRef.current, { scale: 0.8, duration: 0.08 })
                    .to(dayEl, { scale: 0.9, duration: 0.08 }, "<")
                    // Activate day
                    .to(dayEl, { backgroundColor: '#C9A84C', color: '#0D0D12', scale: 1, borderColor: '#C9A84C', duration: 0.25, ease: "back.out(1.7)" })
                    .to(cursorRef.current, { scale: 1, duration: 0.1 })
                    // Pause briefly before next
                    .to(cursorRef.current, { duration: 0.3 });
            });

            // Fade out
            tl.to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.4 });

            // Reset day highlights before repeat
            targetIndices.forEach(i => {
                const dayEl = dayRefs.current[i];
                if (!dayEl) return;
                tl.set(dayEl, { backgroundColor: 'transparent', color: '#2A2A35', borderColor: 'rgba(42,42,53,0.1)' });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div ref={containerRef} className="w-full h-[320px] rounded-[2rem] bg-background border border-textDark/10 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
                <h3 className="text-xl font-bold text-primary mb-3">Council-vetted, Government-approved</h3>
                <p className="text-sm text-textDark/70 mb-6 leading-relaxed">PS1, PS2, PS4 authors; CoLab Supplier Panel; Waikato DHB Roster.</p>
                <div className="flex justify-between w-full max-w-[260px]">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            ref={el => dayRefs.current[i] = el}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold border border-textDark/10 text-primary transition-colors"
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 text-textDark/50">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs font-mono uppercase tracking-widest">Scheduled Inspections</span>
            </div>

            <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none drop-shadow-md text-primary">
                <MousePointer2 fill="#0D0D12" size={28} />
            </div>
        </div>
    );
};

const Features = () => {
    return (
        <section id="expertise" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-20 rounded-t-[3rem] -mt-10 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="mb-24">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-primary mb-8">
                        Interactive Functional <span className="font-drama italic text-accent">Artifacts.</span>
                    </h2>
                    <p className="text-xl font-sans text-textDark/70 max-w-2xl text-balance leading-relaxed">
                        Our engineering process is visible, precise, and rigorous. Every decision is calculated, ensuring international expertise meets local precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CursorProtocolScheduler />
                </div>
            </div>
        </section>
    );
};

export default Features;

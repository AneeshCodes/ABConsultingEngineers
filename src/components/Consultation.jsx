import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Consultation = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const dropdownRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const projectTypes = [
        "Seismic Assessment (DSA / ISA)",
        "Commercial / Institutional Frameworks",
        "Industrial Pipe Supports & Retrofits",
        "High-End Residential Structural",
        "Other / Unknown Scope"
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Intro text animation
            gsap.fromTo(".consult-text",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Form elements stagger in
            gsap.fromTo(".form-element",
                { y: 30, opacity: 0, filter: "blur(5px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Clickaway listener for the custom dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('loading');

        try {
            // Replace this specific string with your actual Formspree or custom endpoint
            const response = await fetch("https://formspree.io/f/xyknjkew", {
                method: "POST",
                body: new FormData(e.target),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                e.target.reset();
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    return (
        <section id="consultation" ref={containerRef} className="bg-textDark relative pt-32 pb-40 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Text Content */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <span className="consult-text text-accent font-mono text-sm font-bold tracking-widest uppercase mb-6 inline-block">
                        // Initiate Project
                    </span>
                    <h2 className="consult-text text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white mb-6">
                        Start the <span className="font-drama italic text-accent">Conversation.</span>
                    </h2>
                    <p className="consult-text text-xl font-sans text-white/60 text-balance leading-relaxed">
                        Whether you are navigating complex institutional retrofits or master-planning industrial infrastructure, our engineering partners are ready to engage. Complete the intake form to schedule an initial diagnostic call.
                    </p>
                </div>

                {/* Form Container */}
                <div className="w-full lg:w-7/12">
                    <div ref={formRef} className="bg-primary border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

                        {/* Shimmer line */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />

                        {formStatus === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                                <div className="w-20 h-20 rounded-full border border-accent/30 flex items-center justify-center mb-6 bg-accent/10">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-sans font-bold text-white mb-4">Request Received.</h3>
                                <p className="text-white/60 font-sans max-w-sm">
                                    Our infrastructure specialists will review your project parameters and contact you shortly.
                                </p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="mt-8 text-sm font-mono text-accent hover:text-white transition-colors"
                                >
                                    [ Submit Another Project ]
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-element flex flex-col gap-2">
                                        <label htmlFor="name" className="text-sm font-mono text-white/40 uppercase tracking-wider">01. Entity / Contact</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Your Name or Company"
                                            className="w-full bg-textDark border-b border-white/10 text-white px-4 py-4 focus:outline-none focus:border-accent focus:bg-white/5 transition-all rounded-t-xl"
                                        />
                                    </div>
                                    <div className="form-element flex flex-col gap-2">
                                        <label htmlFor="email" className="text-sm font-mono text-white/40 uppercase tracking-wider">02. Secure Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="address@domain.com"
                                            className="w-full bg-textDark border-b border-white/10 text-white px-4 py-4 focus:outline-none focus:border-accent focus:bg-white/5 transition-all rounded-t-xl"
                                        />
                                    </div>
                                </div>

                                <div className="form-element flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm font-mono text-white/40 uppercase tracking-wider">03. Direct Line</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+64 Phone Number"
                                        className="w-full bg-textDark border-b border-white/10 text-white px-4 py-4 focus:outline-none focus:border-accent focus:bg-white/5 transition-all rounded-t-xl"
                                    />
                                </div>

                                <div ref={dropdownRef} className="form-element flex flex-col gap-2 relative z-50">
                                    <label className="text-sm font-mono text-white/40 uppercase tracking-wider">04. Project Classification</label>

                                    {/* Custom Dropdown Trigger */}
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full bg-textDark border-b ${isDropdownOpen ? 'border-accent bg-white/5' : 'border-white/10'} text-white px-4 py-4 focus:outline-none transition-all rounded-t-xl cursor-pointer flex justify-between items-center`}
                                    >
                                        <span className={selectedType ? "text-white" : "text-white/50"}>
                                            {selectedType || "Select Infrastructure Scope..."}
                                        </span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className={`w-5 h-5 text-white/50 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-accent' : ''}`}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Hidden input to ensure FormData still catches the value for Formspree */}
                                    <input type="hidden" name="type" required value={selectedType} />

                                    {/* Custom Dropdown Menu */}
                                    <div
                                        className={`absolute top-[100%] left-0 w-full bg-[#1A1A24] border border-white/10 rounded-[1.5rem] mt-2 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
                                    >
                                        <ul className="flex flex-col py-2">
                                            {projectTypes.map((type, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedType(type);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`px-6 py-4 cursor-pointer text-white/80 hover:text-accent hover:bg-white/5 transition-colors ${selectedType === type ? 'bg-white/5 text-accent' : ''}`}
                                                >
                                                    {type}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="form-element flex flex-col gap-2">
                                    <label htmlFor="message" className="text-sm font-mono text-white/40 uppercase tracking-wider">05. Parameters & Forensics</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="4"
                                        placeholder="Briefly detail the timeline, structural challenges, and site location..."
                                        className="w-full bg-textDark border-b border-white/10 text-white px-4 py-4 focus:outline-none focus:border-accent focus:bg-white/5 transition-all rounded-t-xl resize-none"
                                    ></textarea>
                                </div>

                                {formStatus === 'error' && (
                                    <div className="form-element text-red-400 text-sm font-sans px-4">
                                        System anomaly detected. Please verify your connection or email info@abconsultingengineers.com directly.
                                    </div>
                                )}

                                <div className="form-element mt-6">
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'loading'}
                                        className="btn-magnetic btn-primary w-full md:w-auto px-12 py-5 border-none bg-accent text-primary font-bold tracking-wide uppercase text-sm disabled:opacity-50 flex items-center justify-center gap-3 relative transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                                    >
                                        {/* Sub-layer for magnetic slide effect */}
                                        <span className="btn-bg bg-white/30 rounded-none mix-blend-overlay"></span>

                                        {formStatus === 'loading' ? (
                                            <>
                                                <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                                                <span>Transmitting Data...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="relative z-10">Initialize Transmission</span>
                                                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 relative z-10 block transition-transform group-hover:translate-x-1" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consultation;

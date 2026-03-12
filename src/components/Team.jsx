import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, credentials, bio, align = "left", photoUrl }) => {
    return (
        <div className={`flex flex-col ${align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'} gap-6 team-member opacity-0 translate-y-8`}>
            {/* Minimalist Portrait Placeholder (Cinematic Style) */}
            <div className={`w-full max-w-sm aspect-[3/4] rounded-[2rem] overflow-hidden relative ${align === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'} group`}>
                <div className="absolute inset-0 bg-accent/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
                <img
                    src={photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"}
                    alt={name}
                    className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />

                {/* Custom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-20" />
            </div>

            <div className="flex flex-col max-w-lg">
                <span className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-3">{role}</span>
                <h3 className="font-sans text-3xl md:text-4xl font-bold text-white mb-2">{name}</h3>
                <p className="font-mono text-white/40 text-[10px] md:text-xs leading-relaxed mb-6 tracking-wide uppercase">
                    {credentials.map((cred, i) => (
                        <React.Fragment key={i}>
                            {cred} <br />
                        </React.Fragment>
                    ))}
                </p>
                <div className="w-12 h-[1px] bg-accent/30 mb-6" />
                <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed text-balance">
                    {bio}
                </p>
            </div>
        </div>
    );
};

const Team = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".team-member", {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            gsap.fromTo(".team-title-word",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="team" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-primary relative overflow-hidden">
            {/* Subtle Texture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 md:mb-32 flex flex-col items-center text-center">
                    <span className="font-mono text-accent text-sm tracking-widest uppercase mb-6 inline-block overflow-hidden">
                        <span className="team-title-word inline-block">// Core Leadership</span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-white flex flex-wrap justify-center gap-x-4">
                        <span className="team-title-word inline-block">The</span>
                        <span className="team-title-word inline-block font-drama italic text-accent">Architects</span>
                        <span className="team-title-word inline-block">of</span>
                        <span className="team-title-word inline-block">Integrity.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16">
                    <TeamMember
                        name="Avinash Bandaru"
                        role="Managing Director • Structural Engineer"
                        credentials={[
                            "B.Eng. MSc CPEng CMEngNZ",
                            "Chartered Structural Engineer (C.Eng.)",
                            "Fellow of Institution of Structural Engineers (FIStructE)",
                            "Chartered Civil Engineer (MICE)"
                        ]}
                        bio="Avinash is a Chartered Professional Engineer with over 22 years of experience in structural engineering across the UK, Middle East, India, and New Zealand. He is committed to practical and safe designs, focusing on client needs to provide elegant solutions to complex structural challenges."
                        align="left"
                        photoUrl="https://static.wixstatic.com/media/27804b_2c42d9f69e98411ba31501de7245b20a~mv2.jpg"
                    />

                    <TeamMember
                        name="Harikrishnan Pannikkaveettil"
                        role="Technical Director • Structural Engineer"
                        credentials={[
                            "MTech C.Eng.(UK) MIStructE",
                            "Chartered Structural Engineer",
                            "Member of Institution of Structural Engineers",
                            "IStructE Panel - Digital Workflows & Computational Design"
                        ]}
                        bio="Harikrishnan brings over 12 years of experience delivering structural engineering design projects across 4 continents. As a passionate advocate for technological integration, he pioneers digital workflows and computational design to push the boundaries of modern infrastructure."
                        align="right"
                        photoUrl="/Harikrishnan.png"
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;

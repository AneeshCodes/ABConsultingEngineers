import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        name: "Seismic Assessment of Argyle House, Hamilton Boys' High School",
        description: "Detailed Seismic Assessment (DSA) of dormitory and dining facilities, minimizing operational disruption.",
        imageUrl: "https://static.wixstatic.com/media/27804b_543ff9e86e494ae6934c7d2e0f0048a8~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90/Structural%20Steel%20-%20Concrete%20Slab%20-%20Porta.jpg"
    },
    {
        name: "Northgate Community Church Extension",
        description: "Structural design for large column-free community spaces, adaptable for future scalability.",
        imageUrl: "https://static.wixstatic.com/media/27804b_bd602032ca024bb09f0fcaf6bfcd2fb7~mv2.jpg/v1/fill/w_1920,h_728,al_c,q_90/27804b_bd602032ca024bb09f0fcaf6bfcd2fb7~mv2.jpg"
    },
    {
        name: "Waikato District Health Board Infrastructure",
        description: "Structural services for heavy machinery installation and patient care deck extensions.",
        imageUrl: "https://static.wixstatic.com/media/27804b_8b28bafb719d4793afa884acb35935b0~mv2.jpg/v1/fill/w_1920,h_1640,al_c,q_90/Concrete%20Slab%20-%20Reinforcement%20-%20Precast%20Yard.jpg"
    },
    {
        name: "Retrofit of Residential Building",
        description: "Case study on ridge beam strengthening and comprehensive structural retrofitting.",
        imageUrl: "https://static.wixstatic.com/media/27804b_7490dc82b8374244b3658852d64bec43~mv2.jpg/v1/fill/w_1920,h_648,al_c,q_90/27804b_7490dc82b8374244b3658852d64bec43~mv2.jpg"
    },
    {
        name: "Industrial Pipe Supports & Water Treatment",
        description: "Engineering solutions for complex industrial infrastructure and prefabricated building supports.",
        imageUrl: "https://static.wixstatic.com/media/27804b_e83dee358f1449028b2568aded08459f~mv2.jpg/v1/fill/w_1920,h_1252,al_c,q_90/Water%20Treatment%20Plant%20-%20Pipe%20Supports%20-%20Prefabricated%20Building.jpg"
    }
];

const Projects = () => {
    const containerRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const slider = sliderRef.current;

            // Calculate how far to translate horizontally
            // The total width of the slider minus the viewport width
            const updateScroll = () => {
                const scrollAmount = slider.scrollWidth - window.innerWidth;
                return scrollAmount;
            };

            // GSAP Horizontal Scroll with Pin
            gsap.to(slider, {
                x: () => -updateScroll(),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${updateScroll()}`,
                    pin: true,
                    scrub: 1.2, // Match the Apple-esque weighted scrub from Protocol
                    invalidateOnRefresh: true, // Recalculate on resize
                    anticipatePin: 1,
                }
            });

            // Subtle parallax image effect inside cards
            gsap.utils.toArray('.project-img').forEach((img) => {
                gsap.fromTo(img,
                    { x: -50 },
                    {
                        x: 50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                            containerAnimation: gsap.getById(slider),
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className="bg-primary pt-32 h-[100dvh] overflow-hidden flex flex-col justify-center">
            <div className="px-6 md:px-12 lg:px-24 mb-12 shrink-0">
                <h2 className="text-5xl md:text-6xl font-sans font-bold tracking-tight text-background">
                    Recent <span className="font-drama italic text-accent">Proof of Work.</span>
                </h2>
                <p className="text-xl font-sans text-background/60 mt-4 max-w-2xl">
                    From complex institutional retrofits to large-scale residential and industrial infrastructure.
                </p>
            </div>

            <div ref={sliderRef} className="flex gap-8 px-6 md:px-12 lg:px-24 pb-16 h-[60vh] w-max select-none">
                {projectsData.map((project, idx) => (
                    <div
                        key={idx}
                        className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full rounded-[2rem] overflow-hidden group border border-white/5 bg-textDark gpu-accelerate"
                    >
                        {/* Background Image Container */}
                        <div className="absolute inset-0 w-[120%] -left-[10%] h-full">
                            <div
                                className="project-img gpu-accelerate w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url('${project.imageUrl}')` }}
                            />
                        </div>

                        {/* Dark Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-accent font-mono text-sm font-bold tracking-widest uppercase">Project // 0{idx + 1}</span>
                                <div className="h-px bg-accent/30 flex-1" />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-background mb-3 leading-tight text-balance">
                                {project.name}
                            </h3>
                            <p className="text-background/70 font-sans text-lg max-w-lg text-balance">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;

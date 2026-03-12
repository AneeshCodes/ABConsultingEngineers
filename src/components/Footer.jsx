import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#050508] text-background pt-32 pb-12 px-6 md:px-12 lg:px-24 relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-20">
                    <div className="col-span-1 md:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold font-sans tracking-tight mb-4 text-background uppercase tracking-widest">
                                AB Consulting Engineers
                            </h2>
                            <p className="text-background/60 text-lg font-sans max-w-sm mb-12">
                                Chartered structural and civil engineers delivering safe, precise, and cost‑conscious design across New Zealand.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-mono text-sm text-background/80 tracking-widest uppercase">System Operational</span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h4 className="font-mono text-accent text-sm mb-6 uppercase tracking-widest">Navigation</h4>
                        <ul className="space-y-4 font-sans text-background/80">
                            <li><a href="#expertise" className="interactive-link hover:text-accent">Expertise</a></li>
                            <li><a href="#projects" className="interactive-link hover:text-accent">Recent Work</a></li>
                            <li><a href="#protocol" className="interactive-link hover:text-accent">The Protocol</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-4">
                        <h4 className="font-mono text-accent text-sm mb-6 uppercase tracking-widest">Initiate</h4>
                        <a href="#consultation" className="mt-8 md:mt-0 btn-magnetic group relative inline-flex flex-shrink-0 items-center justify-center gap-4 bg-accent text-primary px-10 py-5 rounded-[3rem] overflow-hidden w-full md:w-auto hover:shadow-[0_0_50px_rgba(201,168,76,0.2)] transition-shadow duration-300">
                            <span className="relative z-10 font-bold">Start Your Project Conversation</span>
                            <div className="absolute inset-0 bg-white/30 translate-y-[100%] transition-transform duration-500 rounded-[3rem] group-hover:translate-y-0 mix-blend-overlay" />
                        </a>

                        <div className="space-y-2 font-mono text-background/60 text-xs mt-8">
                            <p className="flex justify-between border-b border-background/10 pb-2">
                                <span>1074 River Road, Queenwood</span>
                                <span className="text-right">Hamilton 3210</span>
                            </p>
                            <p className="flex justify-between border-b border-background/10 pb-2">
                                <span>Phone</span>
                                <a href="tel:+64224556361" className="text-accent hover:text-white transition-colors">+64 224556361</a>
                            </p>
                            <p className="flex justify-between pb-2">
                                <span>Email</span>
                                <a href="mailto:info@abconsultingengineers.com" className="text-accent hover:text-white transition-colors">info@abconsultingengineers.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-background/40 font-mono text-xs">
                    <p>© {new Date().getFullYear()} AB Consulting Engineers.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-background transition-colors">Privacy</a>
                        <a href="#" className="hover:text-background transition-colors">Terms</a>
                        <a href="#" className="hover:text-background transition-colors">Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

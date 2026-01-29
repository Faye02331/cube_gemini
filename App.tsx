
import React, { useState, useEffect, useRef } from 'react';
import { CubeScene } from './components/CubeScene';
import { ProjectSection } from './components/ProjectSection';
import { PROJECTS, NAV_LINKS } from './constants';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = winScroll / height;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      {/* 3D Experience Overlay */}
      <CubeScene scrollProgress={scrollProgress} />

      {/* Persistent UI Elements */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase">
            HUANG<span className="text-gray-500">25</span>
          </h1>
        </div>
        
        <nav className="flex flex-col gap-6 items-end pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Footer / Contact info positioned sideways as per video style */}
      <aside className="fixed bottom-0 left-0 p-8 md:p-12 z-50 pointer-events-none hidden md:block">
        <div className="rotate-[-90deg] origin-left translate-y-[-100%] translate-x-4">
          <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase whitespace-nowrap">
            I'M A CREATIVE DEVELOPER BASED IN TAIPEI, TAIWAN.<br/>
            FOCUSED ON WEB EXPERIENCE & MOTION DESIGN.
          </p>
        </div>
      </aside>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {PROJECTS.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-8 transition-all duration-300 ${
              Math.floor(scrollProgress * PROJECTS.length) === i 
                ? 'bg-white h-12' 
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Content Layers */}
      <main className="relative z-20">
        {/* Intro Section */}
        <section className="h-screen flex items-center justify-center flex-col text-center px-4">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase">
              REDEFINING<br/>
              DIGITAL<br/>
              <span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>SPACE</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-[0.4em] uppercase">
              Scroll down to explore
            </p>
          </div>
        </section>

        {/* Dynamic Project Sections */}
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}

        {/* Closing Section */}
        <section className="h-screen flex items-center justify-center flex-col p-8">
            <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter uppercase mb-12">
                LET'S TALK
            </h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
                <div>
                    <span className="text-xs font-mono text-gray-500 block mb-4 uppercase tracking-widest">Email</span>
                    <a href="mailto:hello@huang.studio" className="text-2xl font-bold hover:opacity-60 transition-opacity">hello@huang.studio</a>
                </div>
                <div>
                    <span className="text-xs font-mono text-gray-500 block mb-4 uppercase tracking-widest">Social</span>
                    <div className="flex gap-6">
                        <a href="#" className="text-xl font-bold hover:opacity-60">X</a>
                        <a href="#" className="text-xl font-bold hover:opacity-60">IG</a>
                        <a href="#" className="text-xl font-bold hover:opacity-60">BE</a>
                    </div>
                </div>
            </div>
            <p className="mt-24 text-xs font-mono text-gray-600 uppercase tracking-widest">© 2025 HUANG PORTFOLIO — MADE FOR THE WEB</p>
        </section>
      </main>

      {/* CSS Utilities for the outline text */}
      <style>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;

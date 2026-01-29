
import React from 'react';
import { Project } from '../types';

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden px-10 md:px-20">
      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap">
          {project.title.split(' ')[0]}
        </h2>
      </div>

      <div className={`w-full max-w-6xl flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 z-20`}>
        {/* Project Info */}
        <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
          <span className="text-sm font-mono text-gray-400 tracking-widest block mb-4">
            0{index + 1} / PROJECT
          </span>
          <h3 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            {project.title}
          </h3>
          <p className="text-lg text-gray-400 font-medium tracking-wide">
            {project.category}
          </p>
          <button className="mt-8 px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold tracking-widest uppercase">
            View Case
          </button>
        </div>

        {/* Project Image placeholder - offset from center to allow cube to be visible */}
        <div className="flex-1 w-full flex justify-center">
            <div className="relative group overflow-hidden w-full max-w-md aspect-[4/5] bg-neutral-900 border border-white/10 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

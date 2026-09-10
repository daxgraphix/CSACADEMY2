import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Building2, 
  Users
} from 'lucide-react';

export const AudienceStrip: React.FC = () => {
  const { theme } = useApp();

  const audiences = [
    { label: 'STUDENTS', icon: GraduationCap },
    { label: 'EDUCATORS', icon: BookOpen },
    { label: 'BUSINESSES', icon: Briefcase },
    { label: 'UNIVERSITIES', icon: Building2 },
    { label: 'ORGANIZATIONS', icon: Users }
  ];

  return (
    <section 
      id="trust-audience-strip" 
      className={`border-y py-5 sm:py-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Label */}
          <div className="text-center md:text-left max-w-xl">
            <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-[0.12em] sm:tracking-wider uppercase ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
            }`}>
              PRACTICAL LEARNING FOR THE DIGITAL GENERATION ACROSS AFRICA
            </span>
          </div>

          {/* Audience Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            {audiences.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold tracking-[0.08em] sm:tracking-wider border transition-all ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-300 hover:text-white hover:border-[var(--border-color)]'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors duration-200'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-red-strong)]" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

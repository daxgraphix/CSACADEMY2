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
      className={`border-y py-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-white border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="text-center md:text-left">
            <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
            }`}>
              PRACTICAL LEARNING FOR THE DIGITAL GENERATION ACROSS AFRICA
            </span>
          </div>

          {/* Audience Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {audiences.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider border transition-all ${
                    theme === 'dark'
                      ? 'bg-[#171717] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors duration-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#DC2626]" />
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

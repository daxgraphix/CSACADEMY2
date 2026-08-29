import React from 'react';
import { BlogPost } from '../types';
import { useApp } from '../context/AppContext';
import { ShareButtons } from './ShareButtons';
import { 
  X, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  ArrowLeft,
  Share2,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  post,
  onClose,
  openBookingModal
}) => {
  const { theme } = useApp();
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`border rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl relative transition-colors ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 backdrop-blur-md px-6 sm:px-8 py-5 border-b flex items-center justify-between z-10 ${
          theme === 'dark' ? 'bg-[#171717]/95 border-neutral-800' : 'bg-white/95 border-neutral-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-950/80 border border-red-800/80 text-[#DC2626] uppercase">
              {post.category}
            </span>
            <div className={`flex items-center gap-1.5 text-xs font-mono ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-neutral-800 hover:text-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {post.title}
            </h1>
            
            <div className={`flex flex-wrap items-center justify-between gap-4 text-xs pt-2 border-b pb-4 ${
              theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-800'
            }`}>
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{post.author}</span>
                <span> | </span>
                <div>CS Academy Editorial</div>
              </div>

              {/* Share in Article Header */}
              <ShareButtons
                title={post.title}
                description={post.excerpt}
                variant="compact"
              />
            </div>
          </div>

          {/* Intro Excerpt */}
          <div className={`p-5 rounded-2xl border-l-4 border-[#DC2626] border-y border-r text-sm sm:text-base leading-relaxed italic font-medium ${
            theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800 text-neutral-200' : 'bg-red-50/50 border-neutral-200 text-neutral-800'
          }`}>
            "{post.content.intro}"
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {sec.heading}
                </h2>
                <div className={`space-y-2 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                }`}>
                  {sec.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                {sec.keyTip && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 mt-3 ${
                    theme === 'dark' 
                      ? 'bg-red-950/20 border-red-900/40 text-red-200' 
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}>
                    <Lightbulb className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span><strong>Actionable Rule:</strong> {sec.keyTip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className={`p-6 rounded-2xl border space-y-2 ${
            theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#DC2626]">
              Summary & Next Steps
            </h3>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {post.content.conclusion}
            </p>
          </div>

          {/* Tags & Full Share Bar */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-neutral-500" />
              {post.tags.map((t, i) => (
                <span key={i} className={`text-xs px-2.5 py-1 rounded-md border ${
                  theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  #{t}
                </span>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <ShareButtons
                title={post.title}
                description={post.excerpt}
                variant="inline"
              />
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div>
              <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Want your team trained on this topic?
              </div>
              <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                Request a live workshop or executive briefing.
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: `Training on ${post.category}: ${post.title}` });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] uppercase tracking-wider shadow-lg transition-all"
            >
              Book Related Training
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

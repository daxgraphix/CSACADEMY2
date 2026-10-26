import React, { useState } from 'react';
import { Share2, Check, MessageSquare, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
  className?: string;
  variant?: 'inline' | 'compact' | 'card';
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  description,
  className = '',
  variant = 'inline'
}) => {
  const { theme } = useApp();
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://csacademy.africa');
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareText = `${title}${description ? `: ${description}` : ''}`;
  const encodedText = encodeURIComponent(shareText);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const waUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const twUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&via=CSAcademyAfrica`;
    window.open(twUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    window.open(liUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        id="share-buttons-compact" 
        className={`flex items-center gap-1.5 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={`text-[11px] font-mono font-semibold mr-1 ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
        }`}>
          Share:
        </span>
        
        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          title={'Share on WhatsApp'}
          aria-label="Share on WhatsApp"
          className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'}`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>

        {/* Twitter / X */}
        <button
          onClick={handleTwitter}
          title={'Share on X (Twitter)'}
          aria-label="Share on X (Twitter)"
          className={`p-1.5 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200' 
              : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
          }`}
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={handleLinkedIn}
          title={'Share on LinkedIn'}
          aria-label="Share on LinkedIn"
          className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300' : 'bg-sky-100 hover:bg-sky-200 text-sky-800'}`}
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          title={'Copy link'}
          aria-label="Copy link"
          className={`p-1.5 rounded-lg transition-colors ${
            copied
              ? theme === 'dark' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
              : theme === 'dark' 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' 
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  return (
    <div 
      id="share-buttons-container" 
      className={`flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`basis-full flex min-w-0 items-center gap-1 text-[10px] sm:basis-auto sm:gap-1.5 sm:text-xs font-bold uppercase tracking-wider ${
        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
      }`}>
        <Share2 className="w-3 h-3 shrink-0 text-[var(--accent-red-strong)] sm:w-3.5 sm:h-3.5" />
        <span>Share This Content:</span>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
        {/* WhatsApp Button */}
        <button
          id="btn-share-whatsapp"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-sm"
        >
          <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>WhatsApp</span>
        </button>

        {/* Twitter/X Button */}
        <button
          id="btn-share-twitter"
          onClick={handleTwitter}
          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold active:scale-95 transition-all shadow-sm ${
            theme === 'dark'
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }`}
        >
          <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>X / Twitter</span>
        </button>

        {/* LinkedIn Button */}
        <button
          id="btn-share-linkedin"
          onClick={handleLinkedIn}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#004182] active:scale-95 transition-all shadow-sm"
        >
          <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>LinkedIn</span>
        </button>

        {/* Copy Link Button */}
        <button
          id="btn-share-copy"
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold border transition-all ${
            copied
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
                : 'bg-white hover:bg-neutral-100 transition-colors duration-200 text-neutral-800 border-neutral-300 shadow-sm'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400 sm:w-3.5 sm:h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

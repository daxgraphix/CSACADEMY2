import { ResourceItem } from '../types';
import { siteConfig } from '../config/site';

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const buildHtml = (r: ResourceItem): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(r.title)} | CS Academy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11pt;
      line-height: 1.65;
      color: #000000;
      background: #ffffff;
      padding: 0;
    }

    @page {
      size: A4;
      margin: 0;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 18mm 20mm 18mm 20mm;
      page-break-after: always;
      position: relative;
      background: #ffffff;
    }
    .page:last-child { page-break-after: auto; }

    /* ── HEADER BANNER ── */
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #dc2626 100%);
      color: #ffffff;
      padding: 22mm 0 16mm 0;
      margin: -18mm -20mm 0 -20mm;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 18px,
        rgba(0,0,0,0.04) 18px,
        rgba(0,0,0,0.04) 19px
      );
    }
    .header-inner { position: relative; padding: 0 20mm; }
    .branding-row {
      display: flex;
      align-items: center;
      gap: 8pt;
      margin-bottom: 8pt;
    }
    .brand-dot {
      width: 18pt;
      height: 18pt;
      border-radius: 50%;
      background: linear-gradient(135deg, #ffffff, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9pt;
      font-weight: 900;
      color: #dc2626;
      flex-shrink: 0;
    }
    .brand-text {
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 6pt;
    }
    .brand-text .parent-org {
      font-size: 7.5pt;
      opacity: 0.7;
      font-weight: 600;
    }

    .header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 14pt;
    }
    .doc-meta {
      text-align: right;
    }
    .doc-meta-row {
      font-size: 7.5pt;
      font-weight: 600;
      letter-spacing: 0.08em;
      opacity: 0.85;
      line-height: 1.7;
    }
    .doc-meta-row span {
      background: rgba(255,255,255,0.18);
      padding: 1pt 5pt;
      border-radius: 3pt;
    }

    .header-title {
      font-size: 22pt;
      font-weight: 900;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: #ffffff;
      margin-bottom: 8pt;
    }
    .header-desc {
      font-size: 10pt;
      line-height: 1.55;
      opacity: 0.92;
      max-width: 148mm;
      color: #ffffff;
    }
    .header-divider {
      height: 2pt;
      background: linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0.1));
      margin: 14pt 0 0 0;
      border-radius: 1pt;
    }

    /* ── STATS ROW ── */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1pt;
      margin: 12pt 0 0 0;
    }
    .stat-cell {
      background: rgba(255,255,255,0.12);
      border-radius: 4pt;
      padding: 7pt 8pt;
      text-align: center;
    }
    .stat-value {
      font-size: 13pt;
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #ffffff;
      line-height: 1.1;
    }
    .stat-label {
      font-size: 6.5pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.75);
      margin-top: 2pt;
    }

    /* ── SECTION HEADERS ── */
    .section-header {
      display: flex;
      align-items: center;
      gap: 6pt;
      margin: 16pt 0 8pt 0;
    }
    .section-pill {
      background: #dc2626;
      color: #ffffff;
      font-size: 6.5pt;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 2.5pt 7pt;
      border-radius: 3pt;
    }
    .section-line {
      flex: 1;
      height: 1pt;
      background: linear-gradient(to right, #e5e5e5, transparent);
    }

    /* ── BODY COPY ── */
    .body-text {
      font-size: 9.5pt;
      line-height: 1.7;
      color: #000000;
      margin-bottom: 10pt;
    }
    .body-text strong { color: #000000; font-weight: 700; }

    /* ── HIGHLIGHTS GRID ── */
    .highlights-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6pt;
    }
    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 6pt;
      padding: 7pt 9pt;
      background: #ffffff;
      border-left: 2.5pt solid #dc2626;
      border-radius: 0 4pt 4pt 0;
    }
    .highlight-num {
      font-size: 7pt;
      font-weight: 800;
      color: #dc2626;
      background: #ffffff;
      width: 14pt;
      height: 14pt;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1pt;
    }
    .highlight-text {
      font-size: 8.5pt;
      font-weight: 600;
      color: #000000;
      line-height: 1.45;
    }

    /* ── USE CASES LIST ── */
    .use-cases-list {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4pt 10pt;
    }
    .use-cases-list li {
      font-size: 8.5pt;
      color: #000000;
      padding: 4pt 0 4pt 16pt;
      position: relative;
      border-bottom: 0.5pt solid rgba(0, 0, 0, 0.12);
      line-height: 1.45;
    }
    .use-cases-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #dc2626;
      font-weight: 800;
    }

    /* ── MAIN CONTENT BLOCK ── */
    .content-block {
      background: #ffffff;
      border: 0.75pt solid #e5e7eb;
      border-radius: 6pt;
      padding: 12pt 14pt;
      margin-top: 4pt;
    }
    .content-block-header {
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #dc2626;
      margin-bottom: 8pt;
      padding-bottom: 6pt;
      border-bottom: 0.75pt solid #e5e7eb;
    }
    .content-entry {
      margin-bottom: 10pt;
      padding: 8pt 10pt;
      background: #ffffff;
      border-left: 2pt solid #dc2626;
      border-radius: 0 4pt 4pt 0;
    }
    .content-entry:last-child { margin-bottom: 0; }
    .content-entry-label {
      font-size: 6.5pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #dc2626;
      margin-bottom: 3pt;
    }
    .content-entry-text {
      font-size: 8.5pt;
      line-height: 1.65;
      color: #000000;
    }
    .content-entry-text code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      background: #ffffff;
      padding: 0.5pt 3pt;
      border-radius: 2pt;
      color: #dc2626;
    }

    /* ── FOOTER ── */
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 6pt 20mm 10pt 20mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 0.5pt solid rgba(0, 0, 0, 0.12);
      margin: 0 -20mm -18mm -20mm;
      background: #ffffff;
    }
    .footer-brand {
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #dc2626;
    }
    .footer-tagline {
      font-size: 6pt;
      color: #000000;
      font-style: italic;
      margin-top: 1pt;
    }
    .footer-contact {
      text-align: right;
    }
    .footer-contact a {
      font-size: 7pt;
      font-weight: 700;
      color: #000000;
      text-decoration: none;
    }
    .footer-contact-divider {
      height: 1pt;
      width: 24pt;
      background: #dc2626;
      margin-left: auto;
      margin-top: 2pt;
      border-radius: 0.5pt;
    }

    /* ── PRINT OVERRIDES ── */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { width: 100%; }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <div class="header-inner">
        <div class="branding-row">
          <div class="brand-dot">${siteConfig.academyName.charAt(0)}</div>
          <div class="brand-text">${siteConfig.academyName} <span class="parent-org">| ${siteConfig.parentOrg}</span></div>
        </div>
        <div class="header-top">
          <div class="doc-meta">
            <div class="doc-meta-row"><span>${escapeHtml(r.format)}</span></div>
            <div class="doc-meta-row" style="margin-top:2pt"><span>${escapeHtml(r.category)}</span></div>
            <div class="doc-meta-row" style="margin-top:2pt"><span>${escapeHtml(r.readingTime)}</span></div>
          </div>
        </div>
        <div class="header-title">${escapeHtml(r.title)}</div>
        <div class="header-desc">${escapeHtml(r.description)}</div>
        <div class="header-divider"></div>
        <div class="stats-row">
          <div class="stat-cell">
            <div class="stat-value">${escapeHtml(r.level)}</div>
            <div class="stat-label">Level</div>
          </div>
          <div class="stat-cell">
            <div class="stat-value">${escapeHtml(r.readingTime)}</div>
            <div class="stat-label">Reading Time</div>
          </div>
          <div class="stat-cell">
            <div class="stat-value">${escapeHtml(r.format)}</div>
            <div class="stat-label">Format</div>
          </div>
          <div class="stat-cell">
            <div class="stat-value">${r.keyHighlights.length}</div>
            <div class="stat-label">Key Highlights</div>
          </div>
        </div>
      </div>
    </div>

    <!-- TARGET AUDIENCE -->
    <div class="section-header">
      <div class="section-pill">Target Audience</div>
      <div class="section-line"></div>
    </div>
    <p class="body-text">${escapeHtml(r.targetAudience)}</p>

    <!-- KEY HIGHLIGHTS -->
    <div class="section-header">
      <div class="section-pill">Key Highlights</div>
      <div class="section-line"></div>
    </div>
    <div class="highlights-grid">
      ${r.keyHighlights.map((h, i) => `
        <div class="highlight-item">
          <div class="highlight-num">${i + 1}</div>
          <div class="highlight-text">${escapeHtml(h)}</div>
        </div>
      `).join('')}
    </div>

    <!-- USE CASES -->
    <div class="section-header" style="margin-top:14pt">
      <div class="section-pill">Ways to Use This Guide</div>
      <div class="section-line"></div>
    </div>
    <ul class="use-cases-list">
      ${r.useCases.map(u => `<li>${escapeHtml(u)}</li>`).join('')}
    </ul>

    <!-- GUIDE CONTENT -->
    <div class="section-header" style="margin-top:14pt">
      <div class="section-pill">Guide &amp; Checklist Content</div>
      <div class="section-line"></div>
    </div>
    <div class="content-block">
      <div class="content-block-header">Preview - Tap into CS Academy to access the full toolkit</div>
      ${(r.previewContent || []).map((p, i) => `
        <div class="content-entry">
          <div class="content-entry-label">Section ${i + 1}</div>
          <div class="content-entry-text">${escapeHtml(p)}</div>
        </div>
      `).join('')}
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div>
        <div class="footer-brand">${siteConfig.academyName} | ${siteConfig.parentOrg}</div>
        <div class="footer-tagline">${siteConfig.tagline}</div>
        <div class="footer-tagline">Founded ${siteConfig.establishedYear} | ${siteConfig.location}</div>
      </div>
      <div class="footer-contact">
        <div><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></div>
        <div><a href="https://academy.cyberswahili.co.tz">${siteConfig.phoneDisplay}</a></div>
        <div class="footer-contact-divider"></div>
      </div>
    </div>
  </div>
</body>
</html>`;

export const downloadResource = (resource: ResourceItem): void => {
  const html = buildHtml(resource);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const printWin = window.open(url, '_blank', 'width=1200,height=800');
  if (printWin) {
    printWin.onload = () => {
      setTimeout(() => {
        printWin.focus();
        printWin.print();
      }, 250);
    };
  }
};

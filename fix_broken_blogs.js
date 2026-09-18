const fs = require('fs');
const path = require('path');

const blogData = {
  'blog-4.html': {
    eyebrow: 'Crystals &amp; Energy',
    h1: 'A Guide to Choosing the Right Crystal<br /><em>for Yourself</em>',
    date: 'August 2026',
    readTime: '8 min read',
    tags: ['Crystals', 'Energy Healing', 'Intention'],
    banner: 'https://images.unsplash.com/photo-1555696958-c5049b866f6e?q=80&w=2070&auto=format&fit=crop',
    ctaBtnId: 'blog4-cta-btn'
  },
  'blog-5.html': {
    eyebrow: 'Mindfulness &amp; Silence',
    h1: 'Practicing Silence —<br /><em>The Journey Towards Inner Quietude</em>',
    date: 'August 2026',
    readTime: '6 min read',
    tags: ['Silence', 'Mindfulness', 'Mauna'],
    banner: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop',
    ctaBtnId: 'blog5-cta-btn'
  },
  'blog-6.html': {
    eyebrow: 'Healing &amp; Growth',
    h1: 'Trauma Is a Gift —<br /><em>Unwrapping the Lessons Within</em>',
    date: 'July 2026',
    readTime: '7 min read',
    tags: ['Trauma', 'Healing', 'Resilience'],
    banner: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop',
    ctaBtnId: 'blog6-cta-btn'
  },
  'blog-7.html': {
    eyebrow: 'Meditation &amp; Awareness',
    h1: 'Meditation —<br /><em>Learning to Be with Yourself</em>',
    date: 'July 2026',
    readTime: '6 min read',
    tags: ['Meditation', 'Awareness', 'Self-Discovery'],
    banner: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop',
    ctaBtnId: 'blog7-cta-btn'
  },
  'blog-8.html': {
    eyebrow: 'Meditation &amp; Inner Work',
    h1: 'The Part of Meditation<br /><em>Nobody Talks About</em>',
    date: 'July 2026',
    readTime: '8 min read',
    tags: ['Meditation', 'Emotions', 'Self-Awareness'],
    banner: 'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2064&auto=format&fit=crop',
    ctaBtnId: 'blog8-cta-btn'
  },
  'blog-9.html': {
    eyebrow: 'Affirmations &amp; Daily Practice',
    h1: '11 Affirmations I Practise<br /><em>Every Day</em>',
    date: 'June 2026',
    readTime: '5 min read',
    tags: ['Affirmations', 'Daily Practice', 'Mindset'],
    banner: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2000&auto=format&fit=crop',
    ctaBtnId: 'blog9-cta-btn'
  },
  'blog-10.html': {
    eyebrow: 'Relationships &amp; Attachment',
    h1: 'Why Do I Want to Go Back to the Person<br /><em>Who Has Hurt Me So Many Times?</em>',
    date: 'June 2026',
    readTime: '10 min read',
    tags: ['Relationships', 'Attachment', 'Psychology'],
    banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    ctaBtnId: 'blog10-cta-btn'
  }
};

function buildReplacement(data) {
  const tags = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
  const bannerStyle = `background: url('${data.banner}') center/cover no-repeat`;
  return `        <li><a href="blog.html">Insights</a></li>\r\n      </ul>\r\n\r\n      <div class="nav-cta">\r\n        <a href="updates.html" class="btn btn--gold" style="margin-right: 1rem;">Activities</a>\r\n        <a href="index.html#section-cta" class="btn btn--outline" id="nav-book-btn">Begin Your Journey</a>\r\n      </div>\r\n\r\n      <!-- Mobile toggle -->\r\n      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">\r\n        <span></span><span></span><span></span>\r\n      </button>\r\n    </div>\r\n  </nav>\r\n\r\n  <!-- Mobile Menu -->\r\n  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">\r\n    <a href="index.html">Home</a>\r\n    <a href="about.html">About</a>\r\n    <a href="index.html#section-approach">approach</a>\r\n    <a href="blog.html">Insights</a>\r\n    <a href="about.html#section-philosophy">Philosophy</a>\r\n    <a href="updates.html" class="btn btn--gold" style="margin-top:1rem;">Activities</a>\r\n    <a href="index.html#section-cta" class="btn btn--primary" style="margin-top:1rem;">Begin Your Journey</a>\r\n  </div>\r\n  <section class="article-hero">\r\n    <div class="container" style="position:relative;z-index:1">\r\n      <div class="article-eyebrow">\r\n        <div class="article-eyebrow__line"></div><span class="section-label">${data.eyebrow}</span>\r\n        <div class="article-eyebrow__line"></div>\r\n      </div>\r\n      <h1>${data.h1}</h1>\r\n      <div class="article-meta"><span>Manila</span><span class="article-meta-dot"></span><span>${data.date}</span><span\r\n          class="article-meta-dot"></span><span>${data.readTime}</span></div>\r\n      <div class="article-tags">${tags}</div>\r\n    </div>\r\n  </section>\r\n  <div class="article-banner" style="${bannerStyle}">\r\n  </div>\r\n  <section class="article-body">\r\n    <div class="container">\r\n      <div class="article-content">\r\n        <a href="blog.html" class="back-link"><svg viewBox="0 0 24 24">\r\n            <line x1="19" y1="12" x2="5" y2="12" />\r\n            <polyline points="12 19 5 12 12 5" />\r\n          </svg>Back to Insights</a>`;
}

const dir = path.join(__dirname);

for (const [filename, data] of Object.entries(blogData)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the broken nav line pattern
  const lines = content.split('\n');
  let brokenLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('<li><a href="blog.html">Insights</a>') && !trimmed.includes('</li>')) {
      brokenLineIdx = i;
      break;
    }
  }
  
  if (brokenLineIdx === -1) {
    console.log('SKIP (no broken nav found): ' + filename);
    continue;
  }
  
  const replacement = buildReplacement(data);
  lines[brokenLineIdx] = replacement;
  
  let fixed = lines.join('\n');
  
  // Fix the CTA button ID (many broken blogs have id="blog1-cta-btn")
  fixed = fixed.replace(/id="blog1-cta-btn"/g, `id="${data.ctaBtnId}"`);
  
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log('FIXED: ' + filename + ' (broken nav at line ' + (brokenLineIdx+1) + ')');
}
console.log('All done!');

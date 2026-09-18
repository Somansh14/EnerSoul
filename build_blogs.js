const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'Blogs');
const blogHtmlPath = path.join(__dirname, 'blog.html');
const templateHtmlPath = path.join(__dirname, 'blog-1.html');

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
files.sort((a, b) => {
    const numA = parseInt(a.match(/Art(?:c)?ile (\d+)/i)?.[1] || 0);
    const numB = parseInt(b.match(/Art(?:c)?ile (\d+)/i)?.[1] || 0);
    return numA - numB;
});

const images = [
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop', // 1 -> 4
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop', // 2 -> 5
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop', // 3 -> 6
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', // 4 -> 7
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', // 5 -> 8
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop', // 6 -> 9
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1200&auto=format&fit=crop', // 7 -> 10
];

const tags = [
    ['Psychology', 'Patterns'],
    ['Healing', 'Crystals'],
    ['Mindfulness', 'Silence'],
    ['Healing', 'Growth'],
    ['Meditation', 'Wellbeing'],
    ['Mind', 'Depth'],
    ['Mindset', 'Growth']
];

const dates = [
    'June 2026',
    'June 2026',
    'July 2026',
    'July 2026',
    'August 2026',
    'August 2026',
    'September 2026'
];

let blogListingTemplate = fs.readFileSync(blogHtmlPath, 'utf8');
let articleTemplate = fs.readFileSync(templateHtmlPath, 'utf8');

let gridCardsList = [];

function markdownToHtml(md) {
    const lines = md.split('\n');
    let html = '';
    let title = '';
    let firstP = '';
    let isFirst = true;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line === '&nbsp;') continue;

        if (line.startsWith('**') && line.endsWith('**')) {
            let text = line.replace(/^\*\*|\*\*$/g, '').trim();
            if (isFirst) {
                title = text;
                isFirst = false;
            } else {
                html += `\n<h2>${text}</h2>\n`;
            }
        } else {
            let pText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>');
            if (isFirst) {
                title = pText;
                isFirst = false;
            } else {
                html += `<p>${pText}</p>\n`;
                if (!firstP) firstP = pText;
            }
        }
    }
    return { title, html, firstP };
}

for (let i = 0; i < files.length; i++) {
    const mdPath = path.join(blogsDir, files[i]);
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const { title, html, firstP } = markdownToHtml(mdContent);
    const readTime = Math.max(3, Math.ceil(mdContent.split(/\s+/).length / 200)) + ' min read';

    const blogFile = `blog-${i + 4}.html`; // 4 to 10
    const image = images[i];
    const itemTags = tags[i];
    const dateStr = dates[i];

    let article = articleTemplate;

    article = article.replace(/<title>.*?<\/title>/s, `<title>${title} | EnerSoul Healing</title>`);
    article = article.replace(/<h1>.*?<\/h1>/s, `<h1>${title}</h1>`);
    article = article.replace(
        /.article-banner {\s*width: 100%;\s*height: 400px;\s*position: relative;\s*overflow: hidden;\s*background: url\('[^']+'\).*?;/s,
        `.article-banner {\n      width: 100%;\n      height: 400px;\n      position: relative;\n      overflow: hidden;\n      background: url('${image}') center/cover no-repeat;`
    );
    
    // In original blog-1.html it is: <div class="article-meta"><span>Manila</span><span class="article-meta-dot"></span><span>August 2026</span><span class="article-meta-dot"></span><span>8 min read</span></div>
    article = article.replace(
        /<div class="article-meta">.*?<\/div>/s,
        `<div class="article-meta"><span>Manila</span><span class="article-meta-dot"></span><span>${dateStr}</span><span class="article-meta-dot"></span><span>${readTime}</span></div>`
    );

    const tagsHtml = itemTags.map(t => `<span class="tag-pill">${t}</span>`).join('');
    article = article.replace(/<div class="article-tags">.*?<\/div>/s, `<div class="article-tags">${tagsHtml}</div>`);

    const parts = article.split('<div class="author-card">');
    if (parts.length > 1) {
        const headPart = parts[0];
        const backLinkMatch = headPart.match(/(<a href="blog\.html"[^>]*>.*?<\/a>)/s);
        
        if (backLinkMatch) {
            const preBackLink = headPart.substring(0, backLinkMatch.index + backLinkMatch[0].length);
            const newBody = preBackLink + '\n' + html + '\n<div class="author-card">';
            article = newBody + parts[1];
        }
    }

    fs.writeFileSync(path.join(__dirname, blogFile), article);
    console.log(`Generated ${blogFile}`);

    let excerpt = firstP.replace(/<[^>]*>?/gm, ''); // strip tags
    excerpt = excerpt.length > 200 ? excerpt.substring(0, 197) + '...' : excerpt;
    
    const cardHtml = `
        <!-- ── BLOG ${i + 4} ── -->
        <a href="${blogFile}" class="blog-card reveal" id="blog-card-${i + 4}">
          <div class="blog-card__image-wrap" style="background: url('${image}') center/cover;">
            <div class="blog-card__tag">
              ${itemTags.map(t => `<span class="tag-pill">${t}</span>`).join('\n              ')}
            </div>
          </div>
          <div class="blog-card__body">
            <div class="blog-card__meta">
              <span>${dateStr}</span>
              <span class="blog-card__meta-dot"></span>
              <span>${readTime}</span>
            </div>
            <h2 class="blog-card__title">${title}</h2>
            <p class="blog-card__excerpt">
              ${excerpt}
            </p>
            <div class="blog-card__footer">
              <div class="blog-card__author">
                <div class="blog-card__avatar">M</div>
                <span class="blog-card__author-name">Manila</span>
              </div>
              <span class="blog-card__read-link">
                Read more
                <svg viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </a>
`;
    gridCardsList.push(cardHtml);
}

// Ensure the new ones are in reverse chronological order (newest at the top of the NEW list)
const gridCards = gridCardsList.reverse().join('\n');

// Append them to the existing grid inside blog.html
let newBlogListing = blogListingTemplate.replace(
    /<\/div><!-- \/blog-grid -->/s,
    `\n${gridCards}\n      </div><!-- /blog-grid -->`
);

fs.writeFileSync(blogHtmlPath, newBlogListing);
console.log('Updated blog.html with 7 new blogs added after the original 3.');

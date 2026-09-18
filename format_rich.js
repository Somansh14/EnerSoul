const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'Blogs');
const templateHtmlPath = path.join(__dirname, 'blog-1.html');

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
files.sort((a, b) => {
    const numA = parseInt(a.match(/Art(?:c)?ile (\d+)/i)?.[1] || 0);
    const numB = parseInt(b.match(/Art(?:c)?ile (\d+)/i)?.[1] || 0);
    return numA - numB;
});

const images = [
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1200&auto=format&fit=crop',
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

let articleTemplate = fs.readFileSync(templateHtmlPath, 'utf8');

function markdownToHtml(md) {
    const lines = md.split('\n');
    let html = '';
    let title = '';
    let firstP = '';
    let pCount = 0;
    
    let artDivInserted = false;
    let pullQuoteInserted = false;
    let insightBoxInserted = false;

    let validLines = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line && line !== '&nbsp;') validLines.push(line);
    }

    if (validLines.length > 0 && validLines[0].startsWith('**')) {
        title = validLines[0].replace(/^\*\*|\*\*$/g, '').trim();
        validLines.shift();
    } else {
        title = validLines[0];
        validLines.shift();
    }

    let totalP = validLines.filter(l => !l.startsWith('**')).length;

    for (let i = 0; i < validLines.length; i++) {
        let line = validLines[i];
        
        if (line.startsWith('**') && line.endsWith('**') && line.length < 150) {
            let text = line.replace(/^\*\*|\*\*$/g, '').trim();
            if (!artDivInserted && pCount >= 2) {
                html += `\n<div class="art-div">\n  <div class="art-div__line"></div><svg viewBox="0 0 24 24"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" /></svg>\n  <div class="art-div__line"></div>\n</div>\n`;
                artDivInserted = true;
            }
            html += `<h2>${text}</h2>\n`;
        } else {
            let pText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>');
            pCount++;
            
            if (pCount === 1) {
                html += `<p class="lead">${pText}</p>\n`;
                firstP = pText;
            } else if (!pullQuoteInserted && pText.length > 30 && pText.length < 200 && (pCount === 3 || pCount === 4)) {
                let cleanQuote = pText.replace(/^["“”]|["“”]$/g, '');
                html += `<div class="pull-quote">\n  <p>"${cleanQuote}"</p>\n</div>\n`;
                pullQuoteInserted = true;
            } else if (!insightBoxInserted && ((pText.includes('?') && pCount > 4) || (pCount === totalP && pCount > 4))) {
                let boxTitle = pText.includes('?') ? 'A question to sit with' : 'A gentle reminder';
                html += `<div class="insight-box">\n  <h4>${boxTitle}</h4>\n  <p>${pText}</p>\n</div>\n`;
                insightBoxInserted = true;
            } else {
                html += `<p>${pText}</p>\n`;
            }
        }
    }
    return { title, html, firstP };
}

for (let i = 0; i < files.length; i++) {
    const mdPath = path.join(blogsDir, files[i]);
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const { title, html } = markdownToHtml(mdContent);
    const readTime = Math.max(3, Math.ceil(mdContent.split(/\s+/).length / 200)) + ' min read';

    const blogFile = `blog-${i + 4}.html`; // targeting 4 to 10
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
    console.log(`Rich formatted ${blogFile}`);
}

const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

const desktopNav = `
<ul class="nav-links" role="list">
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="index.html#section-modalities">approach</a></li>
  <li><a href="blog.html">Insights</a></li>
</ul>
`.trim();

const mobileNav = `
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="index.html#section-modalities">approach</a>
  <a href="blog.html">Insights</a>
  <a href="about.html#section-philosophy">Philosophy</a>
  <a href="updates.html" class="btn btn--gold" style="margin-top:1rem;">Activities</a>
  <a href="index.html#section-cta" class="btn btn--primary" style="margin-top:1rem;">Request a Call</a>
</div>
`.trim();

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace desktop nav
        content = content.replace(/<ul class="nav-links"[^>]*>[\s\S]*?<\/ul>/, desktopNav);

        // Replace mobile nav
        // Look for <div class="mobile-menu" ...> and end at the next </div>
        // Careful not to match too greedily, so use a non-greedy match that stops at the closing </div> of the mobile-menu.
        // It's safer to use string manipulation if the mobile menu has no nested divs.
        const mobileStart = content.indexOf('<div class="mobile-menu"');
        if (mobileStart !== -1) {
            const mobileEnd = content.indexOf('</div>', mobileStart) + '</div>'.length;
            content = content.substring(0, mobileStart) + mobileNav + content.substring(mobileEnd);
        }

        // Let's add the active styles based on the filename
        if (file === 'blog.html' || file.startsWith('blog-')) {
            content = content.replace('<a href="blog.html">Insights</a>', '<a href="blog.html" style="color:var(--sage-deep)">Insights</a>');
        } else if (file === 'about.html') {
            content = content.replace('<a href="about.html">About</a>', '<a href="about.html" style="color:var(--sage-deep)">About</a>');
        } else if (file === 'updates.html') {
            content = content.replace('<a href="updates.html">Updates</a>', '<a href="updates.html" style="color:var(--sage-deep)">Updates</a>');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed nav in ${file}`);
    }
});

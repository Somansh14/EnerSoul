const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

const footerNav = `
<div class="footer-links">
  <h5>Navigate</h5>
  <ul role="list">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About Manila</a></li>
    <li><a href="index.html#section-modalities">Services</a></li>
    <li><a href="updates.html">Updates</a></li>
    <li><a href="blog.html">Insights / Blogs</a></li>
  </ul>
</div>
`.trim();

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Look for the footer navigate block. It starts with <div class="footer-links"><h5>Navigate</h5>
        // We will replace it.
        const footerLinksStart = content.indexOf('<div class="footer-links"');
        if (footerLinksStart !== -1) {
            const h5Index = content.indexOf('<h5>Navigate</h5>', footerLinksStart);
            if (h5Index !== -1 && h5Index < footerLinksStart + 100) {
                // Find the closing </div> of this block
                const endDivIndex = content.indexOf('</div>', h5Index);
                if (endDivIndex !== -1) {
                    content = content.substring(0, footerLinksStart) + footerNav + content.substring(endDivIndex + '</div>'.length);
                }
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed footer in ${file}`);
    }
});

const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check desktop menu in nav-links
        // We look for the <li> that contains nav-blog
        // It might have inline styles
        const desktopRegex = /<li(?:>| [^>]*>)<a href="blog\.html" id="nav-blog"[^>]*>Insights<\/a><\/li>/g;
        
        content = content.replace(desktopRegex, (match) => {
            if (content.includes('id="nav-updates"')) {
                // If it already has updates link somewhere in the file, don't add
                return match;
            }
            return `<li><a href="updates.html" id="nav-updates">Updates</a></li>\n        ` + match;
        });

        // Mobile menu - it might not have id="mobile-nav-blog"
        // Let's find <div class="mobile-menu" ...> and insert Updates before blog
        const mobileNavStart = content.indexOf('class="mobile-menu"');
        if (mobileNavStart !== -1) {
            const blogLinkMobileIndex = content.indexOf('<a href="blog.html"', mobileNavStart);
            if (blogLinkMobileIndex !== -1 && !content.includes('href="updates.html"', mobileNavStart)) {
                // Insert <a href="updates.html" id="mobile-nav-updates">Updates</a>
                const before = content.substring(0, blogLinkMobileIndex);
                const after = content.substring(blogLinkMobileIndex);
                content = before + '<a href="updates.html" id="mobile-nav-updates">Updates</a>\n    ' + after;
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed ${file}`);
    }
});

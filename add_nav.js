const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Add to desktop navbar
        const desktopBlogLink = '<li><a href="blog.html" id="nav-blog">Insights</a></li>';
        const desktopUpdatesLink = '<li><a href="updates.html" id="nav-updates">Updates</a></li>\n        ';
        if (content.includes(desktopBlogLink) && !content.includes('href="updates.html"')) {
            content = content.replace(desktopBlogLink, desktopUpdatesLink + desktopBlogLink);
        }

        // Add to mobile navbar
        const mobileBlogLink = '<a href="blog.html" id="mobile-nav-blog">Insights</a>';
        const mobileUpdatesLink = '<a href="updates.html" id="mobile-nav-updates">Updates</a>\n    ';
        if (content.includes(mobileBlogLink) && !content.includes('id="mobile-nav-updates"')) {
            content = content.replace(mobileBlogLink, mobileUpdatesLink + mobileBlogLink);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added updates to nav in ${file}`);
    }
});

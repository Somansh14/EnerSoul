const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\Somansh\\Desktop\\EnerSoul';
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filepath = path.join(dirPath, file);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // Find everything inside <body>...</body>
        const bodyRegex = /(<body[^>]*>)([\s\S]*?)(<\/body>)/i;
        const match = content.match(bodyRegex);
        
        if (match) {
            const bodyStart = match[1];
            const innerBody = match[2];
            const bodyEnd = match[3];
            
            if (innerBody.includes('<!-- ==HIDDEN==')) {
                return; // Already processed
            }
            
            // HTML doesn't allow nested comments, so we replace existing comments
            const safeInner = innerBody.replace(/<!--/g, '<! --').replace(/-->/g, '-- >');
            
            const newInnerBody = `\n<!-- ==HIDDEN==\n${safeInner}\n==HIDDEN== -->\n<section id="hero"><div class="hero-bg" aria-hidden="true" style="position:fixed;inset:0;background-image:url('images/hero_bg.jpg');background-size:cover;background-position:center;opacity:0.32;z-index:-1;"></div></section>\n`;
            
            const newContent = content.substring(0, match.index + bodyStart.length) 
                             + newInnerBody 
                             + content.substring(match.index + bodyStart.length + innerBody.length);
                             
            fs.writeFileSync(filepath, newContent, 'utf-8');
            console.log(`Processed ${file}`);
        }
    }
});

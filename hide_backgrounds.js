const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\Somansh\\Desktop\\EnerSoul';
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filepath = path.join(dirPath, file);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // Hide geo-accent svgs
        content = content.replace(/(<svg[^>]*class="[^"]*geo-accent[^"]*"[^>]*>[\s\S]*?<\/svg>)/gi, '<!-- $1 -->');
        
        // Hide section-decor svgs
        content = content.replace(/(<svg[^>]*class="[^"]*section-decor[^"]*"[^>]*>[\s\S]*?<\/svg>)/gi, '<!-- $1 -->');
        
        // Hide botanical-corner svgs
        content = content.replace(/(<svg[^>]*class="[^"]*botanical-corner[^"]*"[^>]*>[\s\S]*?<\/svg>)/gi, '<!-- $1 -->');
        
        // Hide hero-video-wrap
        content = content.replace(/(<div class="hero-video-wrap"[^>]*>[\s\S]*?<div class="hero-video-glow"><\/div>\s*<\/div>)/gi, '<!-- $1 -->');
        
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Hidden background elements in ${file}`);
    }
});

const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\Somansh\\Desktop\\EnerSoul';
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filepath = path.join(dirPath, file);
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // Find the block: <!-- ==HIDDEN==\n ... \n==HIDDEN== -->
        const hiddenRegex = /<!-- ==HIDDEN==\n([\s\S]*?)\n==HIDDEN== -->/i;
        const match = content.match(hiddenRegex);
        
        if (match) {
            let restoredInner = match[1];
            // Revert escaped comments
            restoredInner = restoredInner.replace(/<! --/g, '<!--').replace(/-- >/g, '-->');
            
            // Replace the body content with the restored one
            const bodyRegex = /(<body[^>]*>)([\s\S]*?)(<\/body>)/i;
            content = content.replace(bodyRegex, `$1\n${restoredInner}\n$3`);
            
            fs.writeFileSync(filepath, content, 'utf-8');
            console.log(`Restored ${file}`);
        }
    }
});

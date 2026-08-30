const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Remove "Updates" from the standard nav list
        content = content.replace(/<li><a href="updates\.html"[^>]*>Updates<\/a><\/li>\s*/g, '');
        content = content.replace(/<li><a href="updates\.html"[^>]*>Activities<\/a><\/li>\s*/g, '');

        // 2. Remove from mobile list
        content = content.replace(/<a href="updates\.html"[^>]*>Updates<\/a>\s*/g, '');
        content = content.replace(/<a href="updates\.html"[^>]*>Activities<\/a>\s*/g, '');
        
        // 3. Add to nav-cta
        // We look for <div class="nav-cta">
        // If it doesn't already have Activities, we add it.
        const ctaStart = content.indexOf('<div class="nav-cta">');
        if (ctaStart !== -1 && !content.includes('>Activities</a>', ctaStart) && !content.includes('>Latest Updates</a>', ctaStart)) {
            const btnHtml = '<a href="updates.html" class="btn btn--gold" style="margin-right: 1rem;">Activities</a>';
            content = content.replace('<div class="nav-cta">', '<div class="nav-cta">\n        ' + btnHtml);
        }

        // 4. Add to mobile-menu
        // Look for the mobile menu closing </div> or the connect button
        const mobileStart = content.indexOf('<div class="mobile-menu"');
        if (mobileStart !== -1 && !content.includes('>Activities</a>', mobileStart)) {
            // Find Book a free call
            const connectStart = content.indexOf('<a href="https://wa.me', mobileStart);
            if (connectStart !== -1) {
                const mobileBtnHtml = '<a href="updates.html" class="btn btn--gold" style="margin-top:1rem;">Activities</a>\n    ';
                content = content.substring(0, connectStart) + mobileBtnHtml + content.substring(connectStart);
            }
        }

        // 5. Fix images in updates.html
        if (file === 'updates.html') {
            content = content.replace(/images\/blog-1\.jpg/g, 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?q=80&w=800&auto=format&fit=crop');
            content = content.replace(/images\/blog-2\.jpg/g, 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop');
            content = content.replace(/images\/blog-3\.jpg/g, 'https://images.unsplash.com/photo-1473221326025-9183b464bb7e?q=80&w=800&auto=format&fit=crop');
            content = content.replace(/onerror="this\.src='[^']+'"/g, ''); // remove onerror handler as it's not needed for remote urls
            
            // Also change title if needed
            content = content.replace(/>Updates & Activities</g, '>Activities & Events<');
            content = content.replace(/>Updates &amp; Activities</g, '>Activities &amp; Events<');
            content = content.replace(/<title>Updates &amp; Activities \| EnerSoul Healing<\/title>/g, '<title>Activities & Events | EnerSoul Healing</title>');
            content = content.replace(/<title>Updates & Activities \| EnerSoul Healing<\/title>/g, '<title>Activities & Events | EnerSoul Healing</title>');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    }
});

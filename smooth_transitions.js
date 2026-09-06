const fs = require('fs');

const cssPath = 'c:\\Users\\Somansh\\Desktop\\EnerSoul\\css\\style.css';
let content = fs.readFileSync(cssPath, 'utf-8');

// 1. Remove all box-shadows that look like `box-shadow: 0 -12px 50px ...` from sections
content = content.replace(/box-shadow:\s*0\s*-12px\s*50px\s*rgba[^;]+;/g, '');

// 2. Replace solid background #F5EFE6 with a gradient that fades from and to #FDFAF6
// This makes the transition smooth.
const smoothGradient = 'background: linear-gradient(to bottom, #FDFAF6 0%, #F5EFE6 10%, #F5EFE6 90%, #FDFAF6 100%)';
content = content.replace(/background:\s*#F5EFE6\s*;/gi, `${smoothGradient};`);

fs.writeFileSync(cssPath, content, 'utf-8');
console.log('Smoothed transitions in style.css');

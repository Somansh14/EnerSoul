const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\Somansh\\Desktop\\EnerSoul\\css\\style.css', 'utf-8');
const sectionRegex = /(#section-[a-z]+) \{([^}]+)\}/g;
let match;
while ((match = sectionRegex.exec(content)) !== null) {
    const sectionName = match[1];
    const rules = match[2];
    const bgMatch = rules.match(/background:\s*([^;]+);/);
    const bsMatch = rules.match(/box-shadow:\s*([^;]+);/);
    console.log(`${sectionName}:`);
    if (bgMatch) console.log(`  background: ${bgMatch[1]}`);
    if (bsMatch) console.log(`  box-shadow: ${bsMatch[1]}`);
}

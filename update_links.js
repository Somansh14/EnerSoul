const fs = require('fs');
const path = require('path');

const wa_link = 'https://wa.me/919024952636?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.';

const wa_float_html = `
  <!-- Floating WhatsApp Button -->
  <a href="${wa_link}" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-23.1-115-65-157zM223.9 413.3c-33 0-65.4-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7.1c-18.4-29.6-28.1-63.9-28.1-99 0-96.1 78.2-174.4 174.4-174.4 51.4 0 99.8 20 136.1 56.4 36.3 36.4 56.4 84.8 56.4 136.2 0 96.2-78.2 174.4-174.4 174.4zm95.4-130.8c-5.2-2.6-30.9-15.3-35.7-17-4.8-1.7-8.3-2.6-11.8 2.6-3.5 5.2-13.5 17-16.6 20.5-3.1 3.5-6.1 4-11.3 1.3-5.2-2.6-22.1-8.2-42-26.2-15.5-14-26-31.3-29.1-36.5-3.1-5.2-.3-8 2.3-10.6 2.4-2.4 5.2-6.1 7.8-9.1 2.6-3.1 3.5-5.2 5.2-8.7 1.7-3.5.9-6.6-.4-9.2-1.3-2.6-11.8-28.5-16.1-39-4.3-10.3-8.7-8.9-11.8-9-3.1-.1-6.6-.1-10.1-.1-3.5 0-9.2 1.3-14 6.5-4.8 5.2-18.3 17.9-18.3 43.6 0 25.8 18.8 50.7 21.4 54.2 2.6 3.5 37 56.5 89.6 79.2 12.5 5.4 22.3 8.6 29.9 11 12.6 4 24.1 3.4 33.2 2.1 10.3-1.5 30.9-12.6 35.3-24.8 4.3-12.2 4.3-22.7 3-24.8-1.4-2.1-4.9-3.4-10.1-6.1z"/>
    </svg>
  </a>
</body>
`;

const dirPath = __dirname;
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (path.extname(file) === '.html') {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Update "Book a Call" links
        content = content.replace(/href="#section-cta"/g, `href="${wa_link}" target="_blank"`);
        content = content.replace(/href="index\.html#section-cta"/g, `href="${wa_link}" target="_blank"`);
        
        // Also the CTA email button
        content = content.replace(/href="mailto:hello@enersoulshealing\.com"/g, `href="${wa_link}" target="_blank"`);
        
        // 2. Add floating WhatsApp button right before </body>
        if (!content.includes('<!-- Floating WhatsApp Button -->')) {
            content = content.replace('</body>', wa_float_html);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});

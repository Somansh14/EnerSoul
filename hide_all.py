import os
import re

dir_path = r'c:\Users\Somansh\Desktop\EnerSoul'
for file in os.listdir(dir_path):
    if file.endswith('.html'):
        filepath = os.path.join(dir_path, file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        match = re.search(r'(<body[^>]*>)(.*?)(</body>)', content, re.DOTALL | re.IGNORECASE)
        if match:
            body_start = match.group(1)
            inner_body = match.group(2)
            body_end = match.group(3)
            
            # If we already modified it, skip
            if '<!-- ==HIDDEN==' in inner_body:
                continue
                
            # We must escape existing comments or handle them if we just wrap in <!-- -->.
            # HTML doesn't allow nested comments. Let's just wrap everything in a div with display: none.
            # "just comment it out ... rest all hide it"
            # Since nesting comments is invalid HTML, hiding via CSS or removing is safer. 
            # I will replace `<!--` with `<! --` to prevent nested comments from breaking.
            safe_inner = inner_body.replace('<!--', '<! --').replace('-->', '-- >')
            
            new_inner_body = f'\n<!-- ==HIDDEN==\n{safe_inner}\n==HIDDEN== -->\n<section id="hero"><div class="hero-bg" aria-hidden="true" style="position:fixed;inset:0;background-image:url(\'images/hero_bg.jpg\');background-size:cover;background-position:center;opacity:0.32;z-index:-1;"></div></section>\n'
            
            new_content = content[:match.start(2)] + new_inner_body + content[match.end(2):]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        print(f"Processed {file}")

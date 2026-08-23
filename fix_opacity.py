import re

with open(r'c:\Users\Somansh\Desktop\EnerSoul\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove inline opacity styles from botanical-corner SVG tags in section areas
# They look like: <svg class="botanical-corner botanical-corner--tr" ... style="opacity:0.14;">
content = re.sub(r'(<svg\s[^>]*botanical-corner[^>]*?)\s+style="opacity:[^"]*"', r'\1', content)

with open(r'c:\Users\Somansh\Desktop\EnerSoul\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done - removed inline opacity overrides from botanical corners')

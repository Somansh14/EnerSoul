import re
import os

def increase_opacity(match):
    val = float(match.group(1))
    # Don't touch 0 or >= 1
    if val == 0 or val >= 1:
        return match.group(0)
    
    # Increase by 1.8x
    new_val = min(0.95, val * 1.8)
    
    # Format to remove trailing zeros
    new_val_str = f"{new_val:.2f}".rstrip('0').rstrip('.')
    if new_val_str == '': new_val_str = '0'
    
    return match.group(0).replace(match.group(1), new_val_str)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update opacity="0.xx"
    content = re.sub(r'opacity="([0-9.]+)"', increase_opacity, content)
    
    # 2. Update rgba(r,g,b,0.xx)
    content = re.sub(r'rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\)', increase_opacity, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file(r'c:\Users\Somansh\Desktop\EnerSoul\index.html')

def process_css(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # rgba
    content = re.sub(r'rgba\([^,]+,[^,]+,[^,]+,\s*([0-9.]+)\)', increase_opacity, content)
    
    # opacity: 0.xx
    content = re.sub(r'opacity:\s*([0-9.]+)', increase_opacity, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_css(r'c:\Users\Somansh\Desktop\EnerSoul\css\style.css')

print("Opacities increased successfully!")

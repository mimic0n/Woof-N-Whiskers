from pathlib import Path
import re, urllib.request
root=Path(__file__).resolve().parents[1]
url='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap'
request=urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
css=urllib.request.urlopen(request,timeout=30).read().decode()
out=root/'public/assets/fonts';out.mkdir(exist_ok=True)
for i,source in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css))):
 name=f'be-vietnam-pro-{i+1}.'+('woff2' if '.woff2' in source else 'ttf')
 (out/name).write_bytes(urllib.request.urlopen(source,timeout=30).read())
 css=css.replace(source,'/assets/fonts/'+name)
(root/'src/styles/fonts.css').write_text(css)
print('Imported Be Vietnam Pro font files')

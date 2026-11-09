"""Import public image assets referenced by the selected Stitch templates."""
from html.parser import HTMLParser
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json, urllib.request, subprocess

ROOT = Path(__file__).resolve().parents[1]
SELECTED = {
 'home':'91daf6aa992944c0a931f3a5eb033639',
 'about':'b33a9a5b9a31498ebe0897ade492a8cc',
 'services':'2bb48242e8a14651b567fe355326bbcf',
 'daycare':'08d16cc021814cd3a5234ce4c49f787a',
 'boarding':'84f118f4e06a47c5809775baf247a0c0',
 'grooming':'5108f37184c24cb891f25cae45a48482',
 'shop':'ff6a2e4e04424204a985ea1fa13dc41a',
 'account':'ffeed68b00434f0d9d14232f6f146232',
 'product':'20b34155a00f4c31b2521d0c47f74d54',
}
class Images(HTMLParser):
 def __init__(self): super().__init__(); self.urls=[]
 def handle_starttag(self, tag, attrs):
  attrs=dict(attrs)
  if tag=='img' and attrs.get('src','').startswith('https://'): self.urls.append(attrs['src'])

out=ROOT/'public/assets/stitch';out.mkdir(parents=True,exist_ok=True)
jobs=[]; manifest={}
for key,id in SELECTED.items():
 parser=Images();parser.feed((ROOT/f'design/stitch/{id}.html').read_text())
 manifest[key]=[]
 for i,url in enumerate(parser.urls):
  name=f'{key}-{i+1}.webp';manifest[key].append('/assets/stitch/'+name);jobs.append((url,name))
def download(job):
 url,name=job;target=out/name
 if target.exists():return
 with urllib.request.urlopen(url,timeout=45) as response: data=response.read()
 temp=out/(name+'.original');temp.write_bytes(data)
 subprocess.run(['magick',str(temp),'-resize','1200x1200>','-quality','82',str(target)],check=True)
 temp.unlink()
with ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(download,jobs))
(ROOT/'src/data/stitch-assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'design/stitch/assets.json').write_text(json.dumps([{'url':u,'local':'/assets/stitch/'+n,'origin':'Stitch project 17480892489591456143'} for u,n in jobs],indent=2)+'\n')
print(f'Imported {len(jobs)} images from {len(SELECTED)} templates.')

const fs = require('node:fs');
const postcss = require('postcss');
const tailwind = require('tailwindcss-v3');
const config = require('../tailwind.config.cjs');
const source = 'Demo/stitch_petshop_design_system (2)';
(async () => {
 const result = await postcss([tailwind({...config,content:[`${source}/code-animated.html`,'src/components/{Categories,TrustStrip,Services,FeaturedProducts,FlashProducts,ProductStories,FloatingDock,Hero}.jsx','src/pages/Home/Home.jsx'],corePlugins:{preflight:false},important:'.demo-home'})]).process('@tailwind base;\n@tailwind utilities;', {from:undefined});
 const paths=['hero-slider.css','product-stories.css','background.css','product-card.css','floating-dock.css'];
 const css=result.css+'\n'+paths.map(name=>fs.readFileSync(`${source}/assets/${name}`,'utf8').replaceAll("url('fonts/","url('/assets/fonts/").replaceAll("url('paw-mark.svg')","url('/assets/paw-mark.svg')").replaceAll("url('paw-cursor.svg')","url('/assets/paw-cursor.svg')")).join('\n');
 const root=postcss.parse(css);
 root.walkRules(rule=>{
  if(rule.parent.type==='atrule'&&/keyframes$/.test(rule.parent.name))return;
  rule.selectors=rule.selectors.map(selector=>selector.includes('.demo-home')?selector:selector==='body'||selector==='html'?'.demo-home':`.demo-home ${selector}`);
 });
 fs.writeFileSync('src/styles/demo-home-generated.css', '/* Generated from code-animated.html and its assets. Run node scripts/build-demo-home-css.cjs. */\n'+root.toString());
})();

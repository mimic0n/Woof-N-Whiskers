import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const root='[data-floating-dock]';
const desktop='[data-dock-desktop]';
const mobile='[data-dock-mobile]';
const routes=['/','/gioi-thieu/','/dich-vu/','/dich-vu/cham-soc-ban-ngay/','/dich-vu/luu-tru-ban-dem/','/dich-vu/cham-soc-long/','/dat-lich/','/tai-khoan/','/tai-khoan/thu-cung/','/cua-hang/','/cua-hang/san-pham/?id=royal-canin-mini','/gio-hang/','/thanh-toan/','/faq/','/chinh-sach/huy-lich/','/lien-he/','/blog/','/tim-kiem/?q=long','/missing/'];
async function capture(page,name){
 await mkdir('.impeccable/review/shared-dock',{recursive:true});
 await page.evaluate(async()=>{await document.fonts.ready;document.activeElement?.blur();});
 if(await page.locator(`${mobile} a`).count()){
  await expect.poll(()=>page.locator(`${mobile} a`).evaluateAll(links=>links.every(link=>Number(getComputedStyle(link.parentElement).opacity)===1))).toBe(true);
 }
 await page.screenshot({path:`.impeccable/review/shared-dock/${name}.png`});
}
test('one shared dock on every route, responsive navigation and no runtime errors',async({page})=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const path of routes){await page.goto(path);await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator(root)).toHaveCount(1);await expect(page.locator('.floating-dock')).toHaveCount(0);await expect(page.locator(width===1440?desktop:mobile)).toBeVisible();await expect(page.locator(width===1440?mobile:desktop)).toBeHidden();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path+' '+width).toBe(true);}}
 expect(errors).toEqual([]);
});
test('source desktop dimensions, light/dark colors, springs and cn overrides',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/dich-vu/');const tray=page.locator(desktop);await expect(tray).toHaveCSS('height','64px');await expect(tray).toHaveCSS('gap','16px');await expect(tray).toHaveCSS('padding-left','16px');await expect(tray).toHaveCSS('padding-bottom','12px');await expect(tray).toHaveCSS('border-radius','16px');
 const item=tray.locator('a>div').nth(3);await expect(item).toHaveCSS('width','40px');await expect(tray.locator('a')).toHaveCount(7);const box=await item.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await expect.poll(async()=>Number.parseFloat(await item.evaluate(el=>getComputedStyle(el).width))).toBeGreaterThan(78);await expect(tray.getByText('Về chúng tôi',{exact:true})).toBeVisible();const far=tray.locator('a>div').first();expect(Number.parseFloat(await far.evaluate(el=>getComputedStyle(el).width))).toBeLessThan(50);await capture(page,'desktop-light-hover');await page.mouse.move(10,10);await expect.poll(async()=>Number.parseFloat(await item.evaluate(el=>getComputedStyle(el).width))).toBeLessThan(41);await capture(page,'desktop-light');
 const light=await tray.evaluate(el=>getComputedStyle(el).backgroundColor);await page.evaluate(()=>document.documentElement.classList.add('dark'));const dark=await tray.evaluate(el=>getComputedStyle(el).backgroundColor);expect(dark).not.toBe(light);await expect(tray).toHaveCSS('background-color',/oklch\(0\.205 0 (?:0|none)\)/);await capture(page,'desktop-dark');
 const merged=await page.evaluate(async()=>{const {cn}=await import('/src/lib/utils.ts');return cn('h-16 bg-gray-50','h-20 bg-gray-200');});expect(merged).toBe('h-20 bg-gray-200');
 await tray.locator('a').first().focus();await expect(tray.getByText('Trang chủ',{exact:true})).toBeVisible();
});
test('mobile source tray, Escape, route transition without reload, active page and dark mode',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');await page.evaluate(()=>window.__dockRouteSentinel='alive');const toggle=page.locator(mobile).getByRole('button',{name:'Mở điều hướng',exact:true});await expect(toggle).toHaveCSS('width','40px');await expect(toggle).toHaveCSS('height','40px');await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');await expect(page.locator(mobile).getByRole('link')).toHaveCount(7);await expect(page.locator(mobile).getByRole('link',{name:'Cửa hàng',exact:true})).toBeVisible();await capture(page,'mobile-light-open');await toggle.focus();await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();await toggle.click();await page.locator(mobile).getByRole('link',{name:'Cửa hàng',exact:true}).click();await expect(page).toHaveURL(/cua-hang/);await expect(page.locator('h1')).toContainText('Cửa hàng');expect(await page.evaluate(()=>window.__dockRouteSentinel)).toBe('alive');await expect(page.locator(mobile).getByRole('button')).toHaveAttribute('aria-expanded','false');await page.locator(mobile).getByRole('button').click();await expect(page.locator(mobile).getByRole('link',{name:'Cửa hàng',exact:true})).toHaveAttribute('aria-current','page');await page.evaluate(()=>document.documentElement.classList.add('dark'));await capture(page,'mobile-dark-open');
});
test('reduced motion removes magnification and mobile displacement; 320/768px fit',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');const item=page.locator(desktop).locator('a>div').nth(3);await item.hover();await expect(item).toHaveCSS('width','40px');await expect(item).toHaveCSS('height','40px');await expect(item.locator(':scope>div').last()).toHaveCSS('width','20px');await capture(page,'desktop-reduced');
 for(const width of [320,768]){await page.setViewportSize({width,height:844});await page.goto('/dich-vu/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===320){await page.locator(mobile).getByRole('button').click();const link=page.locator(mobile).getByRole('link').first();await expect(link).toBeVisible();await expect(link.locator('..')).toHaveCSS('opacity','1');await expect(link.locator('..')).toHaveCSS('transform','none');await capture(page,'mobile-320-reduced');}else{await expect(page.locator(desktop)).toBeVisible();await capture(page,'tablet-768');}}
});

test('mobile links remain reachable beside scrolled homepage controls and toast',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.locator('#flash-products .product-cart').first().click();await page.locator('footer').scrollIntoViewIfNeeded();await page.locator(mobile).getByRole('button').click();const links=page.locator(`${mobile} a`);await expect(links).toHaveCount(7);await expect.poll(()=>links.evaluateAll(items=>items.every(a=>{const box=a.getBoundingClientRect();return document.elementFromPoint(box.x+box.width/2,box.y+box.height/2)?.closest('a')===a;}))).toBe(true);await capture(page,'mobile-scrolled-open');
});

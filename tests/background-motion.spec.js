import { test, expect } from '@playwright/test';

test('background motion pauses offscreen and respects live motion preference changes', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'no-preference' });
 await page.goto('/');
 const sale = page.locator('.home-scene-sale');
 const curve = sale.locator('.curve-large');
 await expect(curve).toHaveCSS('animation-play-state', 'paused');
 await sale.locator('h2').scrollIntoViewIfNeeded();
 await expect(curve).toHaveCSS('animation-play-state', 'running');
 const position = await sale.evaluate(el=>el.style.getPropertyValue('--motif-scroll'));
 await page.evaluate(()=>window.scrollBy(0,120));
 await expect.poll(()=>sale.evaluate(el=>el.style.getPropertyValue('--motif-scroll'))).not.toBe(position);
 await page.screenshot({path:'/tmp/wnw-background-sale-desktop.png'});
 await page.locator('.home-scene-booking h2').first().scrollIntoViewIfNeeded();
 await expect(curve).toHaveCSS('animation-play-state','paused');
 await page.screenshot({path:'/tmp/wnw-background-booking-desktop.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.home-scene-booking .curve-large')).toHaveCSS('animation-name','none');
 await expect(page.locator('.home-scene-booking .motif-first')).toHaveCSS('translate','none');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.setViewportSize({width:390,height:844});
 await sale.locator('h2').scrollIntoViewIfNeeded();
 await expect(curve).toHaveCSS('animation-duration','36s');
 await expect.poll(async()=>Math.abs(parseFloat(await sale.evaluate(el=>el.style.getPropertyValue('--motif-scroll'))))<=3).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await page.screenshot({path:'/tmp/wnw-background-sale-mobile.png'});
});

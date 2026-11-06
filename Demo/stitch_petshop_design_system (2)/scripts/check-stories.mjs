import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/opt/microsoft/msedge/msedge', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(new URL('../code-animated.html', import.meta.url).href, { waitUntil: 'networkidle' });
for (const width of [1440, 390]) {
 await page.setViewportSize({ width, height: 1000 });
 await page.locator('#product-stories').scrollIntoViewIfNeeded();
 assert.equal(await page.evaluate(() => document.querySelector('#hero-slider').nextElementSibling.id), 'product-stories');
 assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
 assert.ok(await page.locator('.product-story-card img').evaluateAll(imgs => imgs.every(i => i.complete && i.naturalWidth > 0)));
 await page.screenshot({ path: `/tmp/wnw-stories-${width}.png` });
}
await page.locator('a[href="#story-playtime"]').click();
assert.equal(await page.locator('#story-playtime').getAttribute('open'), '');
assert.deepEqual(errors, []);
await browser.close();
console.log('PASS: desktop/mobile layout, images, hero placement, story links, no runtime errors');

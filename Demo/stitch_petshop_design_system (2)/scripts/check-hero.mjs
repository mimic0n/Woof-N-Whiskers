import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/opt/microsoft/msedge/msedge', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.route('**/lh3.googleusercontent.com/**', route => route.abort());
await page.goto(new URL('../code-animated.html', import.meta.url).href, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.locator('#floating-dock-root a:visible').first().waitFor();
await page.evaluate(() => document.fonts.ready);
for (const [width, height, label] of [[1440,1000,'desktop'], [390,844,'mobile']]) {
 await page.setViewportSize({width,height});
 await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
 const layout = await page.evaluate(() => {
  const hero = document.querySelector('#hero-slider');
  const steps = document.querySelector('#booking-steps');
  const form = document.querySelector('#booking-card');
  const h1 = hero.querySelector('h1');
  return { radius: parseFloat(getComputedStyle(hero).borderRadius), font: getComputedStyle(h1).fontFamily,
    fontLoaded: document.fonts.check('800 32px Nunito', 'Yêu thương thú cưng'),
    follows: steps.nextElementSibling === form,
    formBeforeReviews: form.nextElementSibling?.id === 'testimonials',
    firstContentTop: hero.nextElementSibling.getBoundingClientRect().top,
    heroBottom: hero.getBoundingClientRect().bottom,
    overlap: form.getBoundingClientRect().top < steps.getBoundingClientRect().bottom,
    overflow: document.documentElement.scrollWidth > innerWidth };
 });
 assert.ok(layout.radius >= 24);
 assert.ok(layout.font.startsWith('Nunito') || layout.font.startsWith('"Nunito"'));
 assert.ok(layout.fontLoaded);
 assert.ok(layout.follows && layout.formBeforeReviews);
 assert.ok(!layout.overlap && !layout.overflow);
 assert.ok(layout.firstContentTop - layout.heroBottom < 2, 'Trust strip directly follows hero');
 await page.screenshot({path:`/tmp/wnw-hero-${label}.png`});
 await page.locator('#booking-steps').scrollIntoViewIfNeeded();
 await page.screenshot({path:`/tmp/wnw-booking-${label}.png`});
}
await page.locator('#floating-dock-root button').click();
await page.locator('#floating-dock-root a[aria-label="Đặt Lịch"]:visible').click();
assert.ok(page.url().endsWith('#booking-card'));
assert.deepEqual(errors, []);
await browser.close();
console.log('PASS: rounded hero, local Vietnamese Nunito, compact hero spacing, booking order, desktop/mobile layout, navigation, no runtime errors.');

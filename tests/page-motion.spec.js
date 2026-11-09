import { test, expect } from '@playwright/test';

test('motion: hero, one-time reveals, stories and cart drawer', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'no-preference' });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('.hero-slide.is-active')).toHaveCSS('animation-name', 'none, hero-drift');
 await page.locator('[data-hero-next]').click();
 await expect(page.locator('.hero-slide.is-active')).toHaveAttribute('src','/assets/hero-2.webp');
 await expect(page.locator('.hero-slide.is-active')).toHaveCSS('animation-name','hero-arrive, hero-drift');
 await page.screenshot({path:'/tmp/wnw-page-motion-hero.png'});
 await page.locator('.motion-paws').scrollIntoViewIfNeeded();
 await expect(page.locator('.motion-paws svg')).toHaveCount(6);
 await page.locator('a[href="#story-mealtime"]').click();
 const story=page.locator('#story-mealtime');await expect(story).toHaveAttribute('open','');
 await page.waitForTimeout(350);
 await story.locator('summary').click();await expect(story).not.toHaveAttribute('open','');
 await story.locator('summary').focus();await page.keyboard.press('Enter');await expect(story).toHaveAttribute('open','');
 const add=page.locator('#flash-products .add-cart-button').first();await add.click();
 await expect(add).toHaveAttribute('data-added','true');await expect(page.locator('.cart-badge')).toHaveText('1');
 await page.screenshot({path:'/tmp/wnw-page-motion-products.png'});
 await page.getByRole('button',{name:'Giỏ hàng (1)',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.waitForTimeout(300);await page.screenshot({path:'/tmp/wnw-page-motion-drawer.png'});
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Giỏ hàng (1)',exact:true})).toBeFocused();
 expect(errors).toEqual([]);
});

test('motion: booking direction and completed step preserve form data', async ({ page }) => {
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/dat-lich/?service=grooming');
 await page.locator('#range').selectOption('under5');await page.locator('#start').fill('2027-01-10');
 await page.locator('#booking-form').getByRole('button',{name:'Tiếp tục',exact:true}).click();
 await expect(page.locator('.step-complete svg')).toHaveCount(1);
 await expect(page.locator('.booking-form')).toHaveCSS('--step-direction','1');
 await page.locator('#booking-form').getByRole('button',{name:'Quay lại',exact:true}).click();
 await expect(page.locator('.booking-form')).toHaveCSS('--step-direction','-1');
 await expect(page.locator('#range')).toHaveValue('under5');await expect(page.locator('#start')).toHaveValue('2027-01-10');
});

test('motion: mobile and reduced motion retain content and interactions', async ({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.locator('.hero-slide.is-active')).toHaveCSS('animation-name','none');
 await page.locator('[data-hero-next]').click();await expect(page.locator('.hero-slide.is-active')).toHaveCSS('animation-name','none');
 await page.locator('a[href="#story-playtime"]').click();await expect(page.locator('#story-playtime')).toHaveAttribute('open','');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await page.screenshot({path:'/tmp/wnw-page-motion-mobile.png'});
 await page.locator('[data-dock-mobile] button').click();await expect(page.locator('[data-dock-mobile] a')).toHaveCount(7);
});

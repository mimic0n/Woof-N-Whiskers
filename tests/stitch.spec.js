import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const review='.impeccable/review';
async function ready(page){
 await expect(page.locator('h1')).toHaveCount(1);
 if(await page.locator('.toast .icon-button').isVisible())await page.locator('.toast .icon-button').click();
 await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('main img')].map(async img=>{img.loading='eager';await img.decode();}));document.activeElement?.blur();window.scrollTo(0,0);await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
}
test('Stitch quick booking carries service, pet species and dates into the wizard',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Mèo',exact:true}).click();await page.locator('.quick-service-options').getByText('Lưu trú ban đêm',{exact:true}).click();await page.locator('#quick-start').fill('2027-01-10');await page.locator('#quick-end').fill('2027-01-12');await page.locator('.quick-booking').getByRole('button',{name:'Đặt lịch ngay',exact:true}).click();await expect(page.locator('#booking-species')).toHaveValue('cat');await expect(page.locator('#start')).toHaveValue('2027-01-10');await expect(page.locator('#end')).toHaveValue('2027-01-12');await expect(page.locator('.price-estimate')).toContainText('600.000');
});
test('Stitch route designs, local image assets and responsive screenshots',async({page})=>{
 test.setTimeout(120000);await mkdir(review,{recursive:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const routes=[['home','/'],['about','/gioi-thieu/'],['services','/dich-vu/'],['daycare','/dich-vu/cham-soc-ban-ngay/'],['boarding','/dich-vu/luu-tru-ban-dem/'],['grooming','/dich-vu/cham-soc-long/'],['booking','/dat-lich/?service=boarding'],['auth','/tai-khoan/'],['shop','/cua-hang/'],['shop-empty','/cua-hang/?q=zzzzzzzz'],['product','/cua-hang/san-pham/?id=royal-canin-mini'],['cart-empty','/gio-hang/'],['faq','/faq/'],['policy','/chinh-sach/huy-lich/'],['contact','/lien-he/']];
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const [name,path] of routes){await page.goto(path);await ready(page);await page.screenshot({path:`${review}/${name}-${width}.png`,fullPage:true});if(name==='home')await page.screenshot({path:`${review}/${width===1440?'desktop':'mobile'}.png`});}
 }
 expect(errors).toEqual([]);
});
test('Stitch authenticated account, pets and checkout states',async({page})=>{
 test.setTimeout(120000);await mkdir(review,{recursive:true});
 await page.goto('/tai-khoan/');await page.getByRole('tab',{name:'Đăng ký',exact:true}).click();await page.locator('#name').fill('Nguyễn An');await page.locator('#email').fill('stitch@example.com');await page.locator('#phone').fill('0935605311');await page.locator('#password').fill('demo-only-123');await page.getByRole('button',{name:'Đăng ký',exact:true}).click();await expect(page.getByRole('heading',{name:'Thông tin cá nhân',exact:true})).toBeVisible();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.goto('/tai-khoan/');await ready(page);await page.screenshot({path:`${review}/account-${width}.png`,fullPage:true});await page.goto('/tai-khoan/thu-cung/');await ready(page);if(await page.getByRole('heading',{name:'Mochi',exact:true}).count())await page.getByRole('button',{name:'Chỉnh sửa',exact:true}).first().click();else await page.getByRole('button',{name:'+ Thêm thú cưng',exact:true}).click();await page.locator('#petName').fill('Mochi');await page.locator('#breed').fill('Poodle');await page.locator('#weight').fill('4.5');await ready(page);await page.screenshot({path:`${review}/pet-form-${width}.png`,fullPage:true});await page.getByRole('button',{name:'Lưu thay đổi',exact:true}).click();await expect(page.getByRole('heading',{name:'Mochi',exact:true}).first()).toBeVisible();await ready(page);await page.screenshot({path:`${review}/pets-${width}.png`,fullPage:true});await page.getByRole('button',{name:'Xem hồ sơ',exact:true}).first().click();await ready(page);await page.screenshot({path:`${review}/pet-detail-${width}.png`,fullPage:true});}
 await page.goto('/cua-hang/san-pham/?id=royal-canin-mini');await page.getByRole('button',{name:'Thêm vào giỏ',exact:true}).first().click();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});for(const [name,path] of [['cart','/gio-hang/'],['checkout','/thanh-toan/']]){await page.goto(path);await ready(page);await page.screenshot({path:`${review}/${name}-${width}.png`,fullPage:true});}}
 await page.locator('#address').fill('49 Phạm Kiệt, Đà Nẵng');await page.locator('#agree').check();await page.getByRole('button',{name:'Đặt hàng',exact:true}).click();await expect(page.getByRole('heading',{name:'Đơn hàng demo đã ghi nhận',exact:true})).toBeVisible();for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await ready(page);await page.screenshot({path:`${review}/order-success-${width}.png`,fullPage:true});}
});

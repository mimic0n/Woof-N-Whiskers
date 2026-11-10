// Existing project images used until the owner supplies the named replacement files.
// These are illustrative assets, not verified photographs of the shop or product SKUs.
export const mediaFallbacks = {
 '/assets/real/banner-dich-vu.webp': '/assets/stitch/services-2.webp',
 '/assets/real/banner-about.webp': '/assets/stitch/about-1.webp',
 '/assets/real/banner-cham-soc-long.webp': '/assets/stitch/services-7.webp',
 '/assets/real/about-shop.webp': '/assets/stitch/about-1.webp',
 '/assets/real/we-have-1.webp': '/assets/stitch/services-2.webp',
 '/assets/real/we-have-2.webp': '/assets/stitch/boarding-3.webp',
 '/assets/real/we-have-3.webp': '/assets/stitch/boarding-4.webp',
 '/assets/real/we-have-4.webp': '/assets/stitch/services-5.webp',
 '/assets/real/space-1.webp': '/assets/stitch/about-2.webp',
 '/assets/real/space-2.webp': '/assets/stitch/services-7.webp',
 '/assets/real/space-3.webp': '/assets/stitch/about-4.webp',
 '/assets/real/space-4.webp': '/assets/stitch/services-2.webp',
 '/assets/real/service-1.webp': '/assets/stitch/services-2.webp',
 '/assets/real/service-2.webp': '/assets/stitch/about-4.webp',
 '/assets/real/service-3.webp': '/assets/stitch/boarding-4.webp',
 '/assets/real/service-4.webp': '/assets/stitch/services-5.webp',
 '/assets/real/footer-1.webp': '/assets/stitch/about-2.webp',
 '/assets/real/footer-2.webp': '/assets/stitch/services-2.webp',
 '/assets/real/footer-3.webp': '/assets/stitch/home-4.webp',
 '/assets/real/footer-4.webp': '/assets/stitch/grooming-3.webp',
 '/assets/real/footer-5.webp': '/assets/stitch/services-5.webp',
 '/assets/real/footer-6.webp': '/assets/hero-2.webp',
};
export const productImageFallback = '/assets/stitch/boarding-3.webp';
const productSlugs = ['hamster-gerbil-mix','guinea-pig-pellets','rabbit-pellet-food','salmon-skin-care-cat-food','tuna-feast-cat-food','indoor-cat-nutrition','active-dog-formula','protein-power-dog-food','chicken-delight-dog-food'];
for (const slug of productSlugs) mediaFallbacks[`/assets/products/${slug}.webp`] = productImageFallback;
export const serviceGalleries = {
 daycare: ['/assets/stitch/services-2.webp','/assets/stitch/home-4.webp','/assets/stitch/services-7.webp'],
 boarding: ['/assets/stitch/home-4.webp','/assets/stitch/boarding-3.webp','/assets/stitch/boarding-4.webp','/assets/stitch/services-5.webp'],
 grooming: ['/assets/stitch/services-4.webp','/assets/stitch/grooming-3.webp','/assets/stitch/grooming-4.webp'],
};

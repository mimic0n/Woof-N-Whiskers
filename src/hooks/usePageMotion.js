import { useEffect } from 'react';

// Observe newly rendered route content without ever hiding the default document.
export default function usePageMotion(pathname) {
 useEffect(() => {
  const root = document.getElementById('main-content');
  if (!root) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet();
  const animations = new Set();
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    if (preference.matches) continue;
    const el = entry.target;
    const siblings = [...el.parentElement.children];
    const stagger = el.matches('article') ? Math.min(siblings.indexOf(el), 3) * 70 : 0;
    const paw = el.matches('.motion-paws');
    const targets = paw ? [...el.children] : [el];
    targets.forEach((target, index) => {
     const animation = target.animate(
      paw ? [{ opacity: .04, transform: 'translateY(4px) scale(.85)' }, { opacity: .3, transform: 'none' }]
       : [{ opacity: .35, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
      { duration: paw ? 240 : 480, delay: paw ? index * 90 : stagger, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
     );
     animations.add(animation);
     animation.onfinish = () => animations.delete(animation);
    });
   }
  }, { threshold: .08 });
  const discover = () => root.querySelectorAll('h2, .product-stories-grid>article, .product-grid>article, .service-cards>article, .motion-paws').forEach(el => {
   if (seen.has(el)) return;
   seen.add(el); observer.observe(el);
  });
  const mutations = new MutationObserver(discover);
  mutations.observe(root, { childList: true, subtree: true });
  const finish = () => { if (preference.matches) animations.forEach(animation => animation.finish()); };
  preference.addEventListener('change', finish);
  discover();
  return () => { observer.disconnect(); mutations.disconnect(); preference.removeEventListener('change', finish); animations.forEach(animation => animation.cancel()); };
 }, [pathname]);
}

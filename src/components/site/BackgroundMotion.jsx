import { useEffect, useRef } from 'react';
import '../../styles/home-motion.css';

export function PawTrail() {
  return <div className="home-paw-trail" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} style={{ '--step': i }} />)}</div>;
}

export default function BackgroundMotion({ children }) {
  const root = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set();
    const seen = new WeakSet();
    const animations = new Map();
    const stop = element => {
      (animations.get(element) || []).forEach(animation => animation.cancel());
      animations.delete(element);
    };
    const sync = () => visible.forEach(element => {
      const enabled = !preference.matches && !document.hidden;
      element.classList.toggle('motion-visible', enabled);
      if (!enabled) { stop(element); return; }
      if (!element.matches('.home-paw-trail') || seen.has(element)) return;
      seen.add(element);
      animations.set(element, [...element.children].filter(paw => getComputedStyle(paw).display !== 'none').map((paw, index) => {
        if (!paw.animate) return null;
        const animation = paw.animate([
          { opacity: 0, transform: 'translateY(3px) scale(.92)' },
          { opacity: .4, transform: 'translateY(0) scale(1)', offset: .3 },
          { opacity: .22, transform: 'translateY(0) scale(1)' }
        ], { duration: 1100, delay: index * 140, easing: 'ease-out', fill: 'backwards' });
        animation.onfinish = () => animation.cancel();
        return animation;
      }).filter(Boolean));
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visible.add(target);
        else { visible.delete(target); target.classList.remove('motion-visible'); stop(target); }
      });
      sync();
    });
    root.current.querySelectorAll('.home-paw-trail, .home-landscape').forEach(element => observer.observe(element));
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      visible.forEach(element => element.classList.remove('motion-visible'));
      animations.forEach(list => list.forEach(animation => animation.cancel()));
    };
  }, []);
  return <div ref={root} className="home-motion">{children}</div>;
}

import { useEffect } from 'react';

export default function useBackgroundMotion(ref, enabled) {
 useEffect(() => {
  const scene = ref.current;
  if (!scene || !enabled) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 767px)');
  let visible = false;
  let frame = 0;
  const update = () => {
   frame = 0;
   if (!visible || document.hidden || preference.matches) return;
   const bounds = scene.getBoundingClientRect();
   const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - bounds.top - bounds.height / 2) / ((innerHeight + bounds.height) / 2)));
   scene.style.setProperty('--motif-scroll', `${(progress * (mobile.matches ? 3 : 16)).toFixed(2)}px`);
  };
  const schedule = () => { if (visible && !preference.matches && !document.hidden && !frame) frame = requestAnimationFrame(update); };
  const sync = () => {
   scene.toggleAttribute('data-background-active', visible && !document.hidden && !preference.matches);
   if (preference.matches || document.hidden || !visible) {
    cancelAnimationFrame(frame); frame = 0;
    if (preference.matches) scene.style.removeProperty('--motif-scroll');
   } else schedule();
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(scene);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', sync);
  preference.addEventListener('change', sync);
  mobile.addEventListener('change', schedule);
  return () => {
   observer.disconnect(); cancelAnimationFrame(frame);
   window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
   document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', sync); mobile.removeEventListener('change', schedule);
   scene.removeAttribute('data-background-active'); scene.style.removeProperty('--motif-scroll');
  };
 }, [ref, enabled]);
}

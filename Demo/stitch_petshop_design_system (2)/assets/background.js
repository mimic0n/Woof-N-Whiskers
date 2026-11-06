(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const active = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (preference.matches || document.hidden) return;
      entry.target.querySelectorAll('span').forEach((paw, index) => {
        if (typeof paw.animate !== 'function') return;
        const animation = paw.animate([
          { opacity: 0, translate: '-3px 2px' },
          { opacity: .27, translate: '0 0' }
        ], { duration: 360, delay: index * 65, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        active.add(animation);
        animation.onfinish = () => { active.delete(animation); animation.cancel(); };
      });
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.paw-trail').forEach(trail => observer.observe(trail));
  const stop = () => { active.forEach(animation => animation.cancel()); active.clear(); };
  preference.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); stop(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
})();

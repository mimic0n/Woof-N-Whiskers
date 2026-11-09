(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  const seen = new WeakSet();
  const visible = new Set();
  const running = new Map();
  const stop = trail => {
    (running.get(trail) || []).forEach(animation => animation.cancel());
    running.delete(trail);
  };
  const sync = () => {
    visible.forEach(element => {
      const enabled = !preference.matches && !document.hidden;
      if (element.matches('.pet-landscape')) {
        element.classList.toggle('background-in-view', enabled);
        return;
      }
      if (!enabled) { stop(element); return; }
      if (seen.has(element)) return;
      seen.add(element);
      const animations = [...element.children].filter(paw => getComputedStyle(paw).display !== 'none').map((paw, index) => {
        if (!paw.animate) return null;
        const animation = paw.animate([
          { opacity: 0, transform: 'translateY(3px) scale(.92)', offset: 0 },
          { opacity: .42, transform: 'translateY(0) scale(1)', offset: .3 },
          { opacity: .27, transform: 'translateY(0) scale(1)', offset: 1 }
        ], { duration: 1100, delay: index * 140, easing: 'ease-out', fill: 'backwards' });
        animation.onfinish = () => animation.cancel();
        return animation;
      }).filter(Boolean);
      running.set(element, animations);
    });
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visible.add(target);
      else {
        visible.delete(target);
        target.classList.remove('background-in-view');
        stop(target);
      }
    });
    sync();
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.paw-trail, .pet-landscape').forEach(element => observer.observe(element));
  preference.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
})();

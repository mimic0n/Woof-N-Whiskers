(() => {
  'use strict';
  const hero = document.getElementById('hero-slider');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const controls = hero.querySelector('.hero-controls');
  const dots = [...hero.querySelectorAll('[data-hero-index]')];
  const pause = hero.querySelector('[data-hero-pause]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, paused = motion.matches, hovered = false, focused = false, visible = true;
  controls.hidden = false;

  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovered && !focused && visible && !document.hidden) {
      timer = setTimeout(() => { show(current + 1); }, 4500);
    }
  }
  function show(index, announce = false) {
    const next = (index + slides.length) % slides.length;
    // A failed download must never replace the usable background.
    if (!slides[next].complete) {
      slides[next].loading = 'eager';
      slides[next].decode().then(() => { if (next !== current) show(next, announce); }).catch(schedule);
      return;
    }
    if (!slides[next].naturalWidth) { schedule(); return; }
    if (next === current) { schedule(); return; }
    const outgoing = slides[current];
    const incoming = slides[next];
    const direction = index < current ? -1 : 1;
    slides.forEach(slide => {
      slide.getAnimations().forEach(animation => animation.cancel());
      slide.style.zIndex = '0';
    });
    outgoing.classList.remove('is-active');
    current = next;
    incoming.classList.add('is-active');
    incoming.style.zIndex = '1';
    if (typeof incoming.animate === 'function') {
      const options = { duration: motion.matches ? 120 : 900, easing: 'cubic-bezier(.22,1,.36,1)' };
      outgoing.animate(motion.matches
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${-direction * 100}%)`, opacity: 1 }], options);
      incoming.animate(motion.matches
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [{ transform: `translateX(${direction * 100}%)`, opacity: 1 }, { transform: 'translateX(0)', opacity: 1 }], options);
    }
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (announce) hero.querySelector('.hero-status').textContent = `Ảnh nền ${current + 1} trên ${slides.length}`;
    schedule();
  }
  function updatePause() {
    pause.setAttribute('aria-label', paused ? 'Bật tự chuyển ảnh' : 'Tạm dừng tự chuyển ảnh');
    pause.firstElementChild.textContent = paused ? 'play_arrow' : 'pause';
    schedule();
  }
  hero.querySelector('[data-hero-prev]').addEventListener('click', () => show(current - 1, true));
  hero.querySelector('[data-hero-next]').addEventListener('click', () => show(current + 1, true));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i, true)));
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  controls.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  controls.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  hero.addEventListener('focusin', () => { focused = true; schedule(); });
  hero.addEventListener('focusout', event => { focused = hero.contains(event.relatedTarget); schedule(); });
  controls.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePause(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(hero);
  }
  // Warm the local slide cache without waiting for third-party page assets.
  slides.slice(1).forEach(img => { img.loading = 'eager'; });
  updatePause();
})();

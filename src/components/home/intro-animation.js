export const SCENES = [1900, 1900, 1900, 1700];
const HOLD = 1000;
const FINALE = 1500;
const EXIT = 800;
const clamp = value => Math.max(0, Math.min(1, value));
const ease = t => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

export function startIntro(root, onComplete) {
 const html = document.documentElement;
 const page = document.getElementById('root');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const narrow = matchMedia('(max-width: 767px)').matches;
 const pointer = matchMedia('(hover: hover) and (pointer: fine)');
 const skip = root.querySelector('[data-intro-skip]');
 const enter = root.querySelector('[data-intro-enter]');
 const finale = root.querySelector('.wnw-intro__finale');
 const stage = root.querySelector('.wnw-intro__stage');
 const world = root.querySelector('.wnw-intro__world');
 const steps = [...root.querySelectorAll('.wnw-intro__steps span')];
 const scenes = [...root.querySelectorAll('[data-intro-scene]')].map(el => ({
  el, image: el.querySelector('img'),
  paths: [...el.querySelectorAll('path')],
  text: [...el.querySelectorAll('[data-intro-type]')].map(node => ({ node, chars: Array.from(node.textContent) })),
 }));
 const tagline = finale.querySelector('[data-intro-type]');
 const taglineChars = Array.from(tagline.textContent);
 const previousInert = page.inert;
 let disposed = false, closing = false, frame = 0, exitTimer, focusTimer, loadTimer, started;
 let finishTransition;

 function release() {
  cancelAnimationFrame(frame);
  clearTimeout(exitTimer); clearTimeout(focusTimer); clearTimeout(loadTimer);
  root.removeEventListener('transitionend', finishTransition);
  page.inert = previousInert;
  html.classList.remove('intro-on', 'intro-ready');
  root.hidden = true;
 }
 function finish(animate = true) {
  if (disposed || closing) return;
  closing = true;
  cancelAnimationFrame(frame);
  clearTimeout(focusTimer);
  // A decode failure must not count as having watched the introduction.
  if (started !== undefined || animate) {
   try { sessionStorage.setItem('wnw_intro_seen', '1'); } catch { /* This visit can continue without storage. */ }
  }
  const done = () => {
   release();
   const heading = page.querySelector('.hero-copy h1');
   if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
    heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
   }
   onComplete();
  };
  if (!animate || reduced.matches) { done(); return; }
  page.querySelector('.hero-slider')?.classList.add('intro-hero-arrive');
  root.classList.add('is-leaving');
  root.classList.remove('is-running');
  finishTransition = event => { if (event.target === root && event.propertyName === 'transform') done(); };
  root.addEventListener('transitionend', finishTransition);
  exitTimer = setTimeout(done, EXIT + 80);
 }
 function keydown(event) {
  if (event.key === 'Escape' || event.key === 'Enter') { event.preventDefault(); finish(); }
  if (event.key === 'Tab') {
   const controls = [skip, ...(!finale.hidden ? [enter] : [])];
   const index = controls.indexOf(document.activeElement);
   event.preventDefault();
   controls[(index + (event.shiftKey ? controls.length - 1 : 1)) % controls.length].focus();
  }
 }
 function move(event) {
  if (narrow || !pointer.matches || closing) return;
  world.style.transform = `rotateY(${(event.clientX / innerWidth - .5) * 3}deg) rotateX(${(.5 - event.clientY / innerHeight) * 2}deg)`;
 }
 const resetPointer = () => { world.style.transform = ''; };
 const preferencesChanged = () => { if (reduced.matches) finish(false); };
 const networkChanged = () => {
  const connection = navigator.connection;
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '')) finish(false);
 };
 function type({ node, chars }, elapsed) {
  const count = Math.max(0, Math.floor(elapsed / 32));
  const text = chars.slice(0, count).join('');
  if (node.textContent !== text) node.textContent = text;
  node.classList.toggle('is-done', count >= chars.length);
 }
 function tick(now) {
  if (disposed || closing) return;
  const elapsed = now - started;
  const total = SCENES.reduce((a, b) => a + b, 0);
  let offset = 0, f = SCENES.length;
  for (let i = 0; i < SCENES.length; i++) {
   if (elapsed < offset + SCENES[i]) { f = i + ease(clamp((elapsed - offset - HOLD) / (SCENES[i] - HOLD))); break; }
   offset += SCENES[i];
  }
  let sceneStart = 0;
  scenes.forEach(({ el, paths, text }, i) => {
   const delta = f - i;
   const active = delta >= -.5 && delta <= 1 && elapsed < total;
   const depth = ease(clamp((delta - .15) / .85));
   el.style.visibility = active ? 'visible' : 'hidden';
   el.style.opacity = active ? (delta < 0 ? 1 + delta * 2 : 1 - depth * .65) : 0;
   el.style.transform = `translateZ(${-delta * 420}px)`;
   el.style.filter = active ? `blur(${depth * (narrow ? 5 : 8)}px) grayscale(${depth}) brightness(${1 - depth * .55})` : 'none';
   paths.forEach(path => { path.style.strokeDashoffset = 1 - clamp((delta + .3) / .5); });
   text.forEach((item, n) => type(item, elapsed - sceneStart - n * 160));
   steps[i].classList.toggle('is-current', Math.floor(f) === i);
   sceneStart += SCENES[i];
  });
  if (elapsed >= total) {
   if (finale.hidden) { finale.hidden = false; root.classList.add('is-finale'); }
   type({ node: tagline, chars: taglineChars }, (elapsed - total) * 2);
  }
  if (elapsed >= total + FINALE) finish();
  else frame = requestAnimationFrame(tick);
 }

 // The portal is a sibling of #root so inert also covers header, dock and footer.
 page.inert = true;
 root.hidden = false;
 html.classList.add('intro-on', 'intro-ready');
 clearTimeout(window.wnwIntroWatchdog);
 skip.addEventListener('click', finishClick);
 enter.addEventListener('click', finishClick);
 root.addEventListener('keydown', keydown);
 stage.addEventListener('pointermove', move);
 stage.addEventListener('pointerleave', resetPointer);
 reduced.addEventListener('change', preferencesChanged);
 navigator.connection?.addEventListener('change', networkChanged);
 focusTimer = setTimeout(() => { if (!disposed && !closing) { root.classList.add('skip-ready'); skip.focus(); } }, 300);
 function finishClick() { finish(); }
 scenes.forEach(({ paths }) => paths.forEach(path => { path.setAttribute('pathLength', '1'); path.style.strokeDasharray = 1; path.style.strokeDashoffset = 1; }));
 const ready = Promise.all(scenes.slice(0, 2).map(({ image }) => image.decode()));
 loadTimer = setTimeout(() => finish(false), 1500);
 ready.then(() => {
  if (disposed || closing) return;
  clearTimeout(loadTimer);
  started = performance.now();
  root.classList.add('is-running');
  frame = requestAnimationFrame(tick);
 }, () => finish(false));
 scenes.slice(2).forEach(({ image }) => image.decode().catch(() => finish(false)));
 return () => {
  disposed = true;
  release();
  skip.removeEventListener('click', finishClick); enter.removeEventListener('click', finishClick);
  root.removeEventListener('keydown', keydown);
  stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', resetPointer);
  reduced.removeEventListener('change', preferencesChanged);
  navigator.connection?.removeEventListener('change', networkChanged);
  // StrictMode immediately mounts again; keep eligibility through that cleanup.
  if (!closing) { root.hidden = false; html.classList.add('intro-on'); }
  queueMicrotask(() => {
   if (!root.isConnected) html.classList.remove('intro-on', 'intro-ready');
  });
 };
}

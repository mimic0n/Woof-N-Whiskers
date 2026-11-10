import { useEffect, useRef } from 'react';
import './cool-mode.css';

// Local implementation of the particle interaction documented by Magic UI:
// https://magicui.design/docs/components/cool-mode
// Runs only on activation (mouse click, touch tap or keyboard press).
const DEFAULT_OPTIONS = {};
const SELECTOR = 'button, .button, .add-cart-button, .hero-actions a, .demo-final-cta a, [role="button"], input[type="submit"]';
const COLORS = ['#326DCA', '#F8D38C', '#835D42'];
const MAX_PARTICLES = 40;

export function CoolMode({ children, options = DEFAULT_OPTIONS }) {
 const scope = useRef(null);
 useEffect(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const particles = new Map();
  let layer;

  function clear() {
   for (const [node, animation] of particles) { animation.cancel(); node.remove(); }
   particles.clear();
   layer?.remove(); layer = undefined;
  }
  function control(event) {
   if (reduced.matches || document.hidden || !(event.target instanceof Element)) return null;
   const button = event.target.closest(options.selector || SELECTOR);
   if (!button || (scope.current && !scope.current.contains(button))) return null;
   if (button.matches(':disabled, [aria-disabled="true"], [data-cool-mode="off"]') || button.closest('[inert], [data-cool-mode="off"]')) return null;
   return button;
  }
  function burst(button, x, y, amount) {
   if (!Element.prototype.animate) return;
   if (!layer) {
    layer = document.createElement('div');
    layer.className = 'cool-mode-particles';
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    document.body.append(layer);
   }
   const rect = button.getBoundingClientRect();
   const originX = Number.isFinite(x) ? x : rect.left + rect.width / 2;
   const originY = Number.isFinite(y) ? y : rect.top + rect.height / 2;
   const count = Math.min(MAX_PARTICLES - particles.size, Math.max(0, Math.round(options.particleCount ?? amount)));
   for (let i = 0; i < count; i++) {
    const node = document.createElement('span');
    node.className = 'cool-mode-particle';
    const size = Math.max(3, Math.min(36, options.size ?? (5 + Math.random() * 6)));
    node.style.width = `${size}px`;
    node.style.height = `${size}px`;
    node.style.left = `${originX}px`;
    node.style.top = `${originY}px`;
    node.style.backgroundColor = COLORS[i % COLORS.length];
    if (options.particle && options.particle !== 'circle') {
     node.style.backgroundImage = `url(${JSON.stringify(options.particle)})`;
     node.style.backgroundColor = 'transparent';
    }
    layer.append(node);
    const dx = (Math.random() - .5) * (options.speedHorz ?? 2) * 60;
    const dy = -(options.speedUp ?? 4) * (12 + Math.random() * 8);
    const animation = node.animate([
     { transform: 'translate(-50%, -50%) scale(.4)', opacity: 0 },
     { transform: `translate(calc(-50% + ${dx * .4}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 1, offset: .4 },
     { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${24 + Math.random() * 48}px)) scale(.1)`, opacity: 0 },
    ], { duration: 1100 + Math.random() * 400, easing: 'ease-out' });
    particles.set(node, animation);
    animation.onfinish = () => {
     node.remove(); particles.delete(node);
     if (!particles.size) { layer?.remove(); layer = undefined; }
    };
   }
  }
  function click(event) {
   const button = control(event);
   if (button) burst(button, event.detail === 0 ? undefined : event.clientX, event.detail === 0 ? undefined : event.clientY, 10);
  }
  const preferenceChanged = () => { if (reduced.matches) clear(); };
  const visibilityChanged = () => { if (document.hidden) clear(); };
  document.addEventListener('click', click, { passive: true });
  reduced.addEventListener('change', preferenceChanged);
  document.addEventListener('visibilitychange', visibilityChanged);
  return () => {
   document.removeEventListener('click', click);
   reduced.removeEventListener('change', preferenceChanged);
   document.removeEventListener('visibilitychange', visibilityChanged);
   clear();
  };
 }, [options]);
 return children ? <div ref={scope} style={{ display: 'contents' }}>{children}</div> : null;
}

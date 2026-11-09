import { useRef } from 'react';
import useBackgroundMotion from '../../hooks/useBackgroundMotion';
import { Icon } from '../site/UI';

export default function BackgroundScene({ tone, decoration, transition = false, children }) {
 const ref = useRef(null);
 useBackgroundMotion(ref, Boolean(decoration));
 return <div ref={ref} className={`home-scene home-scene-${tone}`}>
  {transition && <svg className="home-scene-transition" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V18C1120 72 810 4 520 28S140 68 0 36Z"/></svg>}
  {decoration && <div className="home-background-art" aria-hidden="true">
   <span className="home-background-curve curve-large"/>
   <span className="home-background-curve curve-small"/>
   {decoration === 'collar' ? <svg className="background-motif motif-collar" viewBox="0 0 240 80" fill="none" stroke="currentColor" strokeWidth="2"><path d="M-10 58C40 2 74 2 122 40S204 82 250 20"/><rect x="105" y="24" width="30" height="24" rx="5" transform="rotate(32 120 36)"/><path d="m117 34 10 6"/></svg> : decoration === 'ball' ? <svg className="background-motif motif-first" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="32" cy="32" r="25"/><path d="M12 17c20 0 35 15 35 35M47 12c0 20-15 35-35 35"/></svg> : <Icon className="background-motif motif-first" name="paw"/>}
   <Icon className="background-motif motif-second" name="paw"/>
  </div>}
  {children}
 </div>;
}

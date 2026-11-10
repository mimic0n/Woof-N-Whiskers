import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../../i18n';
import { services } from '../../data/data';
import { startIntro } from './intro-animation';
import { getIntroEligibility } from './intro-eligibility';
import '../../styles/intro.css';

// Swap these URLs for transparent shop-owned WebP cutouts when available.
const ART = ['dog', 'cat', 'grooming', 'shop'];
export default function Intro() {
 const root = useRef(null);
 const replayButton = useRef(null);
 const manualReplay = useRef(false);
 const { t, l, money } = useI18n();
 const [eligibility, setEligibility] = useState(getIntroEligibility);
 const [enabled, setEnabled] = useState(eligibility.allowed);
 const [replayRequested, setReplayRequested] = useState(false);
 useEffect(() => {
  if (!enabled && manualReplay.current) {
   replayButton.current?.focus({ preventScroll: true });
   manualReplay.current = false;
  }
  if (!root.current) return;
  return startIntro(root.current, () => setEnabled(false));
 }, [enabled]);
 if (!enabled) {
  const replay = new URLSearchParams(location.search).get('intro') === '1';
  return <>
   {eligibility.reason && replay && <p className="intro-playback-note" role="status">{t(eligibility.reason)}</p>}
   <button ref={replayButton} type="button" className="intro-replay-float" onClick={() => {
    setReplayRequested(true);
    const next = getIntroEligibility({ replay: true });
    setEligibility(next);
    if (next.allowed) { manualReplay.current = true; setEnabled(true); }
   }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="m10 9 5 3-5 3Z" fill="currentColor"/></svg>
    {t('introReplay')}
   </button>
   {eligibility.reason && replayRequested && !replay && <p className="intro-replay-notice" role="status">{t(eligibility.reason)}</p>}
  </>;
 }
 return createPortal(<div ref={root} className="wnw-intro" role="dialog" aria-modal="true" aria-label={t('introLabel')}>
  <button className="wnw-intro__skip" type="button" data-intro-skip>{t('introSkip')} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M7 6h11v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  <div className="wnw-intro__stage">
   <div className="wnw-intro__world" aria-hidden="true">
    {ART.map((art, i) => <section className="intro-scene" data-intro-scene key={art} style={{ '--scene-color': ['#F8D38C', '#835D42', '#326DCA', '#F8D38C'][i] }}>
     <svg className="intro-scene__lines" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><path d="M-120 610C160 60 400 760 720 420S1090 90 1320 240"/><path d="M-100 660C190 120 440 810 760 470S1130 150 1340 300"/></svg>
     <img className="intro-scene__cutout" src={`/assets/intro/${art}.svg`} alt="" width="700" height="700" decoding="async" fetchPriority="low"/>
     <div className="intro-scene__copy"><p className="intro-scene__title">{i < 3 && <span className="intro-scene__number">0{i + 1}</span>}<span data-intro-type>{i < 3 ? l(services[i].name) : t('introShop')}</span></p><p className="intro-scene__price"><span data-intro-type>{i < 3 ? t('introPrice', { price: money(services[i].price), unit: t(`introUnit${i}`) }) : t('introShopLine')}</span></p></div>
    </section>)}
   </div>
   <div className="wnw-intro__finale" hidden>
    <img src="/assets/paw-mark.svg" width="100" height="100" alt=""/>
    <p className="wnw-intro__wordmark">Woof N’<br/><span>Whiskers</span><span className="sr-only">.</span></p>
    <p className="wnw-intro__tagline" data-intro-type>A little more love for every little paw.</p>
    <button type="button" className="wnw-intro__enter" data-intro-enter>{t('introEnter')} <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
   </div>
  </div>
  <p className="wnw-intro__caption">{t('introCaption')}</p>
  <div className="wnw-intro__steps" aria-hidden="true">{ART.map(art => <span key={art}/>)}</div>
 </div>, document.body);
}

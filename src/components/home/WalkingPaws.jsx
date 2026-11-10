import { useRef } from 'react';
import { Icon } from '../site/UI';
import useBackgroundMotion from '../../hooks/useBackgroundMotion';

function PawTrail({ index }) {
 const ref = useRef(null);
 useBackgroundMotion(ref, true);
 return <div ref={ref} className={`walking-paw-trail trail-${index}`}>
  {Array.from({ length: 6 }, (_, step) => <span key={step} className="walking-paw" style={{ '--paw-step': step }}><Icon name="paw"/></span>)}
 </div>;
}
export default function WalkingPaws({ extended = false }) {
 return <div className={`walking-paws ${extended ? 'walking-paws-extended' : ''}`} aria-hidden="true">
  {Array.from({ length: extended ? 5 : 2 }, (_, index) => <PawTrail key={index} index={index}/>)}
 </div>;
}

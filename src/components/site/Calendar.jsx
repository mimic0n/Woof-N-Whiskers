import { useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { today } from '../../utils/store';
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export default function Calendar({value,onChange,min=today(),id,label,error}) {
 const {lang,l}=useI18n(); const [view,setView]=useState(()=>new Date(`${value||min}T12:00:00`));const [focus,setFocus]=useState(value||min);const ref=useRef(null);
 const start=new Date(view.getFullYear(),view.getMonth(),1);const offset=(start.getDay()+6)%7;const length=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
 const move=delta=>{const next=new Date(view.getFullYear(),view.getMonth()+delta,1);setView(next);setFocus(iso(new Date(next.getFullYear(),next.getMonth(),1)));};
 function key(event,day) {
  const deltas={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7,Home:-((day.getDay()+6)%7),End:6-((day.getDay()+6)%7)};
  if(event.key==='Escape'){document.getElementById(id)?.focus();return;}
  if(event.key==='PageUp'||event.key==='PageDown'){event.preventDefault();day.setMonth(day.getMonth()+(event.key==='PageUp'?-1:1));}
  else if(Object.hasOwn(deltas,event.key)){event.preventDefault();day.setDate(day.getDate()+deltas[event.key]);}else return;
  const next=iso(day)<min?new Date(`${min}T12:00:00`):day;setView(next);setFocus(iso(next));const target=ref.current?.querySelector(`[data-date="${iso(next)}"]`);if(target)target.focus();else requestAnimationFrame(()=>ref.current?.querySelector(`[data-date="${iso(next)}"]`)?.focus());
 }
 return <div className="calendar-field"><label htmlFor={id}>{label} *</label><input id={id} type="date" min={min} value={value} aria-invalid={!!error} aria-describedby={error?`${id}-error`:undefined} onChange={e=>{onChange(e.target.value);if(e.target.value){setView(new Date(`${e.target.value}T12:00:00`));setFocus(e.target.value);}}}/><div ref={ref} className="calendar" role="group" aria-label={label}><div className="calendar-header"><button type="button" aria-label={l('Tháng trước','Previous month')} onClick={()=>move(-1)}>‹</button><strong aria-live="polite">{new Intl.DateTimeFormat(lang==='vi'?'vi-VN':'en-GB',{month:'long',year:'numeric'}).format(view)}</strong><button type="button" aria-label={l('Tháng sau','Next month')} onClick={()=>move(1)}>›</button></div><div className="calendar-grid">{l(['T2','T3','T4','T5','T6','T7','CN'].join('|'),['Mo','Tu','We','Th','Fr','Sa','Su'].join('|')).split('|').map(d=><span className="weekday" key={d}>{d}</span>)}{Array.from({length:offset},(_,i)=><span key={`blank${i}`}/>)}{Array.from({length},(_,i)=>{const d=new Date(view.getFullYear(),view.getMonth(),i+1);const date=iso(d);return <button type="button" key={date} data-date={date} disabled={date<min} tabIndex={focus===date?0:-1} aria-label={new Intl.DateTimeFormat(lang==='vi'?'vi-VN':'en-GB',{dateStyle:'full'}).format(d)} aria-pressed={value===date} aria-current={date===today()?'date':undefined} onFocus={()=>setFocus(date)} onKeyDown={e=>key(e,d)} onClick={()=>onChange(date)}>{i+1}</button>;})}</div></div>{error&&<p className="field-error" id={`${id}-error`}>{error}</p>}</div>;
}

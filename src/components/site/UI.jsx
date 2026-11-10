import { mediaFallbacks } from '../../data/media';
import { motion as Motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, useId } from 'react';
import { demoLabel } from '../../data/config';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
export function Icon({name='paw',...props}) {
 const paths={paw:<><ellipse cx="8" cy="7" rx="2" ry="3"/><ellipse cx="16" cy="7" rx="2" ry="3"/><ellipse cx="3.5" cy="12" rx="1.8" ry="2.5"/><ellipse cx="20.5" cy="12" rx="1.8" ry="2.5"/><path d="M7 16c2-5 8-5 10 0 3 7-3 4-5 4s-8 3-5-4Z"/></>,cart:<><path d="M3 3h2l3 12h11l2-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,search:<><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,menu:<path d="M3 6h18M3 12h18M3 18h18"/>,close:<path d="m6 6 12 12M18 6 6 18"/>,user:<><circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,check:<path d="m5 12 4 4L20 5"/>,arrow:<path d="M4 12h16m-6-6 6 6-6 6"/>,calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18M7 15h3m4 0h3"/></>,heart:<path d="M12 21S1 14 3 7c2-5 7-4 9 0 2-4 7-5 9 0 2 7-9 14-9 14Z"/>,info:<><circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6v1"/></>};
 return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]||paths.paw}</svg>;
}
export function Button({children,to,secondary=false,className='',...props}) {const cls=`button ${secondary?'secondary':''} ${className}`;return to?<Link className={cls} to={to} {...props}>{children}</Link>:<button type="button" className={cls} {...props}>{children}</button>;}
export function Field({id,label,error,children,hint,...props}) {
 const {t}=useI18n(); const described=[error?`${id}-error`:null,hint?`${id}-hint`:null].filter(Boolean).join(' ')||undefined;
 return <div className="field"><label htmlFor={id}>{label}{props.required?' *':''}</label>{children || <input id={id} aria-invalid={!!error} aria-describedby={described} {...props}/>}{hint&&<small id={`${id}-hint`}>{hint}</small>}{error&&<span className="field-error" id={`${id}-error`}>{t(error)}</span>}</div>;
}
export function ErrorSummary({errors}) {const {l,t}=useI18n();const visible=Object.entries(errors).filter(([,v])=>v);return visible.length>0?<div className="alert danger" role="alert"><strong>{l('Vui lòng kiểm tra các thông tin sau:','Please check the following:')}</strong><ul>{visible.map(([key,value])=><li key={key}>{['form','stock'].includes(key)?t(value):<a href={`#${key}`}>{t(value)}</a>}</li>)}</ul></div>:null;}
export function Empty({title,children,to='/cua-hang/',action}) {const {t}=useI18n();return <div className="empty"><Icon name="paw" width="48" height="48"/><h2>{title||t('empty')}</h2><p>{children}</p>{to&&<Button to={to}>{action||t('shop')}</Button>}</div>;}
const localImages = import.meta.glob('/public/assets/**/*.{webp,svg,avif,png,jpg,jpeg}');
export function resolveImage(src) {
 if (!src || !src.startsWith('/assets/')) return src;
 if (localImages['/public'+src]) return src;
 return mediaFallbacks[src] || (localImages['/public'+src.replace(/\.webp$/,'.svg')] ? src.replace(/\.webp$/,'.svg') : '/assets/hero-1.webp');
}
export function ImageLabel({src,alt='',className=''}) {
 const {t}=useI18n();const resolved=resolveImage(src);
 return <figure className={`image-label ${className}`}><img src={resolved} onError={e=>{if(e.currentTarget.dataset.fallback)return;e.currentTarget.dataset.fallback='true';e.currentTarget.src='/assets/hero-1.webp';}} alt={alt} loading="lazy" decoding="async"/>{demoLabel(<figcaption>{t('illustration')}</figcaption>)}</figure>;
}
export function Modal({title,onClose,children,side=false}) {
 const {t}=useI18n(); const ref=useRef(null);const titleId=useId();const reduced=useReducedMotion();
 useEffect(()=>{
  const previous=document.activeElement; const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const panel=ref.current;panel.querySelector('button,input,select,a[href]')?.focus();
  const key=event=>{
   if(event.key==='Escape'){event.preventDefault();onClose();}
   if(event.key==='Tab'){
    const els=[...panel.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex="0"]')].filter(el=>el.getClientRects().length);
    const first=els[0],last=els.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
   }
  };
  panel.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=overflow;panel.removeEventListener('keydown',key);previous?.focus();};
 },[onClose]);
 return <Motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}} className={`modal-overlay ${side?'side':''} ${side==='left'?'left':''}`} onClick={event=>{if(event.target===event.currentTarget)onClose();}}><Motion.section initial={{x:reduced||!side?0:side==='left'?-40:40}} animate={{x:0}} exit={{x:reduced||!side?0:side==='left'?-40:40}} transition={{duration:reduced?0:.24,ease:[.16,1,.3,1]}} ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} className="modal-panel"><div className="modal-top"><h2 id={titleId}>{title}</h2><button className="icon-button" onClick={onClose} aria-label={t('close')}><Icon name="close"/></button></div>{children}</Motion.section></Motion.div>;
}
export function Accordion({items}) {
 const {l}=useI18n();const [open,setOpen]=useState(null);const id=useId();
 return <div className="accordion">{items.map((item,i)=><section key={i}><h3><button type="button" id={`${id}-q-${i}`} aria-expanded={open===i} aria-controls={`${id}-a-${i}`} onClick={()=>setOpen(open===i?null:i)}>{l(item.q)}<span aria-hidden="true">{open===i?'−':'+'}</span></button></h3><div id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} hidden={open!==i}><p>{l(item.a)}</p></div></section>)}</div>;
}
export function NumberInput({value,onChange,max=99,label}) {const {t}=useI18n();return <div className="quantity"><button type="button" aria-label={`${t('remove')} ${label||t('quantity')}`} disabled={value<=1} onClick={()=>onChange(value-1)}>−</button><input aria-label={label||t('quantity')} type="number" min="1" max={max} value={value} onChange={e=>onChange(Math.max(1,Math.min(max,Number(e.target.value)||1)))}/><button type="button" aria-label={`+ ${label||t('quantity')}`} disabled={value>=max} onClick={()=>onChange(value+1)}>+</button></div>;}

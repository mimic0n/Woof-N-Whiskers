import { useEffect, useId, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { products, services } from '../../data/data';
import { normalize } from '../../utils/store';
import { useI18n } from '../../i18n';
import { Icon } from './UI';
export default function SearchBox({initial=''}) {
 const {t,l}=useI18n();const navigate=useNavigate();const [q,setQ]=useState(initial),[term,setTerm]=useState(initial),[open,setOpen]=useState(false),[active,setActive]=useState(-1);const id=useId();
 useEffect(()=>{const timer=setTimeout(()=>setTerm(q),250);return()=>clearTimeout(timer);},[q]);
 const results=term.trim()?[...products.map(p=>({id:p.id,name:l(p.name),url:`/cua-hang/san-pham/?id=${p.id}`})),...services.map(s=>({id:s.id,name:l(s.name),url:`/dich-vu/${s.slug}/`}))].filter(p=>normalize(p.name).includes(normalize(term))).slice(0,5):[];
 function submit(e){e.preventDefault();setOpen(false);navigate(active>=0&&results[active]?results[active].url:`/tim-kiem/?q=${encodeURIComponent(q)}`);}
 return <form className="site-search" role="search" onSubmit={submit} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false);}}><label className="sr-only" htmlFor={id}>{t('search')}</label><input id={id} value={q} placeholder={l('Tìm sản phẩm, dịch vụ…','Search products, services…')} onChange={e=>{setQ(e.target.value);setActive(-1);setOpen(true);}} onFocus={()=>setOpen(true)} role="combobox" aria-autocomplete="list" aria-controls={`${id}-results`} aria-expanded={open&&results.length>0} aria-activedescendant={open&&active>=0?`${id}-${active}`:undefined} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);setActive(-1);}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setOpen(true);setActive(v=>results.length?(v+(e.key==='ArrowDown'?1:results.length-1)+results.length)%results.length:-1);}}}/><button aria-label={t('search')}><Icon name="search"/></button><ul id={`${id}-results`} role="listbox" hidden={!open||!results.length}>{results.map((r,i)=><li key={r.id} id={`${id}-${i}`} role="option" aria-selected={active===i}><Link to={r.url} onClick={()=>{setOpen(false);setQ('');}}>{r.name}</Link></li>)}</ul></form>;
}

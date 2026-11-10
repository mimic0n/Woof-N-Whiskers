import { useEffect } from 'react';
import { useI18n } from '../i18n';
export default function useDirty(dirty) {
 const {lang}=useI18n();
 useEffect(()=>{
  if(!dirty)return;
  const listener=event=>{event.preventDefault();event.returnValue='';};
  const navigate=event=>{
   const link=event.target.closest?.('a[href]');if(!link||link.target==='_blank'||event.ctrlKey||event.metaKey)return;
   const url=new URL(link.href,window.location.href);
   if(url.origin!==window.location.origin||(url.pathname===window.location.pathname&&url.search===window.location.search))return;
   if(!window.confirm(lang==='vi'?'Bạn có thay đổi chưa hoàn tất. Rời khỏi trang này?':'You have unfinished changes. Leave this page?')){event.preventDefault();event.stopPropagation();}
  };
  window.addEventListener('beforeunload',listener);document.addEventListener('click',navigate,true);
  return ()=>{window.removeEventListener('beforeunload',listener);document.removeEventListener('click',navigate,true);};
 },[dirty,lang]);
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { business } from '../../data/data';
export default function Meta({title,description,businessSchema=false,product}) {
 const {lang,l}=useI18n();const location=useLocation();const name=l(title);const desc=description?l(description):`${name} — ${business.name}. ${l('Thông tin, dịch vụ và mua sắm thú cưng tại Đà Nẵng.','Pet care information, services and shopping in Da Nang.')}`;
 useEffect(()=>{
  document.title=`${name} | ${business.name}`;
  const meta=(selector,attrs)=>{let node=document.head.querySelector(selector);if(!node){node=document.createElement('meta');document.head.appendChild(node);}Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,v));};
  meta('meta[name="description"]',{name:'description',content:desc});meta('meta[property="og:title"]',{property:'og:title',content:document.title});meta('meta[property="og:description"]',{property:'og:description',content:desc});meta('meta[property="og:type"]',{property:'og:type',content:product?'product':'website'});meta('meta[property="og:image"]',{property:'og:image',content:new URL(product?.image||'/assets/hero-1.webp',locationOrigin()).href});
  let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=locationOrigin()+location.pathname+(product?`?id=${product.id}`:'');
  meta('meta[property="og:url"]',{property:'og:url',content:canonical.href});
  const schema=businessSchema?{'@context':'https://schema.org','@type':'LocalBusiness',name:business.name,address:{'@type':'PostalAddress',streetAddress:'49 Phạm Kiệt, Khuê Mỹ, Ngũ Hành Sơn',addressLocality:'Đà Nẵng',addressCountry:'VN'},telephone:business.phone,email:business.email,openingHours:'Mo-Su 08:00-20:00',description:l('Giờ demo, cần cập nhật','Demo hours, to be updated')}:product?{'@context':'https://schema.org','@type':'Product',name:l(product.name),image:new URL(product.image,locationOrigin()).href,description:l(product.description),sku:product.id,offers:{'@type':'Offer',price:product.price,priceCurrency:'VND',availability:`https://schema.org/${product.stock?'InStock':'OutOfStock'}`}}:null;
  const node=document.createElement('script');node.type='application/ld+json';if(schema){node.textContent=JSON.stringify(schema);document.head.appendChild(node);}
  return()=>node.remove();
 },[name,desc,lang,location.pathname,product,businessSchema,l]);
 return null;
}
function locationOrigin(){return window.location.origin;}

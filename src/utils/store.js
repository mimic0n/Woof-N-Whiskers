const KEY = 'wnw_state_v1';
const blank = { users:[], session:null, pets:[], bookings:[], orders:[], cart:[], callbacks:[] };
export function readState() {
 try {
  const value = JSON.parse(localStorage.getItem(KEY));
  if (!value || typeof value !== 'object') return { ...blank };
  return Object.fromEntries(Object.entries(blank).map(([key, fallback]) => [key, key === 'session' ? (typeof value[key] === 'string' ? value[key] : null) : (Array.isArray(value[key]) ? value[key] : fallback)]));
 } catch { return { ...blank }; }
}
export function writeState(value) { localStorage.setItem(KEY, JSON.stringify(value)); }
export function readDraft(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
export function writeDraft(key, value) { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(value)); }
export function uid() { return crypto.randomUUID(); }
export function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function code(prefix='WNW') { return `${prefix}-${today().slice(2).replaceAll('-','')}-${crypto.randomUUID().slice(0,4).toUpperCase()}`; }
export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim();
export const nights = (start,end) => Math.round((Date.parse(end)-Date.parse(start))/86400000);
export async function hashPassword(password, salt) {
 const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + password));
 return [...new Uint8Array(buffer)].map(v => v.toString(16).padStart(2,'0')).join('');
}
export async function photoData(file) {
 if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('imageType');
 if (file.size > 3*1024*1024) throw new Error('imageSize');
 const source = await new Promise((resolve,reject) => { const r = new FileReader(); r.onload=()=>resolve(r.result); r.onerror=()=>reject(new Error('imageRead')); r.readAsDataURL(file); });
 const image = new Image(); image.src = source; await image.decode();
 const ratio = Math.min(1,600/Math.max(image.width,image.height));
 const canvas = document.createElement('canvas'); canvas.width=Math.round(image.width*ratio); canvas.height=Math.round(image.height*ratio);
 canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height); return canvas.toDataURL('image/jpeg',.8);
}

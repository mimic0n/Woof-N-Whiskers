import { createContext, useContext, useState, useEffect } from 'react';
import vi from './vi';
import en from './en';
const Context = createContext(null);
export function I18nProvider({ children }) {
 const [lang, update] = useState(() => { try { return localStorage.getItem('wnw_lang') === 'en' ? 'en' : 'vi'; } catch { return 'vi'; } });
 useEffect(() => { document.documentElement.lang = lang; }, [lang]);
 const setLang = value => { update(value); try { localStorage.setItem('wnw_lang', value); } catch { /* Language selection still works for this visit. */ } };
 const t = (key, vars = {}) => Object.entries(vars).reduce((s,[k,v]) => s.replaceAll(`{${k}}`, v), (lang === 'vi' ? vi : en)[key] || key);
 const l = (a,b) => Array.isArray(a) ? a[lang === 'vi' ? 0 : 1] : (lang === 'vi' ? a : b || a);
 const money = amount => new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-GB', { style:'currency', currency:'VND', maximumFractionDigits:0 }).format(amount);
 const date = value => value ? new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-GB').format(new Date(`${value}T12:00:00`)) : '—';
 return <Context.Provider value={{lang,setLang,t,l,money,date}}>{children}</Context.Provider>;
}
export function useI18n() { return useContext(Context); }

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider, useI18n } from './i18n';
import { AppProvider } from './context/AppContext';
import Layout from './components/site/Layout';
const Home=lazy(()=>import('./pages/Home/Home'));
const About=lazy(()=>import('./pages/About/About'));
const Services=lazy(()=>import('./pages/Services/Services'));
const ServiceDetail=lazy(()=>import('./pages/ServiceDetail/ServiceDetail'));
const Booking=lazy(()=>import('./pages/Booking/Booking'));
const Account=lazy(()=>import('./pages/Account/Account'));
const Pets=lazy(()=>import('./pages/Pets/Pets'));
const Shop=lazy(()=>import('./pages/Shop/Shop'));
const ProductDetail=lazy(()=>import('./pages/ProductDetail/ProductDetail'));
const Cart=lazy(()=>import('./pages/Cart/Cart'));
const Checkout=lazy(()=>import('./pages/Checkout/Checkout'));
const Search=lazy(()=>import('./pages/Search/Search'));
const FAQ=lazy(()=>import('./pages/FAQ/FAQ'));
const Policy=lazy(()=>import('./pages/Policy/Policy'));

const Blog=lazy(()=>import('./pages/Blog/Blog'));
const NotFound=lazy(()=>import('./pages/NotFound/NotFound'));
function Loading(){const {t}=useI18n();return <div className="container section skeleton" role="status">{t('loading')}<div/><div/><div/></div>;}
export default function App(){return <I18nProvider><AppProvider><Suspense fallback={<Loading/>}><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="gioi-thieu" element={<About/>}/><Route path="dich-vu" element={<Services/>}/><Route path="dich-vu/:slug" element={<ServiceDetail/>}/><Route path="dat-lich" element={<Booking/>}/><Route path="tai-khoan" element={<Account/>}/><Route path="tai-khoan/thu-cung" element={<Pets/>}/><Route path="cua-hang" element={<Shop/>}/><Route path="cua-hang/san-pham" element={<ProductDetail/>}/><Route path="gio-hang" element={<Cart/>}/><Route path="thanh-toan" element={<Checkout/>}/><Route path="tim-kiem" element={<Search/>}/><Route path="faq" element={<FAQ/>}/><Route path="chinh-sach/:slug" element={<Policy/>}/><Route path="lien-he" element={<Navigate to="/#lien-he" replace/>}/><Route path="blog" element={<Blog/>}/><Route path="blog/:id" element={<Blog/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></Suspense></AppProvider></I18nProvider>;}

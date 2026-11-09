import { useEffect, useRef } from 'react';
import { useI18n } from '../../i18n';
import { Link } from 'react-router-dom';
import DemoMotion from '../../components/home/DemoMotion';
import BackgroundScene from '../../components/home/BackgroundScene';
import Hero from '../../components/Hero';
import ProductStories from '../../components/ProductStories';
import TrustStrip from '../../components/TrustStrip';
import Categories from '../../components/Categories';
import FlashProducts from '../../components/FlashProducts';
import FeaturedProducts from '../../components/FeaturedProducts';
import Services from '../../components/Services';
import HomeBooking from '../../components/site/HomeBooking';
import Meta from '../../components/site/Meta';
import { Icon } from '../../components/site/UI';
import '../../styles/demo-home-generated.css';
import '../../styles/demo-home.css';
import '../../styles/home-backgrounds.css';
export default function Home(){const {l,t}=useI18n();const root=useRef(null);useEffect(()=>{const reveal=e=>{const target=e.target.closest('a[href^="#story-"]');if(!target)return;const detail=document.getElementById(target.hash.slice(1));if(detail)detail.open=true;};const node=root.current;node.addEventListener('click',reveal);return()=>node.removeEventListener('click',reveal);},[]);return <div ref={root} className="demo-home"><Meta title={['Chăm sóc chó mèo tại Đà Nẵng','Pet care in Da Nang']} businessSchema/><DemoMotion/><BackgroundScene tone="intro"><Hero/></BackgroundScene><BackgroundScene tone="stories" decoration="paw"><ProductStories/></BackgroundScene><BackgroundScene tone="essentials"><TrustStrip/><Categories/></BackgroundScene><BackgroundScene tone="sale" decoration="ball" transition><div className="motion-paws" aria-hidden="true">{Array.from({length:6},(_,i)=><Icon key={i} name="paw"/>)}</div><FlashProducts/></BackgroundScene><BackgroundScene tone="featured" transition><FeaturedProducts/></BackgroundScene><BackgroundScene tone="care" decoration="collar"><Services/></BackgroundScene><BackgroundScene tone="booking" decoration="paw" transition><section id="booking-steps" className="pet-waypoint max-w-7xl mx-auto px-6 pt-20 pb-10"><div className="text-center max-w-2xl mx-auto mb-12"><h2 className="text-2xl sm:text-3xl font-bold">{l('Đặt lịch chăm sóc thật dễ dàng','A little planning. A happier pet.')}</h2><p className="text-sm text-text-muted mt-3">{l('Chọn dịch vụ, chia sẻ thông tin và gửi yêu cầu để shop xác nhận.','Choose a service, share your details and send a request for confirmation.')}</p></div><ol className="demo-booking-steps">{[['Chọn dịch vụ & bé cưng','Choose care & your pet'],['Chọn ngày & giờ thuận tiện','Choose a date & time'],['Kiểm tra & gửi yêu cầu','Review & send your request']].map(([vi,en],i)=><li key={vi}><span>{i+1}</span><h3>{l(vi,en)}</h3></li>)}</ol></section><HomeBooking/></BackgroundScene><BackgroundScene tone="reviews" transition><section className="pet-waypoint pet-landscape bg-bg-warm py-20 border-y border-border-subtle" id="testimonials"><div className="max-w-7xl mx-auto px-6 text-center"><h2 className="text-2xl sm:text-3xl font-bold">{l('Khách hàng nói gì về Woof N’Whiskers','Your stories, our little community')}</h2><p className="text-sm text-text-muted mt-4">{t('noReviews')}</p></div></section></BackgroundScene><section className="home-closing"><div className="max-w-7xl mx-auto px-6 py-16"><div className="demo-final-cta"><h2>{l('Thêm một chút yêu thương cho bé mỗi ngày','A little more love, every day')}</h2><p>{l('Khám phá sản phẩm và dịch vụ chăm sóc phù hợp cho người bạn nhỏ.','Explore the right products and care for your little companion.')}</p><Link to="/cua-hang/"><Icon name="cart"/>{l('Khám phá cửa hàng','Explore the shop')}</Link></div></div></section></div>;}

import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { categories, services, trust } from '../../data/data';
import assets from '../../data/stitch-assets.json';
import { Button, Icon, ImageLabel } from './UI';
export function CategoryRail({active, onSelect}) {
 const {l,t}=useI18n();const items=[['', [t('all'),t('all')]],...categories];
 return <nav className="category-rail" aria-label={l('Danh mục sản phẩm','Product categories')}>{items.map(([id,name],i)=>onSelect?<button className={active===id?'active':''} key={id} onClick={()=>onSelect(id)}><Icon name={['paw','paw','heart','cart','heart','info'][i]}/>{l(name)}</button>:<Link key={id} to={`/cua-hang/${id?'?category='+id:''}`}><Icon name={['paw','paw','heart','cart','heart','info'][i]}/><span>{l(name)}</span></Link>)}</nav>;
}
export function ValuesGrid() {
 const {l}=useI18n();const descriptions=[['Giá và thông tin dịch vụ rõ ràng để bạn dễ dàng lựa chọn.','Clear prices and service information to help you choose.'],['Chia sẻ tính cách, thói quen ăn uống và nhu cầu riêng của bé.','Share your pet’s personality, diet and individual needs.'],['Từ tiếp nhận đến bàn giao, các bước đều được trao đổi trước.','Understand each step, from check-in to collection.'],['Chọn dịch vụ, thời gian và gửi yêu cầu ngay trên website.','Choose a service and time, and request a booking online.']];
 return <div className="values-grid">{trust.map((title,i)=><article className="value-card" key={i}><Icon name={['info','heart','check','calendar'][i]}/><h3>{l(title)}</h3><p>{l(descriptions[i])}</p><span><Icon name="check" width="15" height="15"/>{l(title)}</span></article>)}</div>;
}
export function SpaceGallery({service}) {
 const {l}=useI18n();const images=service?assets[service].slice(1,5):assets.about.slice(1);const titles=service?services.find(s=>s.id===service).includes:[['Khu vực lễ tân & Đón tiếp ấm áp','A welcoming reception'],['Phòng spa & Grooming','Spa & grooming space'],['Lưu trú qua đêm thoáng mát','A comfortable overnight stay'],['Sân chơi Daycare','Daycare play space']];
 return <div className={`space-gallery ${service?'service-gallery':''}`}>{images.map((image,i)=><article className="space-card" key={image}><ImageLabel src={image} alt={l(titles[i%titles.length])}/><div><h3>{l(titles[i%titles.length])}</h3><p>{l('Hình ảnh minh họa không gian và trải nghiệm chăm sóc.','Illustrative spaces and care experiences.')}</p></div></article>)}</div>;
}
export function AccountSidebar({user,tab,onTab,onLogout}) {
 const {l,t}=useI18n();return <aside className="account-sidebar panel"><div className="account-identity"><span className="account-avatar"><Icon name="user" width="30" height="30"/></span><strong>{user.name}</strong><small>{user.email}</small></div>{[['profile',t('profile'),'user'],['pets',t('pets'),'paw'],['bookings',t('appointments'),'calendar'],['orders',t('orders'),'cart']].map(([key,label,icon])=>key==='pets'||!onTab?<Link aria-current={tab===key?'page':undefined} key={key} to={key==='pets'?'/tai-khoan/thu-cung/':`/tai-khoan/?tab=${key}`}><Icon name={icon}/>{label}</Link>:<button key={key} aria-current={tab===key?'page':undefined} onClick={()=>onTab(key)}><Icon name={icon}/>{label}</button>)}{onLogout&&<button onClick={onLogout}><Icon name="arrow"/>{t('logout')}</button>}<div className="sidebar-help"><Icon name="heart"/><strong>{l('Cần một chút hỗ trợ?','Need a little help?')}</strong><a href="tel:0935605311">093 560 5311</a></div></aside>;
}
export function AuthIntroduction() {
 const {l}=useI18n();return <section className="auth-introduction"><h1>{l('Chào mừng bạn đến với ngôi nhà','Welcome to the home of')} <span>Woof N’ Whiskers</span></h1><p className="brand-quote">A little more love for every little paw.</p><div className="auth-feature"><ImageLabel src={assets.account[0]} alt={l('Chó mèo trong không gian ấm áp','Pets in a welcoming space')}/><div><h2>{l('Chăm sóc bắt đầu từ thấu hiểu','Care begins with understanding')}</h2><p>{l('Lưu thông tin sức khỏe, thói quen và nhu cầu riêng của từng bé.','Keep health details, routines and individual care needs together.')}</p></div></div><div className="panel auth-benefits"><h2>{l('Lợi ích khi đăng nhập tài khoản','Your account, made for pet care')}</h2>{[['paw','Quản lý hồ sơ thú cưng dễ dàng','Manage your pet profiles'],['calendar','Đặt lịch thuận tiện hơn','Make your next booking easier'],['cart','Xem lại đơn hàng của bạn','Keep track of your orders']].map(([icon,vi,en])=><p key={icon}><Icon name={icon}/><span>{l(vi,en)}</span></p>)}</div></section>;
}
export function CareBanner() {
 const {l,t}=useI18n();return <section className="care-banner"><Icon name="heart" width="40" height="40"/><div><h2>{l('Kết hợp mua sắm và chăm sóc cho bé','A little shopping, a little care')}</h2><p>{l('Tìm hiểu dịch vụ phù hợp và lên lịch cho lần ghé tiệm tiếp theo.','Explore our services and plan your pet’s next visit.')}</p></div><Button to="/dat-lich/">{t('book')}</Button></section>;
}

export function CommerceProgress({step=1}) {
 const {l}=useI18n();return <ol className="commerce-progress" aria-label={l('Tiến trình mua hàng','Shopping progress')}>{[['Giỏ hàng','Cart','/gio-hang/'],['Thanh toán','Checkout','/thanh-toan/'],['Hoàn tất','Complete',null]].map(([vi,en,to],i)=><li key={vi} aria-current={step===i+1?'step':undefined}><span>{i+1}</span>{to&&i+1<step?<Link to={to}>{l(vi,en)}</Link>:l(vi,en)}</li>)}</ol>;
}

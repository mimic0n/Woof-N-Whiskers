import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useI18n } from '../../i18n';
import { Button, ErrorSummary, Field, Icon } from '../../components/site/UI';
import '../../styles/sign-in.css';

export default function SignInTemplate({ register, onModeChange, data, update, errors, busy, onSubmit }) {
 const { l, t } = useI18n();
 const [showPassword, setShowPassword] = useState(false);
 return <section className="signin-template" aria-label={t('account')}>
  <div className="signin-backdrop" aria-hidden="true"><img src="/assets/hero-2.webp" alt="" width="1920" height="900"/></div>
  <div className="signin-content">
   <div className="signin-card">
    <Link to="/" className="signin-brand" aria-label={l('Woof N’ Whiskers — Trang chủ','Woof N’ Whiskers — Home')}><Icon name="paw"/><span>Woof N’ Whiskers</span></Link>
    <h1>{register ? l('Tạo tài khoản của bạn','Create your account') : l('Chào mừng bạn trở lại','Welcome back')}</h1>
    <p className="signin-description">{register ? l('Cùng chăm chút cho người bạn nhỏ.','A little more care for your little companion.') : l('Đăng nhập vào Woof N’ Whiskers.','Sign in to Woof N’ Whiskers.')}</p>
    <form noValidate onSubmit={onSubmit}>
     <ErrorSummary errors={errors}/>
     {(register ? ['name','email','phone','password'] : ['email','password']).map(key => <div key={key} className={key === 'password' ? 'signin-password' : undefined}>
      <Field id={key} required label={key === 'password' ? l('Mật khẩu','Password') : t(key)} error={errors[key]} type={key === 'password' ? (showPassword ? 'text' : 'password') : key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} autoComplete={key === 'password' ? (register ? 'new-password' : 'current-password') : key === 'email' ? 'email' : key === 'name' ? 'name' : 'tel'} placeholder={key === 'email' ? 'you@example.com' : key === 'password' ? l('Ít nhất 8 ký tự','At least 8 characters') : undefined} value={data[key]} onChange={e => update(key, e.target.value)}/>
      {key === 'password' && <button type="button" className="signin-password-toggle" aria-label={showPassword ? l('Ẩn mật khẩu','Hide password') : l('Hiện mật khẩu','Show password')} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? <IconEyeOff size={18}/> : <IconEye size={18}/>}</button>}
     </div>)}
     <Button type="submit" disabled={busy}>{busy ? t('loading') : t(register ? 'register' : 'login')}<Icon name="arrow" width="18" height="18"/></Button>
    </form>
    <Link className="signin-help" to="/lien-he/">{l('Cần hỗ trợ đăng nhập?','Need help signing in?')}</Link>
    <div className="signin-divider"><span>{register ? l('Đã có tài khoản?','Already have an account?') : l('Lần đầu ghé thăm?','New around here?')}</span></div>
    <button className="signin-switch" type="button" onClick={() => { setShowPassword(false); onModeChange(!register); }}>{t(register ? 'login' : 'register')}<Icon name="arrow" width="18" height="18"/></button>
    <p className="signin-demo"><Icon name="info" width="15" height="15"/><span>{l('Tài khoản demo · Không dùng mật khẩu thật.','Demo account · Do not use a real password.')}</span></p>
   </div>
   <div className="signin-story">
    <img className="signin-story-mark" src="/assets/paw-mark.svg" width="48" height="48" alt=""/>
    <h2>{l('Một tài khoản.','One account.')}<br/>{l('Thêm nhiều yêu thương.','A little more love.')}</h2>
    <p>{l('Lưu hồ sơ bé cưng, theo dõi lịch chăm sóc và xem lại những đơn hàng — tất cả trong một góc nhỏ dành riêng cho bạn.','Keep your pet’s profile, care bookings and orders together — in one little place made for you.')}</p>
    <span className="signin-signature">A little more love for every little paw.</span>
   </div>
  </div>
  <small className="signin-image-caption">{t('illustration')}</small>
 </section>;
}

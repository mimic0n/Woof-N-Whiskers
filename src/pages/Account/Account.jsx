import { AccountSidebar } from '../../components/site/StitchBlocks';
import { useState } from 'react';
import SignInTemplate from './SignInTemplate';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { hashPassword, uid } from '../../utils/store';
import { customerErrors, emailValid, focusError } from '../../utils/validation';
import Meta from '../../components/site/Meta';
import { Button, Empty, ErrorSummary, Field } from '../../components/site/UI';
import { services } from '../../data/data';
export function Records({type,guest=false}) {
 const {state,user}=useApp();const {l,t,money,date}=useI18n();const records=(type==='bookings'?state.bookings:state.orders).filter(r=>guest?!r.userId:r.userId===user?.id);
 return records.length?<div className="record-list">{records.map(r=><article className="panel" key={r.id}><div className="record-header"><h3>{r.id}</h3><span className="status-chip">{type==='bookings'?t(r.status==='confirmed'?'confirmed':'pending'):l('Đơn hàng demo đã ghi nhận','Demo order recorded')}</span></div>{type==='bookings'?<><p><strong>{l(services.find(s=>s.id===r.service)?.name||['Dịch vụ','Service'])}</strong> · {r.pet?.name}</p><p>{date(r.start)} {r.time} {r.service==='boarding'?` → ${date(r.end)} ${r.endTime}`:''}</p><p>{t('estimate')}: {r.amount===null?t('quote'):money(r.amount)}</p></>:<><p>{r.items.map(item=>`${l(item.name)} × ${item.quantity}`).join(', ')}</p><p>{t('total')}: <strong>{money(r.total)}</strong> · {r.payment}</p></>}</article>)}</div>:<Empty to={type==='bookings'?'/dat-lich/':'/cua-hang/'} title={l(type==='bookings'?'Bạn chưa có lịch đã đặt':'Bạn chưa có đơn hàng',type==='bookings'?'No bookings yet':'No orders yet')} action={type==='bookings'?t('book'):t('shop')}>{l('Bắt đầu từ dịch vụ hoặc sản phẩm phù hợp cho bé.','Start with the right service or product for your pet.')}</Empty>;
}
export default function Account() {
 const {state,user,commit,notify}=useApp();const {t,l}=useI18n();const [params,setParams]=useSearchParams();const tab=params.get('tab')||'profile';
 const [register,setRegister]=useState(false);const [data,setData]=useState({name:user?.name||'',email:user?.email||'',phone:user?.phone||'',birthday:user?.birthday||'',password:''});const [errors,setErrors]=useState({});const [busy,setBusy]=useState(false);
 const update=(key,value)=>{setData(d=>({...d,[key]:value}));setErrors(e=>({...e,[key]:undefined}));};
 async function submit(e) {
  e.preventDefault();let errors={};
  if(user||register)errors=customerErrors(data);else if(!emailValid(data.email))errors.email='emailError';
  if(!user&&data.password.length<8)errors.password='passwordError';
  if((register||user)&&state.users.some(u=>u.email.toLowerCase()===data.email.trim().toLowerCase()&&u.id!==user?.id))errors.email='emailExists';
  setErrors(errors);focusError(errors);if(Object.keys(errors).length)return;
  setBusy(true);
  try {
   if(user){commit(s=>({...s,users:s.users.map(u=>u.id===user.id?{...u,name:data.name.trim(),email:data.email.trim().toLowerCase(),phone:data.phone,birthday:data.birthday}:u)}));notify('Đã lưu thông tin cá nhân.','Personal details saved.');}
   else if(register){const id=uid(),salt=uid(),hash=await hashPassword(data.password,salt);commit(s=>({...s,users:[...s.users,{id,name:data.name.trim(),email:data.email.trim().toLowerCase(),phone:data.phone,salt,hash}],session:id}));setRegister(false);setData(d=>({...d,password:''}));notify('Đã tạo tài khoản demo.','Demo account created.');}
   else {const found=state.users.find(u=>u.email.toLowerCase()===data.email.trim().toLowerCase());if(!found||await hashPassword(data.password,found.salt)!==found.hash){setErrors({password:'credentialsError'});return;}commit(s=>({...s,session:found.id}));setData({name:found.name,email:found.email,phone:found.phone,birthday:found.birthday||'',password:''});notify('Đã đăng nhập.','Signed in.');}
  }catch{setErrors({form:'storageError'});}finally{setBusy(false);}
 }
 return <div className={user ? "container section" : "account-auth-page"}><Meta title={['Tài khoản','Account']}/>{user&&<div className="page-heading"><h1>{t('account')}</h1><p>{t('demo')}</p></div>}{user?<div className="account-layout"><AccountSidebar user={user} tab={tab} onTab={value=>setParams({tab:value})} onLogout={()=>{try{commit(s=>({...s,session:null}));setData({name:'',email:'',phone:'',password:''});}catch{notify('Không lưu được. Thử lại.','Unable to save. Try again.');}}}/><section>{tab==='bookings'||tab==='orders'?<><h2>{t(tab==='bookings'?'appointments':'orders')}</h2><Records type={tab}/></>:<form className="panel" noValidate onSubmit={submit}><h2>{t('profile')}</h2><ErrorSummary errors={errors}/><div className="form-grid">{['name','email','phone','birthday'].map(key=><Field key={key} id={key} label={t(key)} required={key!=='birthday'} type={key==='birthday'?'date':key==='email'?'email':key==='phone'?'tel':'text'} value={data[key]||''} onChange={e=>update(key,e.target.value)} error={errors[key]}/>)}</div><Button type="submit" disabled={busy}>{busy?t('loading'):t('save')}</Button></form>}</section></div>:<><SignInTemplate register={register} onModeChange={value=>{setRegister(value);setErrors({});}} data={data} update={update} errors={errors} busy={busy} onSubmit={submit}/>
{(state.bookings.some(r=>!r.userId)||state.orders.some(r=>!r.userId))&&<section className="section"><h2>{l('Hoạt động khách vãng lai trên trình duyệt này','Guest activity in this browser')}</h2><p>{l('Dữ liệu demo chỉ có trên thiết bị này.','Demo records are available on this device only.')}</p><h3>{t('appointments')}</h3><Records type="bookings" guest/><h3>{t('orders')}</h3><Records type="orders" guest/></section>}</>}
 </div>;
}

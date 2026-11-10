import { useEffect, useState } from 'react';
export default function QuickBooking() {
 const [service, setService] = useState('grooming');
 const [message, setMessage] = useState('');
 useEffect(() => {
  const select = event => setService(event.detail);
  window.addEventListener('wnw:service', select);
  return () => window.removeEventListener('wnw:service', select);
 }, []);
 const today = new Date().toLocaleDateString('en-CA');
 function submit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (service === 'boarding' && data.end <= data.start) { setMessage('Ngày trả cần sau ngày nhận ít nhất 1 đêm.'); return; }
  try { localStorage.setItem('wnw_booking_draft', JSON.stringify({ ...data, service })); setMessage('Đã lưu lựa chọn nháp. Luồng đặt lịch 4 bước đang được xây dựng. Vui lòng gọi 093 560 5311 để trao đổi với shop; chưa có yêu cầu nào được gửi.'); }
  catch { setMessage('Trình duyệt chưa cho phép lưu nháp. Hãy bật lưu trữ hoặc liên hệ 093 560 5311.'); }
 }
 return <section id="booking-card" className="max-w-7xl mx-auto px-6 py-16"><div className="bg-white rounded-3xl p-6 md:p-8 card-shadow-2">
 <h2 className="text-2xl font-bold">Chọn dịch vụ cho bé</h2><p className="mt-2 text-sm text-text-muted">Đây là form lựa chọn nhanh trong bản demo trang chủ. Chưa gửi yêu cầu đến shop.</p>
 <form onSubmit={submit} className="mt-6 space-y-6">
 <fieldset><legend className="font-semibold mb-3">Bạn muốn đặt lịch cho ai?</legend><div className="flex gap-5">{['Chó','Mèo'].map((pet,i) => <label className="flex items-center gap-2 min-h-11" key={pet}><input type="radio" name="species" value={pet} defaultChecked={i === 0} />Bé {pet}</label>)}</div></fieldset>
 <fieldset><legend className="font-semibold mb-3">Chọn dịch vụ</legend><div className="flex flex-wrap gap-3">{[['grooming','Chăm sóc lông'],['boarding','Lưu trú ban đêm'],['daycare','Chăm sóc ban ngày']].map(([value,label]) => <label className={`service-option ${service === value ? 'selected' : ''}`} key={value}><input type="radio" name="service" value={value} checked={service === value} onChange={() => setService(value)} />{label}</label>)}</div></fieldset>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><label className="booking-label">{service === 'boarding' ? 'Ngày nhận' : 'Ngày sử dụng'} *<input type="date" name="start" min={today} required /></label>{service === 'boarding' ? <label className="booking-label">Ngày trả *<input type="date" name="end" min={today} required /></label> : <label className="booking-label">Giờ nhận *<input type="time" name="time" min="08:00" max="20:00" step="1800" required /></label>}<label className="booking-label">Cân nặng *<select name="weight" required><option value="">Chọn khoảng cân nặng</option>{['Dưới 5kg','5–10kg','10–25kg','Trên 25kg'].map(value => <option key={value}>{value}</option>)}</select></label></div>
 <p className="text-xs text-text-muted">08:00–20:00, Thứ 2 – Chủ nhật · Giờ demo, cần cập nhật. Thời lượng grooming: theo gói, shop sẽ xác nhận.</p>
 <button className="rounded-full bg-cta text-white px-6 py-3 font-semibold" type="submit">Lưu lựa chọn nháp</button><p role="status" className="text-sm text-brand">{message}</p>
 </form></div></section>;
}

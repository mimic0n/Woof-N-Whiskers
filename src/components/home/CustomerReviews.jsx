import { useState } from 'react';
import { IconStar, IconQuote, IconThumbUp } from '@tabler/icons-react';
import { useI18n } from '../../i18n';
import '../../styles/customer-reviews.css';

const reviews = [
 { id: 1, name: 'Minh Anh', initials: 'MA', pet: ['Milo · Poodle', 'Milo · Poodle'], service: 'grooming', rating: 5, title: ['Một diện mạo mới cho Milo', 'A fresh look for Milo'], text: ['Mình thích cách giao diện thể hiện từng bước chăm sóc. Nếu nhận được cập nhật và hình ảnh của Milo trong buổi spa thì sẽ rất yên tâm.', 'I like seeing each care step clearly explained. Updates and photos of Milo during a grooming visit would be especially reassuring.'] },
 { id: 2, name: 'Hoàng Nam', initials: 'HN', pet: ['Bông · Mèo Anh', 'Bong · British Shorthair'], service: 'boarding', rating: 5, title: ['Chuẩn bị một kỳ nghỉ nhỏ cho Bông', 'Planning a little stay for Bong'], text: ['Phần thông tin lưu trú và những điều cần chuẩn bị giúp mình dễ hình dung hơn. Mình muốn có thêm chỗ ghi lại thói quen ăn uống của bé khi đặt lịch.', 'The boarding details and preparation notes make planning a stay easier. A place to share my cat’s feeding habits during booking would be helpful.'] },
 { id: 3, name: 'Ngọc Linh', initials: 'NL', pet: ['Lucky · Corgi', 'Lucky · Corgi'], service: 'daycare', rating: 4, title: ['Một ngày vui cho người bạn nhỏ', 'A happy day for a little companion'], text: ['Các lựa chọn chăm sóc ban ngày được trình bày dễ hiểu. Mình thích có thể chọn thời gian phù hợp và trao đổi trước về nhu cầu của Lucky.', 'The daycare options are easy to understand. I like being able to choose a suitable time and discuss Lucky’s needs in advance.'] },
];
const services = { grooming: ['Spa & chăm sóc lông', 'Spa & grooming'], boarding: ['Lưu trú', 'Boarding'], daycare: ['Chăm sóc ban ngày', 'Daycare'] };

function Stars({ rating, label }) {
 return <span className="review-stars" role="img" aria-label={label}>{Array.from({length:5},(_,i)=><IconStar key={i} size={17} aria-hidden="true" fill={i<rating?'currentColor':'none'}/>)}</span>;
}
export default function CustomerReviews() {
 const { l } = useI18n();
 const [filter, setFilter] = useState('all');
 const [helpful, setHelpful] = useState([]);
 const visible = reviews.filter(review=>filter==='all'||review.service===filter);
 const average = (reviews.reduce((sum,review)=>sum+review.rating,0)/reviews.length).toFixed(1);
 return <section id="customer-reviews" className="container section customer-reviews" aria-labelledby="customer-reviews-title">
  <div className="reviews-heading"><div><h2 id="customer-reviews-title">{l('Đánh giá khách hàng','Customer reviews')}</h2><p>{l('Những câu chuyện nhỏ, thêm một chút yêu thương.','Little stories. A little more love.')}</p></div><span className="review-sample-label">{l('Giao diện mẫu','Interface preview')}</span></div>
  <p className="review-disclosure">{l('Nội dung và điểm số dưới đây là dữ liệu mẫu để xem trước giao diện, không phải đánh giá thực tế của khách hàng.','The reviews and scores below are sample content for an interface preview, not actual customer feedback.')}</p>
  <div className="reviews-layout">
   <aside className="reviews-summary" aria-label={l('Tổng hợp điểm mẫu','Sample rating summary')}>
    <div className="review-average"><IconStar size={28} fill="currentColor" aria-hidden="true"/><strong>{average}</strong><span>/ 5</span></div>
    <p>{l('Từ 3 nhận xét mẫu','From 3 sample reviews')}</p>
    <div className="review-distribution">{[5,4,3,2,1].map(rating=>{const count=reviews.filter(review=>review.rating===rating).length;return <div key={rating}><span>{rating} <IconStar size={12} aria-hidden="true"/></span><meter min="0" max={reviews.length} value={count} aria-label={l(`${rating} sao: ${count} nhận xét mẫu`,`${rating} stars: ${count} sample reviews`)}/><span>{count}</span></div>;})}</div>
    <p className="review-summary-note">{l('Bạn có thể thử lọc theo dịch vụ và đánh dấu nhận xét hữu ích.','Try filtering by service and marking a review as helpful.')}</p>
   </aside>
   <div className="reviews-content">
    <div className="review-filters" role="group" aria-label={l('Lọc đánh giá theo dịch vụ','Filter reviews by service')}>{[['all',['Tất cả','All']],...Object.entries(services)].map(([key,label])=><button type="button" key={key} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{l(label)}</button>)}</div>
    <p className="review-result-count" role="status">{l(`${visible.length} nhận xét mẫu`,`${visible.length} sample ${visible.length===1?'review':'reviews'}`)}</p>
    <div className="review-list">{visible.map(review=><article className="customer-review" key={review.id}>
     <div className="review-author"><span className="review-avatar" aria-hidden="true">{review.initials}</span><div><h3>{review.name}</h3><p>{l(review.pet)}</p></div><span className="review-service">{l(services[review.service])}</span></div>
     <Stars rating={review.rating} label={l(`${review.rating} trên 5 sao — điểm mẫu`,`${review.rating} out of 5 stars — sample rating`)}/>
     <h4>{l(review.title)}</h4><blockquote><IconQuote size={20} aria-hidden="true"/><p>{l(review.text)}</p></blockquote>
     <button type="button" className="review-helpful" aria-pressed={helpful.includes(review.id)} onClick={()=>setHelpful(current=>current.includes(review.id)?current.filter(id=>id!==review.id):[...current,review.id])}><IconThumbUp size={16} aria-hidden="true"/>{helpful.includes(review.id)?l('Đã đánh dấu hữu ích','Marked as helpful'):l('Hữu ích','Helpful')}</button>
    </article>)}</div>
   </div>
  </div>
 </section>;
}

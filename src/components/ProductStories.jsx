import { useI18n } from '../i18n';
import { useEffect, useRef } from 'react';


export default function ProductStories() {
 const { l } = useI18n();
const root = useRef(null);
useEffect(() => {
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 const cleanups = [...root.current.querySelectorAll('details')].map(detail => {
  let animation;
  let closing = false;
  const summary = detail.querySelector('summary');
  const toggle = () => {
   if (!detail.open || closing || preference.matches) return;
   const body = detail.querySelector('p');
   animation?.cancel();
   animation = body.animate([{opacity: .3, transform: 'translateY(-6px)'}, {opacity: 1, transform: 'none'}], {duration: 240, easing: 'cubic-bezier(.16,1,.3,1)'});
   detail.animate([{height: `${summary.offsetHeight}px`}, {height: `${detail.offsetHeight}px`}], {duration: 260, easing: 'cubic-bezier(.16,1,.3,1)'});
  };
  const close = event => {
   if (!detail.open || preference.matches) return;
   event.preventDefault();
   if (closing) return;
   closing = true;
   animation?.cancel();
   animation = detail.animate([{height: `${detail.offsetHeight}px`}, {height: `${summary.offsetHeight}px`}], {duration: 200, easing: 'ease-out'});
   animation.onfinish = () => {detail.open = false; closing = false;};
  };
  const stop = () => { if(preference.matches) animation?.finish(); };
  detail.addEventListener('toggle', toggle); summary.addEventListener('click', close); preference.addEventListener('change', stop);
  return () => {animation?.cancel(); detail.getAnimations().forEach(a=>a.cancel()); detail.removeEventListener('toggle', toggle); summary.removeEventListener('click', close); preference.removeEventListener('change', stop);};
 });
 return () => cleanups.forEach(cleanup => cleanup());
}, []);


return (<section ref={root} className="product-stories" id="product-stories" aria-labelledby="product-stories-title">
<div className="product-stories-heading">
<h2 id="product-stories-title">{l("Những điều nhỏ bé.", "The little things.")}<br /><em>{l("Một đời được yêu thương.", "A lifetime of love.")}</em></h2>
<p>{l("Từ bữa ăn ngon đến một giấc ngủ yên, khám phá những sản phẩm đồng hành cùng bé mỗi ngày.", "From tasty treats to peaceful sleep, discover everyday essentials for your little companion.")}</p>
</div>
<div className="product-stories-grid">
<article className="product-story-card story-food">
<img src="/assets/products/orijen-tundra.webp" alt={l("Bao bì bánh thưởng đông khô Orijen Tundra cho mèo", "Orijen Tundra freeze-dried cat treat packaging")} width="640" height="480" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{l("Ngon lành", "Little treats,")}</em><br />{l("từng khoảnh khắc", "lovely moments")}</h3><span>{l("Orijen Tundra · Bánh thưởng", "Orijen Tundra · Treats")}</span></div>
<div className="product-story-bottom"><p>{l("Một phần thưởng nhỏ, thêm một lần bé cảm nhận được yêu thương.", "A little reward. One more moment to feel loved.")}</p><a href="#story-mealtime">{l("Khám phá câu chuyện ", "Read the story ")}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
<article className="product-story-card story-play">
<img src="/assets/products/cheerble-wicked-ball.webp" alt={l("Bóng đồ chơi Cheerble Wicked Ball", "Cheerble Wicked Ball pet toy")} width="640" height="480" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{l("Niềm vui", "Playtime")}</em><br />{l("không đứng yên", "never stands still")}</h3><span>{"Cheerble · Wicked Ball"}</span></div>
<div className="product-story-bottom"><p>{l("Biến khoảng thời gian ở nhà thành những giờ chơi đầy háo hức.", "Make time at home a little more playful.")}</p><a href="#story-playtime">{l("Khám phá câu chuyện ", "Read the story ")}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
<article className="product-story-card story-rest">
<img src="/assets/products/pawnest-bed.webp" alt={l("Chú chó ngủ yên trên chiếc đệm mềm trong phòng khách", "A dog sleeping on a soft bed in a living room")} width="512" height="279" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{l("Bình yên", "A quiet corner,")}</em><br />{l("có một chỗ riêng", "all their own")}</h3><span>{l("Đệm êm · Giấc ngủ của bé", "Soft beds · Sweet dreams")}</span></div>
<div className="product-story-bottom"><p>{l("Sau một ngày khám phá, bé chỉ cần một góc thật êm để cuộn mình.", "After a day of exploring, a soft spot to curl up is all they need.")}</p><a href="#story-resttime">{l("Khám phá câu chuyện ", "Read the story ")}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
</div>
<div className="product-story-editorial">
<div className="product-story-signature"><span className="story-wordmark">{"WnW"}<span aria-hidden="true">{"®"}</span></span><p>{l("Hiểu bé hơn.", "Understand them better.")}<br />{l("Thương bé đúng cách.", "Care for them thoughtfully.")}</p><a href="#flash-sale">{l("Khám phá sản phẩm ", "Explore products ")}<span aria-hidden="true">{"→"}</span></a></div>
<div className="product-story-narrative">
<h3>{l("Mỗi bé một tính cách.", "Every pet has a personality.")}<br />{l("Mỗi món đồ, ", "Every little essential, ")}<em>{l("một lời yêu thương.", "a gesture of love.")}</em></h3>
<p>{l("Bé không thể nói mình cần gì, nhưng những thói quen nhỏ luôn kể một câu chuyện: ánh mắt chờ bữa ăn, chiếc đuôi vẫy khi được chơi cùng, hay dáng nằm cuộn tròn lúc ngủ. Đó là nơi câu chuyện sản phẩm tại WnW bắt đầu.", "Pets cannot tell us what they need, but their little habits tell a story: an eager look at mealtime, a wagging tail during play, or a sleepy curl at bedtime. That is where our product stories at WnW begin.")}</p>
<div className="product-story-details">
<details id="story-mealtime"><summary>{l("Từ một bữa ăn được mong chờ", "It starts with a much-loved treat")}</summary><p>{l("Tiếng mở túi bánh thưởng có thể khiến bé chạy đến bên bạn. Orijen Tundra góp mặt trong những khoảnh khắc gần gũi ấy: khi làm quen, khi chơi cùng nhau, hay sau một lần bé ngoan. Hãy chọn khẩu phần phù hợp với bé và hướng dẫn trên bao bì.", "The rustle of a treat bag can bring your pet running. Orijen Tundra can be part of those shared moments: getting to know each other, playing together, or rewarding good behaviour. Choose a portion that suits your pet and follow the guidance on the packaging.")}</p></details>
<details id="story-playtime"><summary>{l("Đến những giờ chơi bên nhau", "Then comes time to play together")}</summary><p>{l("Một quả bóng lăn qua cũng đủ khơi dậy sự tò mò. Cheerble Wicked Ball mang đến một lựa chọn cho góc vui chơi của bé, để những bước đuổi bắt trở thành một phần của ngày. Chọn đồ chơi phù hợp với kích thước, thói quen và luôn quan sát bé khi chơi.", "A rolling ball is enough to spark curiosity. Cheerble Wicked Ball offers an option for your pet’s play corner, making a little chase part of the day. Choose toys that suit your pet’s size and habits, and always supervise play.")}</p></details>
<details id="story-resttime"><summary>{l("Và một nơi để trở về", "And a cosy place to come home to")}</summary><p>{l("Khi cuộc vui khép lại, một chiếc đệm êm là góc nhỏ quen thuộc để bé thả lỏng. Đặt đệm ở nơi yên tĩnh, chọn kích thước đủ cho bé duỗi mình và giữ đệm sạch sẽ — những điều giản dị làm nên cảm giác được chăm sóc mỗi ngày.", "When playtime is over, a soft bed offers a familiar place to unwind. Put it somewhere quiet, choose a size with room to stretch, and keep it clean. Simple touches like these help your pet feel cared for every day.")}</p></details>
</div>
</div>
</div>
<p className="text-center text-xs text-text-muted py-4">{l("Ảnh minh họa", "Illustrative image")}</p></section>);
}

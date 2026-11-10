import { useEffect, useRef } from 'react';


export default function ProductStories() {
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
<h2 id="product-stories-title">{"Những điều nhỏ bé."}<br /><em>{"Một đời được yêu thương."}</em></h2>
<p>{"Từ bữa ăn ngon đến một giấc ngủ yên, khám phá những sản phẩm đồng hành cùng bé mỗi ngày."}</p>
</div>
<div className="product-stories-grid">
<article className="product-story-card story-food">
<img src="/assets/products/orijen-tundra.webp" alt="Bao bì bánh thưởng đông khô Orijen Tundra cho mèo" width="640" height="480" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{"Ngon lành"}</em><br />{"từng khoảnh khắc"}</h3><span>{"Orijen Tundra · Bánh thưởng"}</span></div>
<div className="product-story-bottom"><p>{"Một phần thưởng nhỏ, thêm một lần bé cảm nhận được yêu thương."}</p><a href="#story-mealtime">{"Khám phá câu chuyện "}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
<article className="product-story-card story-play">
<img src="/assets/products/cheerble-wicked-ball.webp" alt="Bóng đồ chơi Cheerble Wicked Ball" width="640" height="480" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{"Niềm vui"}</em><br />{"không đứng yên"}</h3><span>{"Cheerble · Wicked Ball"}</span></div>
<div className="product-story-bottom"><p>{"Biến khoảng thời gian ở nhà thành những giờ chơi đầy háo hức."}</p><a href="#story-playtime">{"Khám phá câu chuyện "}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
<article className="product-story-card story-rest">
<img src="/assets/products/pawnest-bed.webp" alt="Chú chó ngủ yên trên chiếc đệm mềm trong phòng khách" width="512" height="279" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = "/assets/hero-1.webp"; }} />
<div className="product-story-top"><h3><em>{"Bình yên"}</em><br />{"có một chỗ riêng"}</h3><span>{"Đệm êm · Giấc ngủ của bé"}</span></div>
<div className="product-story-bottom"><p>{"Sau một ngày khám phá, bé chỉ cần một góc thật êm để cuộn mình."}</p><a href="#story-resttime">{"Khám phá câu chuyện "}<span aria-hidden="true">{"↗"}</span></a></div>
</article>
</div>
<div className="product-story-editorial">
<div className="product-story-signature"><span className="story-wordmark">{"WnW"}<span aria-hidden="true">{"®"}</span></span><p>{"Hiểu bé hơn."}<br />{"Thương bé đúng cách."}</p><a href="/cua-hang/">{"Khám phá sản phẩm "}<span aria-hidden="true">{"→"}</span></a></div>
<div className="product-story-narrative">
<h3>{"Mỗi bé một tính cách."}<br />{"Mỗi món đồ, "}<em>{"một lời yêu thương."}</em></h3>
<p>{"Bé không thể nói mình cần gì, nhưng những thói quen nhỏ luôn kể một câu chuyện: ánh mắt chờ bữa ăn, chiếc đuôi vẫy khi được chơi cùng, hay dáng nằm cuộn tròn lúc ngủ. Đó là nơi câu chuyện sản phẩm tại WnW bắt đầu."}</p>
<div className="product-story-details">
<details id="story-mealtime"><summary>{"Từ một bữa ăn được mong chờ"}</summary><p>{"Tiếng mở túi bánh thưởng có thể khiến bé chạy đến bên bạn. Orijen Tundra góp mặt trong những khoảnh khắc gần gũi ấy: khi làm quen, khi chơi cùng nhau, hay sau một lần bé ngoan. Hãy chọn khẩu phần phù hợp với bé và hướng dẫn trên bao bì."}</p></details>
<details id="story-playtime"><summary>{"Đến những giờ chơi bên nhau"}</summary><p>{"Một quả bóng lăn qua cũng đủ khơi dậy sự tò mò. Cheerble Wicked Ball mang đến một lựa chọn cho góc vui chơi của bé, để những bước đuổi bắt trở thành một phần của ngày. Chọn đồ chơi phù hợp với kích thước, thói quen và luôn quan sát bé khi chơi."}</p></details>
<details id="story-resttime"><summary>{"Và một nơi để trở về"}</summary><p>{"Khi cuộc vui khép lại, một chiếc đệm êm là góc nhỏ quen thuộc để bé thả lỏng. Đặt đệm ở nơi yên tĩnh, chọn kích thước đủ cho bé duỗi mình và giữ đệm sạch sẽ — những điều giản dị làm nên cảm giác được chăm sóc mỗi ngày."}</p></details>
</div>
</div>
</div>
<p className="text-center text-xs text-text-muted py-4">Ảnh minh họa</p></section>);
}

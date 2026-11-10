export default function Header({ cartCount, onSearch }) { return (<> <div className="bg-brand text-white py-2.5 px-4 text-center text-xs md:text-sm font-medium transition-colors border-b border-brand-dark/20">
<div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
<span className="inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-brand-peach">{"local_shipping"}</span>{"\n        Phí vận chuyển: miễn phí cho đơn từ 500.000đ\n      "}</span>
<span className="hidden md:inline text-white/40">{"|"}</span>
<span className="inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-brand-peach">{"support_agent"}</span>{"\n        Hotline: "}<strong className="text-white">{"093 560 5311"}</strong>{" (08:00–20:00)\n      "}</span>
<span className="hidden lg:inline text-white/40">{"|"}</span>
<span className="hidden lg:inline-flex items-center gap-1 text-brand-peach">
<span className="material-symbols-outlined text-[16px]">{"verified"}</span>{"\n        Thông tin dịch vụ minh bạch · Dễ dàng đặt lịch\n      "}</span>
</div>
</div><header className="sticky top-0 w-full z-50 bg-white border-b border-border-subtle shadow-sm">
<div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">

<a className="flex items-center gap-2 group active:scale-95 transition-transform duration-150" href="/cua-hang/">
<div className="w-11 h-11 rounded-full bg-badge-cream flex items-center justify-center text-brand group-hover:bg-brand-peach transition-colors">
<span className="material-symbols-outlined text-2xl fill-icon text-brand">{"pets"}</span>
</div>
<span className="text-2xl font-bold text-brand tracking-tight">{"Woof N’Whiskers"}</span>
</a>

<nav aria-label="Điều hướng chính" className="dock-fallback hidden md:flex items-center gap-8">
<a className="text-cta font-semibold border-b-2 border-cta pb-1 text-sm tracking-normal" href="/cua-hang/">{"Sản Phẩm"}</a>
<a className="text-text-muted font-medium hover:text-cta transition-colors text-sm" href="#services">{"Dịch Vụ"}</a>
<a className="text-text-muted font-medium hover:text-cta transition-colors text-sm" href="#booking-card">{"Đặt Lịch"}</a>
<a className="text-text-muted font-medium hover:text-cta transition-colors text-sm" href="/cua-hang/">{"Khuyến Mãi"}</a>
<a className="text-text-muted font-medium hover:text-cta transition-colors text-sm" href="#testimonials">{"Về Chúng Tôi"}</a>
</nav>

<div className="flex items-center gap-4">

<form className="relative hidden lg:block w-64" onSubmit={onSearch}>
<input className="w-full h-11 pl-10 pr-4 text-xs bg-bg-canvas border border-border-subtle rounded-full focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta transition-all placeholder:text-text-muted" placeholder="Tìm hạt, pate, spa..." type="text" name="q" aria-label="Tìm sản phẩm trên trang chủ" />
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-[18px]">{"search"}</span>
</form>

<div className="flex items-center gap-1.5">



<button className="relative p-2 text-text-muted hover:text-cta rounded-full hover:bg-bg-warm transition-colors active:scale-95" title="Giỏ hàng">
<span className="material-symbols-outlined text-[22px]">{"shopping_bag"}</span>
<span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none" data-cart-count="true">{cartCount}</span>
</button>
</div>

<a className="hidden sm:inline-flex items-center text-text-main font-semibold text-sm hover:text-cta transition-colors px-3 py-2" href="/cua-hang/" data-unavailable="Tài khoản">{"\n          Đăng Nhập\n        "}</a>

<a aria-label="Đặt lịch ngay" className="bg-cta hover:bg-cta-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm active:scale-95 inline-flex items-center gap-1.5" href="#booking-card">
<span className="material-symbols-outlined text-[18px]">{"calendar_month"}</span>{"\n          Đặt Lịch Ngay\n        "}</a>
</div>
</div>
</header></>); }
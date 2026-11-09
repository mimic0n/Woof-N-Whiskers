
export default function Footer() {

return (<footer id="footer" className="w-full border-t border-border-subtle bg-bg-warm">
<div className="max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-subtle">

<div className="lg:col-span-2 space-y-4">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full bg-badge-cream flex items-center justify-center text-brand">
<span className="material-symbols-outlined text-2xl fill-icon text-brand">{"pets"}</span>
</div>
<span className="text-xl font-bold text-brand">{"Woof N’Whiskers"}</span>
</div>
<p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed">{"\n            Woof N’Whiskers — cửa hàng và dịch vụ chăm sóc chó mèo tại Đà Nẵng. A little more love for every little paw.\n          "}</p>
<div className="flex items-center gap-3 pt-2">
<a aria-label="Liên kết mạng xã hội chưa cập nhật" className="w-9 h-9 rounded-full bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-cta hover:border-cta transition-all shadow-xs" href="#footer" data-unavailable="Nội dung này">
<span className="material-symbols-outlined text-[18px]">{"public"}</span>
</a>
<a aria-label="Liên kết mạng xã hội chưa cập nhật" className="w-9 h-9 rounded-full bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-cta hover:border-cta transition-all shadow-xs" href="#footer" data-unavailable="Nội dung này">
<span className="material-symbols-outlined text-[18px]">{"forum"}</span>
</a>
<a aria-label="Liên kết mạng xã hội chưa cập nhật" className="w-9 h-9 rounded-full bg-white border border-border-subtle flex items-center justify-center text-text-muted hover:text-cta hover:border-cta transition-all shadow-xs" href="#footer" data-unavailable="Nội dung này">
<span className="material-symbols-outlined text-[18px]">{"smart_display"}</span>
</a>
</div>
</div>

<div>
<h4 className="font-bold text-brand text-sm mb-4">{"Danh Mục Sản Phẩm"}</h4>
<ul className="space-y-2.5 text-xs text-text-muted">
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Thức ăn cho chó"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Thức ăn cho mèo"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Đồ chơi tương tác"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Phụ kiện & Dây dắt"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Vệ sinh & Khử mùi"}</a></li>
</ul>
</div>

<div>
<h4 className="font-bold text-brand text-sm mb-4">{"Dịch Vụ & Chính Sách"}</h4>
<ul className="space-y-2.5 text-xs text-text-muted">
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Chính sách đổi trả"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Điều khoản dịch vụ"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Bảo mật thông tin"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Hệ thống cửa hàng"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Hướng dẫn mua hàng"}</a></li>
<li><a className="hover:text-cta transition-colors" href="#footer" data-unavailable="Nội dung này">{"Chăm sóc khách hàng"}</a></li>
</ul>
</div>

<div>
<h4 className="font-bold text-brand text-sm mb-4">{"Liên Hệ Trực Tiếp"}</h4>
<ul className="space-y-3 text-xs text-text-muted">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-brand">{"call"}</span>
<span>{"Hotline: "}<strong className="text-text-main">{"093 560 5311"}</strong>{" (08:00–20:00 · Giờ demo, cần cập nhật)"}</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-brand">{"mail"}</span>
<span>{"Email: phungntldn@gmail.com"}</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-brand">{"location_on"}</span>
<span>{"49 Phạm Kiệt, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng"}</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-brand">{"location_on"}</span>
<span>{"Thứ 2 – Chủ nhật · 08:00–20:00 · Giờ demo, cần cập nhật"}</span>
</li>
</ul>
</div>
</div>

<div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
<p>{"© 2026 Woof N’Whiskers. Tất cả quyền được bảo lưu. Đơn vị tiền tệ niêm yết: VND."}</p>
<div className="flex items-center gap-6">
<span className="inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-success">{"lock"}</span>{"\n            Prototype · Thanh toán mô phỏng\n          "}</span>
<span className="inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-brand">{"favorite"}</span>{"\n            Nuôi dưỡng bằng cả trái tim\n          "}</span>
</div>
</div>
</div>
</footer>);
}

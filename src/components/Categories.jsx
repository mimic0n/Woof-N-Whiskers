import DemoIcon from './home/DemoIcon';

export default function Categories() {

return (<section className="pet-waypoint max-w-7xl mx-auto px-6 py-12">
<div className="paw-trail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div className="flex items-end justify-between mb-8">
<div>

<h2 className="text-2xl sm:text-3xl font-bold text-text-main mt-1">{"Danh mục nổi bật"}</h2>
</div>
<a className="text-cta font-semibold text-sm hover:underline flex items-center gap-1" href="/cua-hang/">{"\n          Xem tất cả danh mục\n          "}<DemoIcon name="arrow_forward"/>
</a>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=food-dog">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
<DemoIcon name="pet_supplies"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Thức ăn chó"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=food-cat">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="set_meal"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Thức ăn mèo"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=toys">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
<DemoIcon name="sports_baseball"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Đồ chơi"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=accessories">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="link"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Dây dắt & Vòng"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-success group-hover:scale-110 transition-transform">
<DemoIcon name="sanitizer"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Vệ sinh & Tắm"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=accessories">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
<DemoIcon name="bed"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Chuồng & Nệm"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
<DemoIcon name="vital_signs"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Vitamin & Thuốc"}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="delete_sweep"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{"Cát vệ sinh"}</p>

</a>
</div>
<p className="text-center text-xs text-text-muted py-4">Ảnh minh họa</p></section>);
}

import { useI18n } from '../i18n';
import DemoIcon from './home/DemoIcon';

export default function Categories() {
 const { l } = useI18n();

return (<section className="pet-waypoint max-w-7xl mx-auto px-6 py-12">
<div className="paw-trail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div className="flex items-end justify-between mb-8">
<div>

<h2 className="text-2xl sm:text-3xl font-bold text-text-main mt-1">{l("Danh mục nổi bật", "Featured categories")}</h2>
</div>
<a className="text-cta font-semibold text-sm hover:underline flex items-center gap-1" href="#flash-sale">{l('Xem tất cả danh mục', 'View all categories')}<DemoIcon name="arrow_forward"/>
</a>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=food-dog">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
<DemoIcon name="pet_supplies"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Thức ăn chó", "Dog food")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=food-cat">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="set_meal"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Thức ăn mèo", "Cat food")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=toys">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
<DemoIcon name="sports_baseball"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Đồ chơi", "Toys")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=accessories">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="link"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Dây dắt & Vòng", "Leads & collars")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-success group-hover:scale-110 transition-transform">
<DemoIcon name="sanitizer"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Vệ sinh & Tắm", "Bath & hygiene")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=accessories">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
<DemoIcon name="bed"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Chuồng & Nệm", "Crates & beds")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-badge-cream flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
<DemoIcon name="vital_signs"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Vitamin & Thuốc", "Vitamins & medicine")}</p>

</a>

<a className="group bg-white p-4 rounded-2xl border border-border-subtle text-center hover:border-cta hover:-translate-y-1 transition-all card-shadow-1" href="/cua-hang/?category=care">
<div className="w-14 h-14 mx-auto mb-3 rounded-full bg-cta-soft flex items-center justify-center text-cta group-hover:scale-110 transition-transform">
<DemoIcon name="delete_sweep"/>
</div>
<p className="text-sm font-semibold text-text-main group-hover:text-cta">{l("Cát vệ sinh", "Cat litter")}</p>

</a>
</div>
<p className="text-center text-xs text-text-muted py-4">{l("Ảnh minh họa", "Illustrative image")}</p></section>);
}

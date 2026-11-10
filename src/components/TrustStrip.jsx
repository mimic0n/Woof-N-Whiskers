import DemoIcon from './home/DemoIcon';

export default function TrustStrip() {

return (<section className="pet-waypoint max-w-7xl mx-auto px-6 py-16">
<div className="paw-trail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-badge-cream flex-shrink-0 flex items-center justify-center text-brand">
<DemoIcon name="workspace_premium"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{"Thông tin dịch vụ minh bạch"}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{"Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ."}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-cta-soft flex-shrink-0 flex items-center justify-center text-cta">
<DemoIcon name="schedule"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{"Quan tâm đến từng thú cưng"}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{"Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ."}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-badge-cream flex-shrink-0 flex items-center justify-center text-brand">
<DemoIcon name="ac_unit"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{"Quy trình rõ ràng"}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{"Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ."}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-cta-soft flex-shrink-0 flex items-center justify-center text-cta">
<DemoIcon name="stethoscope"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{"Dễ dàng đặt lịch"}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{"Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ."}</p>
</div>
</div>
</div>
</section>);
}

import { useI18n } from '../i18n';
import DemoIcon from './home/DemoIcon';

export default function TrustStrip() {
 const { l } = useI18n();

return (<section className="pet-waypoint max-w-7xl mx-auto px-6 py-16">
<div className="paw-trail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-badge-cream flex-shrink-0 flex items-center justify-center text-brand">
<DemoIcon name="workspace_premium"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{l("Thông tin dịch vụ minh bạch", "Clear service information")}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{l("Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ.", "Explore the details and speak with our team before booking a service.")}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-cta-soft flex-shrink-0 flex items-center justify-center text-cta">
<DemoIcon name="schedule"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{l("Quan tâm đến từng thú cưng", "Attention to every pet")}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{l("Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ.", "Explore the details and speak with our team before booking a service.")}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-badge-cream flex-shrink-0 flex items-center justify-center text-brand">
<DemoIcon name="ac_unit"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{l("Quy trình rõ ràng", "A clear care process")}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{l("Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ.", "Explore the details and speak with our team before booking a service.")}</p>
</div>
</div>
<div className="bg-white p-6 rounded-2xl border border-border-subtle card-shadow-1 flex items-start gap-4">
<div className="w-12 h-12 rounded-full bg-cta-soft flex-shrink-0 flex items-center justify-center text-cta">
<DemoIcon name="stethoscope"/>
</div>
<div>
<h2 className="font-semibold text-text-main text-base">{l("Dễ dàng đặt lịch", "Easy booking")}</h2>
<p className="text-xs text-text-muted mt-1 leading-relaxed">{l("Tìm hiểu thông tin và trao đổi với shop trước khi sử dụng dịch vụ.", "Explore the details and speak with our team before booking a service.")}</p>
</div>
</div>
</div>
</section>);
}

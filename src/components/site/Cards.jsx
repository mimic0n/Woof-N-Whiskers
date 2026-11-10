import { Link } from "react-router-dom";
import { useI18n } from "../../i18n";
import { useState } from "react";
import { categories } from "../../data/data";
import { Modal } from "./UI";
import { services, trust, posts } from "../../data/data";
import { Button, Icon, ImageLabel } from "./UI";
function ServiceCards({ onSelect }) {
  const { t, l, money } = useI18n();
  return <div className="grid three service-cards">{services.map((s) => <article className="service-card" key={s.id}><ImageLabel src={s.image} alt={l(s.name)} /><div className="card-body"><p>{["01 DAYCARE", "02 OVERNIGHT BOARDING", "03 GROOMING"][services.indexOf(s)]}</p><h3>{l(s.name)}</h3><p>{l(s.description)}</p><ul className="service-includes">{s.includes.slice(0, 3).map((item, i) => <li key={i}><Icon name="check" width="15" height="15" />{l(item)}</li>)}</ul><strong className="price-chip">{t("from")} {money(s.price)} / {t(s.unit)}</strong><div className="card-actions"><Button to={`/dich-vu/${s.slug}/`} secondary>{t("detail")}</Button>{onSelect ? <Button onClick={() => onSelect(s.id)}>{l("Ch\u1ECDn d\u1ECBch v\u1EE5", "Select service")}</Button> : <Button to={`/dat-lich/?service=${s.id}`}>{t("booking")}</Button>}</div></div></article>)}</div>;
}
function ProductPrice({ product: p }) {
  const { money, t } = useI18n();
  return <>{p.priceMax ? `${money(p.priceMin)} \u2013 ${money(p.priceMax)}` : `${t("from")} ${money(p.priceMin)}`}</>;
}
function ProductCard({ product: p }) {
  const { t, l } = useI18n();
  const [quick, setQuick] = useState(false);
  const to = `/cua-hang/san-pham/?id=${p.id}`;
  return <article className="product-card"><Link to={to} className="product-image"><ImageLabel src={p.image} alt={l(p.name)} /></Link><div className="card-body"><small>{l(categories.find((c) => c[0] === p.category)?.[1])}</small><h3><Link to={to}>{l(p.name)}</Link></h3><p className="product-price"><ProductPrice product={p} /></p><div className="product-actions"><Button to={to}>{l("Ch\u1ECDn", "Choose")}</Button><button className="text-link" onClick={() => setQuick(true)}>{l("Xem nhanh", "Quick view")}</button></div></div>{quick && <Modal title={l(p.name)} onClose={() => setQuick(false)}><ImageLabel src={p.image} alt={l(p.name)} /><p className="product-price"><ProductPrice product={p} /></p><Button to={to}>{t("detail")}</Button></Modal>}</article>;
}
function TrustStrip() {
  const { l } = useI18n();
  return <ul className="trust-strip">{trust.map((item, i) => <li key={i}><Icon name={["info", "heart", "check", "calendar"][i]} /><span>{l(item)}</span></li>)}</ul>;
}
function BlogCards() {
  const { l } = useI18n();
  return <div className="grid three blog-cards">{posts.map((p) => <article key={p.id}><ImageLabel src={p.image} alt={l(p.title)} /><div className="card-body"><span className="tag">{p.tag}</span><h3><Link to={`/blog/${p.id}/`}>{l(p.title)}</Link></h3><p className="subtle small">{p.minutes} {l("ph\xFAt \u0111\u1ECDc", "min read")}</p><Link className="text-link" to={`/blog/${p.id}/`}>{l("\u0110\u1ECDc b\xE0i vi\u1EBFt", "Read article")} →</Link></div></article>)}</div>;
}
function FinalCTA() {
  const { l, t } = useI18n();
  return <section className="container section"><div className="final-cta final-cta-photo"><h2>{l("B\u1EA1n \u0111\xE3 t\xECm \u0111\u01B0\u1EE3c d\u1ECBch v\u1EE5 ph\xF9 h\u1EE3p cho th\xFA c\u01B0ng?", "Found the right care for your pet?")}</h2><p>{l("Kh\xE1m ph\xE1 th\xF4ng tin chi ti\u1EBFt v\xE0 g\u1EEDi y\xEAu c\u1EA7u \u0111\u1EB7t l\u1ECBch ngay h\xF4m nay.", "Explore the details and send a booking request today.")}</p><div className="actions"><Button to="/dat-lich/">{t("book")}</Button><Button to="/cua-hang/" secondary>{l("Kh\xE1m ph\xE1 c\u1EEDa h\xE0ng", "Explore the shop")}</Button></div></div></section>;
}
export {
  BlogCards,
  FinalCTA,
  ProductCard,
  ProductPrice,
  ServiceCards,
  TrustStrip
};

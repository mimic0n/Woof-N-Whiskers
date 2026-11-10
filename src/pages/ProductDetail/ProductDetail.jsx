import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, categories } from "../../data/data";
import { useI18n } from "../../i18n";
import { Button, Empty, ImageLabel, NumberInput } from "../../components/site/UI";
import { ProductCard, ProductPrice } from "../../components/site/Cards";
import Meta from "../../components/site/Meta";
import AddToCartButton from "../../components/site/AddToCartButton";
function ProductDetail() {
  const { l } = useI18n();
  const [params] = useSearchParams();
  const p = products.find((p2) => p2.id === params.get("id"));
  return p ? <Detail key={p.id} product={p} /> : <div className="container section"><h1>{l("Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m", "Product not found")}</h1><Empty /></div>;
}
function Detail({ product: p }) {
  const { t, l } = useI18n();
  const [quantity, setQuantity] = useState(1), [variant, setVariant] = useState(""), [tab, setTab] = useState("info"), [image, setImage] = useState(0);
  return <div className="container section"><Meta title={p.name} /><nav aria-label={l("\u0110\u01B0\u1EDDng d\u1EABn s\u1EA3n ph\u1EA9m", "Product breadcrumb")}><Link to="/cua-hang/">{t("shop")}</Link> › {l(categories.find((c) => c[0] === p.category)?.[1])} › {l(p.name)}</nav><div className="product-detail"><div><ImageLabel src={p.images[image]} alt={l(p.name)} className="detail-image" /><div className="thumbnails">{p.images.map((src, i) => <button key={src} aria-label={`${l("\u1EA2nh s\u1EA3n ph\u1EA9m", "Product image")} ${i + 1}`} aria-pressed={image === i} onClick={() => setImage(i)}><ImageLabel src={src} alt={l(p.name)} /></button>)}</div></div><div className="product-info"><small>{l(categories.find((c) => c[0] === p.category)?.[1])}</small><h1>{l(p.name)}</h1><p className="product-price large"><ProductPrice product={p} /></p><label htmlFor="product-variant">{l("Bi\u1EBFn th\u1EC3", "Variant")}</label><select id="product-variant" value={variant} onChange={(e) => setVariant(e.target.value)}><option value="">{l("Ch\u1ECDn quy c\xE1ch", "Choose a size")}</option>{p.variants.map((v) => <option key={v.id} value={v.id} disabled={v.needsOwnerConfirm}>{l(v.label)}</option>)}</select><p>{l("Li\xEAn h\u1EC7 shop \u0111\u1EC3 ch\u1ECDn quy c\xE1ch v\xE0 x\xE1c nh\u1EADn gi\xE1 tr\u01B0\u1EDBc khi \u0111\u1EB7t h\xE0ng.", "Contact the shop to choose a size and confirm its price before ordering.")}</p><div className="purchase-actions"><NumberInput label={t("quantity")} value={quantity} max={99} onChange={setQuantity} /><AddToCartButton productId={p.id} quantity={quantity} variant={variant} disabled={!variant} /><Button secondary to="/#lien-he">{t("contact")}</Button></div></div></div><section className="section"><div role="tablist" className="tabs" aria-label={l("Th\xF4ng tin s\u1EA3n ph\u1EA9m", "Product information")}>{[["info", l("Th\xF4ng tin", "Information")], ["specs", l("Th\xF4ng s\u1ED1", "Specifications")], ["reviews", l("\u0110\xE1nh gi\xE1", "Reviews")]].map(([key, label]) => <button id={`tab-${key}`} aria-controls="product-panel" key={key} role="tab" aria-selected={tab === key} tabIndex={tab === key ? 0 : -1} onClick={() => setTab(key)}>{label}</button>)}</div><div id="product-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="panel">{tab === "reviews" ? t("noReviews") : p[tab].length ? p[tab].map((item, i) => <p key={i}>{l(item)}</p>) : l("Vui l\xF2ng li\xEAn h\u1EC7 shop \u0111\u1EC3 bi\u1EBFt th\xF4ng tin chi ti\u1EBFt.", "Please contact the shop for details.")}</div></section><section><h2>{l("S\u1EA3n ph\u1EA9m g\u1EE3i \xFD", "Related products")}</h2><div className="product-grid">{products.filter((x) => x.id !== p.id && x.species === p.species).slice(0, 4).map((x) => <ProductCard key={x.id} product={x} />)}</div></section></div>;
}
export {
  ProductDetail as default
};

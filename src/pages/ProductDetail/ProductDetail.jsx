import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/data';
import { useI18n } from '../../i18n';
import { Button, Empty, ImageLabel, NumberInput } from '../../components/site/UI';
import { ProductCard } from '../../components/site/Cards';
import Meta from '../../components/site/Meta';
import AddToCartButton from '../../components/site/AddToCartButton';
import './product-detail.css';

export default function ProductDetail() {
  const { l } = useI18n();
  const [params] = useSearchParams();
  const product = products.find(p => p.id === params.get('id'));
  return product ? <Detail key={product.id} product={product} /> : <div className="container section"><h1>{l('Không tìm thấy sản phẩm', 'Product not found')}</h1><Empty /></div>;
}

function Detail({ product: p }) {
  const { t, l, money } = useI18n();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(p.variants[0].id);
  const [tab, setTab] = useState('info');
  const [image, setImage] = useState(0);
  const selected = p.variants.find(v => v.id === variant);
  const priceLabel = v => Number.isFinite(v.price) ? money(v.price) : l('Liên hệ', 'Contact us');
  const tabs = [['info', l('Mô tả sản phẩm', 'Description')], ['specs', l('Thông số & giá', 'Sizes & prices')], ['reviews', l('Đánh giá', 'Reviews')]];
  function switchTab(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setTab(tabs[next][0]);
    document.getElementById(`tab-${tabs[next][0]}`).focus();
  }
  return <div className="container section product-detail-page">
    <Meta title={p.name} description={p.description} />
    <div className="product-detail">
      <div>
        <ImageLabel src={p.images[image]} alt={l(p.name)} className="detail-image" />
        <div className="thumbnails">{p.images.map((src, i) => <button key={src} aria-label={`${l('Ảnh sản phẩm', 'Product image')} ${i + 1}`} aria-pressed={image === i} onClick={() => setImage(i)}><ImageLabel src={src} alt={l(p.name)} /></button>)}</div>
      </div>
      <div className="product-info">
        <h1>{l(p.name)}</h1>
        <p className="product-introduction">{p.description}</p>
        <p className="product-price large" aria-live="polite">{priceLabel(selected)} <span className="variant-price-size">/ {l(selected.label)}</span></p>
        <label htmlFor="product-variant">{l('Quy cách / Khối lượng', 'Pack size / Weight')}</label>
        <select id="product-variant" value={variant} onChange={e => setVariant(e.target.value)}>{p.variants.map(v => <option key={v.id} value={v.id}>{l(v.label)} — {priceLabel(v)}</option>)}</select>
        {selected.needsOwnerConfirm && <p role="status">{l('Vui lòng liên hệ shop để xác nhận giá của quy cách này trước khi đặt hàng.', 'Please contact the shop to confirm the price of this size before ordering.')}</p>}
        <div className="purchase-actions">
          <NumberInput label={t('quantity')} value={quantity} max={99} onChange={setQuantity} />
          <AddToCartButton productId={p.id} quantity={quantity} variant={variant} disabled={selected.needsOwnerConfirm || !Number.isFinite(selected.price)} />
          <Button secondary to="/lien-he/">{t('contact')}</Button>
        </div>
      </div>
    </div>
    <section className="section">
      <div role="tablist" className="tabs" aria-label={l('Thông tin sản phẩm', 'Product information')}>{tabs.map(([key, label], index) => <button id={`tab-${key}`} aria-controls="product-panel" key={key} role="tab" aria-selected={tab === key} tabIndex={tab === key ? 0 : -1} onKeyDown={event => switchTab(event, index)} onClick={() => setTab(key)}>{label}</button>)}</div>
      <div id="product-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${tab}`} className="panel product-details-content">
        {tab === 'reviews' ? t('noReviews') : tab === 'info' ? p.sections.map(section => <section className="product-description-section" key={section.title}><h2>{section.title}</h2>{section.title === 'Đặc điểm nổi bật' ? <ul>{section.paragraphs.map(item => <li key={item}>{item}</li>)}</ul> : section.paragraphs.map(item => <p key={item}>{item}</p>)}</section>) : <table className="product-specifications"><caption>{l('Quy cách và giá bán', 'Pack sizes and prices')}</caption><thead><tr><th scope="col">{l('Khối lượng / Quy cách', 'Weight / Pack size')}</th><th scope="col">{l('Giá bán', 'Price')}</th></tr></thead><tbody>{p.variants.map(v => <tr key={v.id} data-selected={variant === v.id || undefined}><th scope="row">{l(v.label)}</th><td>{priceLabel(v)}</td></tr>)}</tbody></table>}
      </div>
    </section>
    <section><h2>{l('Sản phẩm gợi ý', 'Related products')}</h2><div className="product-grid">{products.filter(x => x.id !== p.id && x.species === p.species).slice(0, 4).map(x => <ProductCard key={x.id} product={x} />)}</div></section>
  </div>;
}

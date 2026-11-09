import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { Icon } from './UI';

export default function AddToCartButton({ productId, quantity = 1, variant = 'standard', disabled = false, className = 'button' }) {
 const { addCart } = useApp();
 const { t, l } = useI18n();
 const [added, setAdded] = useState(false);
 const timer = useRef(null);
 useEffect(() => () => clearTimeout(timer.current), []);
 function add() {
  if (!addCart(productId, quantity, variant)) return;
  setAdded(true);
  clearTimeout(timer.current);
  timer.current = setTimeout(() => setAdded(false), 1400);
 }
 return <button type="button" className={`${className} add-cart-button`} data-added={added || undefined} disabled={disabled || added} onClick={add}>
  <Icon key={added ? 'check' : 'cart'} name={added ? 'check' : 'cart'}/>
  <span aria-live="polite">{added ? l('Đã thêm', 'Added') : t('add')}</span>
 </button>;
}

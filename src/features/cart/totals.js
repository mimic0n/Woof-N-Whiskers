import { products } from '../../data/data';
export function cartRows(cart) {
 return cart.flatMap(item => {
  const product = products.find(p => p.id === item.productId);
  const variant = product?.variants.find(v => v.id === item.variant);
  if (!variant || variant.needsOwnerConfirm || !Number.isFinite(variant.price) || !Number.isInteger(item.quantity) || item.quantity < 1) return [];
  return [{...item, variantLabel:variant.label, product:{...product, price:variant.price}}];
 });
}
export function cartTotals(cart){const rows=cartRows(cart);const subtotal=rows.reduce((s,r)=>s+r.product.price*r.quantity,0);const shipping=subtotal>0&&subtotal<500000?30000:0;return {rows,subtotal,shipping,total:subtotal+shipping};}

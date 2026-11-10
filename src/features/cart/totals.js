import { products } from '../../data/data';
export function cartRows(cart){return cart.map(item=>({...item,product:products.find(p=>p.id===item.productId)})).filter(r=>r.product&&Number.isInteger(r.quantity)&&r.quantity>0);}
export function cartTotals(cart){const rows=cartRows(cart);const subtotal=rows.reduce((s,r)=>s+r.product.price*r.quantity,0);const shipping=subtotal>0&&subtotal<500000?30000:0;return {rows,subtotal,shipping,total:subtotal+shipping};}

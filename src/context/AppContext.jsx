import { createContext, useContext, useRef, useState, useEffect } from 'react';
import { readState, writeState } from '../utils/store';
import { products } from '../data/data';
const Context = createContext(null);
export function AppProvider({ children }) {
 const [state, setState] = useState(readState);
 const current = useRef(state);
 const [toast, setToast] = useState(null);
 const timer = useRef(null);
 useEffect(() => () => clearTimeout(timer.current), []);
 function notify(vi,en, action) { clearTimeout(timer.current); setToast({vi,en,action}); timer.current=setTimeout(()=>setToast(null),action?5000:6000); }
 function commit(change) {
  const next = change(current.current);
  writeState(next); current.current=next; setState(next); return next;
 }
 const user = state.users.find(u=>u.id===state.session) || null;
 function addCart(productId, quantity=1, variant='standard') {
  const product = products.find(p=>p.id===productId);
  if (!product || product.stock<1) return false;
  let added=false;
  try {
   commit(s=>{
    const cart=s.cart.map(i=>({...i})); const item=cart.find(i=>i.productId===productId && i.variant===variant);
    const total=cart.filter(i=>i.productId===productId).reduce((a,i)=>a+i.quantity,0);
    if(total+quantity>product.stock) return s;
    if(item)item.quantity+=quantity;else cart.push({productId,quantity,variant}); added=true;
    return {...s,cart};
   });
   if(added)notify('Đã thêm sản phẩm vào giỏ.','Product added to your cart.'); else notify('Số lượng vượt tồn kho demo. Hãy giảm số lượng.','Quantity exceeds demo stock. Please reduce it.');
  } catch { notify('Không lưu được giỏ hàng. Cho phép lưu trữ rồi thử lại.','Unable to save your cart. Enable browser storage and try again.'); }
  return added;
 }
 return <Context.Provider value={{state,user,commit,notify,toast,setToast,addCart}}>{children}</Context.Provider>;
}
export function useApp() { return useContext(Context); }

"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LuShoppingCart, LuCheck, LuStar } from "react-icons/lu";
import products from "./flash-products.json";

type Product = (typeof products)[number];
export default function CardDemo({ product = products[0], className }: {
  product?: Product; className?: string;
}) {
  const [added, setAdded] = useState(false);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function addToCart(event: MouseEvent<HTMLButtonElement>) {
    if (busy.current) return;
    busy.current = true;
    setAdded(true);
    document.dispatchEvent(new CustomEvent("wnw:add-to-cart", { detail: { button: event.currentTarget } }));
    timer.current = setTimeout(() => { busy.current = false; setAdded(false); }, 1300);
  }
  return (
    <div className="max-w-xs w-full mx-auto">
      <article aria-label={product.title}
        className={cn(
          "group w-full overflow-hidden relative card h-[30rem] rounded-md mx-auto flex flex-col border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}>
        <div className="relative h-48 w-full shrink-0 bg-white p-4">
          <img src={product.image} alt={product.imageAlt} width={640} height={480}
            loading="lazy" decoding="async" className="h-full w-full object-contain" />
          {product.imageNote && <span className="absolute inset-x-0 bottom-0 text-center text-[10px] text-neutral-600">{product.imageNote}</span>}
        </div>
        <span className="absolute top-4 left-4 z-10 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{product.discount}</span>
        <div className="relative flex min-h-0 flex-1 flex-col p-4 text-neutral-900 dark:text-gray-50">
          <p className="mb-1 text-xs text-neutral-600 dark:text-neutral-300">Thương hiệu: {product.brand}</p>
          <h3 className="font-bold text-xl relative leading-snug">{product.title}</h3>
          <div className="font-normal text-base relative mt-auto py-3">
            <div className="mb-2 flex items-center gap-1 text-xs" aria-label={`${product.rating} trên 5 sao, ${product.reviews} đánh giá`}>
              <LuStar aria-hidden="true" className="h-3 w-3 fill-amber-300 text-amber-300" />
              <span>{product.rating}/5 ({product.reviews})</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold">{product.price}</span>
              <del className="text-xs text-neutral-600 dark:text-neutral-300">{product.originalPrice}</del>
            </div>
          </div>
          <button type="button" onClick={addToCart} aria-label={`Thêm ${product.title} vào giỏ`} aria-disabled={added}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            {added ? <LuCheck aria-hidden="true" className="h-4 w-4" /> : <LuShoppingCart aria-hidden="true" className="h-4 w-4" />}
            <span aria-live="polite">{added ? "Đã thêm" : "Thêm vào giỏ"}</span>
          </button>
        </div>
      </article>
    </div>
  );
}

export function FlashSaleCards() {
  useEffect(() => {
    document.getElementById("flash-sale")?.classList.add("cards-ready");
    return () => document.getElementById("flash-sale")?.classList.remove("cards-ready");
  }, []);
  return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {products.map(product => <CardDemo key={product.title} product={product} />)}
  </div>;
}

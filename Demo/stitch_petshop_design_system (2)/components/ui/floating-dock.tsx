"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence, type MotionValue, motion, useMotionValue,
  useSpring, useTransform, useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Also respond when the OS preference changes while the page is open.
function useDockReducedMotion() {
  const initial = useReducedMotion();
  const [reduce, setReduce] = useState(Boolean(initial));
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return reduce;
}

type Item = { title: string; icon: ReactNode; href: string };
type DockProps = { items: Item[]; desktopClassName?: string; mobileClassName?: string };

export const FloatingDock = ({ items, desktopClassName, mobileClassName }: DockProps) => (
  <>
    <FloatingDockDesktop items={items} className={desktopClassName} />
    <FloatingDockMobile items={items} className={mobileClassName} />
  </>
);

const FloatingDockMobile = ({ items, className }: { items: Item[]; className?: string }) => {
  const [open, setOpen] = useState(false);
  const reduce = useDockReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div ref={ref} className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-dock-links" layoutId={reduce ? undefined : "nav"}
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2">
            {items.map((item, idx) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : 10, transition: { delay: reduce ? 0 : idx * 0.05 } }}
                transition={{ delay: reduce ? 0 : (items.length - 1 - idx) * 0.05, ...(reduce ? { duration: 0.1 } : {}) }}>
                <a href={item.href} aria-label={item.title} title={item.title} onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900">
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button ref={toggle} type="button" aria-label={open ? "Đóng điều hướng" : "Mở điều hướng"}
        aria-expanded={open} aria-controls={open ? "mobile-dock-links" : undefined}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800">
        <IconLayoutNavbarCollapse aria-hidden="true" className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }: { items: Item[]; className?: string }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div onMouseMove={event => mouseX.set(event.clientX)} onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900", className)}>
      {items.map(item => <IconContainer mouseX={mouseX} key={item.title} {...item} />)}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }: Item & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useDockReducedMotion();
  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const options = { mass: 0.1, stiffness: 150, damping: 12 };
  const width = useSpring(widthTransform, options);
  const height = useSpring(heightTransform, options);
  const widthIcon = useSpring(widthTransformIcon, options);
  const heightIcon = useSpring(heightTransformIcon, options);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <a href={href} aria-label={title} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <motion.div ref={ref} style={{ width: reduce ? 40 : width, height: reduce ? 40 : height }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
        <AnimatePresence>
          {(hovered || focused) && (
            <motion.div initial={{ opacity: 0, y: reduce ? 0 : 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: reduce ? 0 : 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: reduce ? 20 : widthIcon, height: reduce ? 20 : heightIcon }}
          className="flex items-center justify-center">{icon}</motion.div>
      </motion.div>
    </a>
  );
}

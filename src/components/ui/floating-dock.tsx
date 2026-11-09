"use client";

import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useId, useRef, useState, type ReactNode } from 'react';

type DockItem = {
  title: string;
  icon: ReactNode;
  href: string;
  current?: boolean;
};

type FloatingDockProps = {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  mobileLabel?: string;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  mobileLabel = 'Open navigation',
}: FloatingDockProps) => (
  <MotionConfig reducedMotion="user">
    <FloatingDockDesktop items={items} className={desktopClassName} />
    <FloatingDockMobile items={items} className={mobileClassName} label={mobileLabel} />
  </MotionConfig>
);

const FloatingDockMobile = ({
  items,
  className,
  label,
}: {
  items: DockItem[];
  className?: string;
  label: string;
}) => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  return (
    <div
      data-dock-mobile
      className={cn('relative block md:hidden', className)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          event.currentTarget.querySelector('button')?.focus();
        }
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 10,
                  transition: { delay: reduceMotion ? 0 : idx * 0.05 },
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { delay: (items.length - 1 - idx) * 0.05 }
                }
              >
                <a
                  href={item.href}
                  key={item.title}
                  aria-label={item.title}
                  aria-current={item.current ? 'page' : undefined}
                  title={item.title}
                  className="dock-link flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(!open)}
        className="dock-toggle flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      data-dock-desktop
      onMouseMove={(event) => mouseX.set(reduceMotion ? Infinity : event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900',
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  current,
}: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="dock-link"
      aria-label={title}
      aria-current={current ? 'page' : undefined}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.div
        ref={ref}
        style={{ width: reduceMotion ? 40 : width, height: reduceMotion ? 40 : height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="dock-disc relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 2, x: '-50%' }}
              transition={reduceMotion ? { duration: 0 } : undefined}
              className="dock-tooltip absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: reduceMotion ? 20 : widthIcon, height: reduceMotion ? 20 : heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

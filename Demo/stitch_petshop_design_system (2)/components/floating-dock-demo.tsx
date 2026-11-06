import { FloatingDock } from "@/components/ui/floating-dock";
import { IconShoppingBag, IconScissors, IconCalendarEvent, IconDiscount2, IconPaw } from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const iconClass = "h-full w-full text-neutral-500 dark:text-neutral-300";
  const links = [
    { title: "Sản Phẩm", icon: <IconShoppingBag className={iconClass} />, href: "#" },
    { title: "Dịch Vụ", icon: <IconScissors className={iconClass} />, href: "#services" },
    { title: "Đặt Lịch", icon: <IconCalendarEvent className={iconClass} />, href: "#booking-card" },
    { title: "Khuyến Mãi", icon: <IconDiscount2 className={iconClass} />, href: "#flash-sale" },
    { title: "Về Chúng Tôi", icon: <IconPaw className={iconClass} />, href: "#testimonials" },
  ];
  return <FloatingDock items={links}
    desktopClassName="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    mobileClassName="fixed right-5 bottom-5 z-50" />;
}

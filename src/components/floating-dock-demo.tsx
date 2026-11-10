import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconCalendarEvent,
  IconHome,
  IconMapPin,
  IconPaw,
  IconScissors,
  IconShoppingBag,
  IconUserCircle,
} from '@tabler/icons-react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useI18n } from '../i18n';
import type { MouseEvent } from 'react';

type NavigationTranslations = { t: (key: string) => string; l: (vi: string, en: string) => string };

export default function FloatingDockDemo() {
  const { t, l } = useI18n() as unknown as NavigationTranslations;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = [
    { title: t('home'), icon: <IconHome className="h-full w-full text-current" />, href: '/' },
    { title: t('shop'), icon: <IconShoppingBag className="h-full w-full text-current" />, href: '/cua-hang/' },
    { title: t('services'), icon: <IconScissors className="h-full w-full text-current" />, href: '/dich-vu/' },
    { title: t('about'), icon: <IconPaw className="h-full w-full text-current" />, href: '/gioi-thieu/' },
    { title: t('booking'), icon: <IconCalendarEvent className="h-full w-full text-current" />, href: '/dat-lich/' },
    { title: t('account'), icon: <IconUserCircle className="h-full w-full text-current" />, href: '/tai-khoan/' },
    { title: t('contact'), icon: <IconMapPin className="h-full w-full text-current" />, href: '/#lien-he' },
  ].map((item) => ({
    ...item,
    current: item.href === '/' ? pathname === '/' : pathname.startsWith(item.href),
  }));

  function navigateLocally(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const destination = new URL(anchor.href);
    if (destination.origin !== location.origin) return;
    event.preventDefault();
    navigate(destination.pathname + destination.search + destination.hash);
  }

  return (
    <nav
      aria-label={l('Điều hướng chính', 'Main navigation')}
      data-floating-dock
      onClick={navigateLocally}
      className="[&_a]:no-underline [&_button]:border-0 [&_button]:p-0"
    >
      <FloatingDock
        key={pathname}
        items={links}
        desktopClassName="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        mobileClassName="fixed right-5 bottom-5 z-40"
        mobileLabel={l('Mở điều hướng', 'Open navigation')}
      />
    </nav>
  );
}

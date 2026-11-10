import BackgroundScene from '../home/BackgroundScene';

const themes = {
 'gioi-thieu': ['stories', 'paw'],
 'dich-vu': ['care', 'collar'],
 'dat-lich': ['booking', 'paw'],
 'tai-khoan': ['booking', 'paw'],
 'cua-hang': ['sale', 'ball'],
 'gio-hang': ['sale', 'ball'],
 'thanh-toan': ['booking', 'paw'],
 'tim-kiem': ['sale', 'ball'],
 'faq': ['stories', 'paw'],
 'lien-he': ['booking', 'collar'],
 'blog': ['stories', 'paw'],
 'chinh-sach': ['stories', 'collar'],
};

export default function RouteBackground({ page, children }) {
 const [tone, decoration] = themes[page] || ['stories', 'paw'];
 return <div className="background-system route-background" data-background-page={page}>
  <BackgroundScene tone={tone} decoration={decoration} transition layered>
   {children}
   <svg className="route-background-end" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 36C330 0 550 64 880 32S1220 8 1440 24V60H0Z"/></svg>
  </BackgroundScene>
 </div>;
}

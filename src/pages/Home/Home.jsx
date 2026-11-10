import { useI18n } from "../../i18n";
import Hero from "../../components/Hero";
import CustomerReviews from "../../components/home/CustomerReviews";
import BackgroundScene from "../../components/home/BackgroundScene";
import HomeBooking from "../../components/site/HomeBooking";
import Meta from "../../components/site/Meta";
import { AboutIntro, CoreValues } from "../../components/site/RefixBlocks";
import { BlogCards, FinalCTA, ProductCard, ServiceCards } from "../../components/site/Cards";
import { Accordion } from "../../components/site/UI";
import { Link } from "react-router-dom";
import { faqs, products } from "../../data/data";
import Contact from "../Contact/Contact";
import "../../styles/demo-home-generated.css";
import "../../styles/demo-home.css";
function Home() {
  const { l, t } = useI18n();
  return <div className="demo-home refix-home"><Meta title={["Ch\u0103m s\xF3c ch\xF3 m\xE8o t\u1EA1i \u0110\xE0 N\u1EB5ng", "Pet care in Da Nang"]} businessSchema /><BackgroundScene tone="intro"><Hero /></BackgroundScene><BackgroundScene tone="booking" decoration="paw" transition previous="var(--bg-ivory)"><HomeBooking /></BackgroundScene><BackgroundScene tone="stories" decoration="paw" transition previous="var(--bg-sky)"><section className="container section"><AboutIntro home /></section></BackgroundScene><BackgroundScene tone="care" decoration="collar" transition previous="#fcf5e9"><section className="container section"><h2>{l("Ba d\u1ECBch v\u1EE5 ch\u0103m s\xF3c ch\xEDnh", "Our three care services")}</h2><ServiceCards /></section></BackgroundScene><BackgroundScene tone="sale" decoration="ball" transition previous="var(--bg-care)"><section className="container section" id="featured-products"><h2>{l("S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt", "Featured products")}</h2><div className="product-grid">{products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}</div><Link to="/cua-hang/">{l("Xem t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m", "View all products")} →</Link></section></BackgroundScene><BackgroundScene tone="featured" transition previous="var(--bg-honey)"><CoreValues /></BackgroundScene><BackgroundScene tone="essentials"><CustomerReviews /></BackgroundScene><BackgroundScene tone="sale" decoration="ball" transition previous="#fff"><section className="container section"><h2>Pet Care Tips</h2><BlogCards /></section></BackgroundScene><BackgroundScene tone="featured" transition previous="var(--bg-honey)"><section className="container section"><h2>{t("faq")}</h2><Accordion items={faqs.slice(0, 5)} /></section><FinalCTA /></BackgroundScene><BackgroundScene tone="booking" decoration="collar" transition previous="var(--bg-ivory)"><Contact /></BackgroundScene></div>;
}
export {
  Home as default
};

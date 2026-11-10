import { websiteImages } from '../../data/website-images';
import { useI18n } from "../../i18n";
import { faqs } from "../../data/data";
import { Accordion, ImageLabel } from "../../components/site/UI";
import { FinalCTA, ServiceCards } from "../../components/site/Cards";
import { FamilySection, Spaces } from "../../components/site/RefixBlocks";
import Meta from "../../components/site/Meta";
function Services() {
  const { l, t } = useI18n();
  return <><div className="container section"><Meta title={["D\u1ECBch v\u1EE5 ch\u0103m s\xF3c th\xFA c\u01B0ng", "Pet care services"]} /><h1>{l("Ch\u0103m s\xF3c t\u1EADn t\xE2m cho ng\u01B0\u1EDDi b\u1EA1n b\u1ED1n ch\xE2n", "Thoughtful care for your four-legged friend")}</h1><ImageLabel className="wide-banner" src={websiteImages.servicesBanner} alt={l("Kh\xF4ng gian ch\u0103m s\xF3c th\xFA c\u01B0ng", "Pet care space")} /><section className="section"><h2>{t("services")}</h2><ServiceCards /></section><FamilySection /><Spaces /><section className="section"><h2>{t("faq")}</h2><Accordion items={faqs.filter((f) => f.group === "services").slice(0, 6)} /></section></div><FinalCTA /></>;
}
export {
  Services as default
};

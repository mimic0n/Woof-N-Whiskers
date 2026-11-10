import { useI18n } from "../../i18n";
import { ImageLabel } from "../../components/site/UI";
import { FinalCTA } from "../../components/site/Cards";
import { AboutIntro, CoreValues } from "../../components/site/RefixBlocks";
import ContactInfo from "../../components/site/ContactInfo";
import Meta from "../../components/site/Meta";
function About() {
  const { l } = useI18n();
  return <><div className="container section"><Meta title={["V\u1EC1 ch\xFAng t\xF4i", "About us"]} /><h1>{l("V\u1EC1 ch\xFAng t\xF4i", "About us")}</h1><ImageLabel className="wide-banner" src="/assets/real/banner-about.webp" alt={l("Kh\xF4ng gian Woof N\u2019 Whiskers", "Woof N\u2019 Whiskers space")} /><section className="section"><AboutIntro /></section></div><CoreValues /><section className="container section"><ContactInfo wide /></section><FinalCTA /></>;
}
export {
  About as default
};

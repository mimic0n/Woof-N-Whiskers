import { useState } from "react";
import { useI18n } from "../../i18n";
import { useApp } from "../../context/AppContext";
import { phoneValid } from "../../utils/validation";
import { uid } from "../../utils/store";
import { Button, Field } from "../../components/site/UI";
import ContactInfo from "../../components/site/ContactInfo";
const empty = { lastName: "", firstName: "", email: "", phone: "", petName: "", service: "", message: "" };
function Contact() {
  const { l, t } = useI18n();
  const { commit } = useApp();
  const [data, setData] = useState(empty), [file, setFile] = useState(null), [errors, setErrors] = useState({}), [done, setDone] = useState(false);
  const labels = { lastName: l("H\u1ECD", "Last name"), firstName: l("T\xEAn", "First name"), email: "Email", phone: t("phone"), petName: t("petName") };
  function error(key, value) {
    if (["lastName", "firstName", "email"].includes(key) && !value.trim()) return "required";
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "emailError";
    if (key === "phone" && value && !phoneValid(value)) return "phoneError";
    return "";
  }
  function fileError(f) {
    return f && (!["image/jpeg", "image/png", "application/pdf"].includes(f.type) || f.size > 5 * 1024 * 1024) ? "uploadError" : "";
  }
  async function submit(e) {
    e.preventDefault();
    const next = Object.fromEntries(Object.keys(data).map((k) => [k, error(k, data[k])]).filter(([, v]) => v));
    if (fileError(file)) next.record = "uploadError";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById("contact-" + Object.keys(next)[0])?.focus();
      return;
    }
    try {
      const record = file ? await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, type: file.type, data: reader.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }) : null;
      commit((s) => ({ ...s, callbacks: [...s.callbacks || [], { ...data, record, id: uid(), created: Date.now() }] }));
      setDone(true);
    } catch {
      setErrors({ form: "storageError" });
    }
  }
  return <section id="lien-he" className="container section"><h2 tabIndex="-1">{t("contact")}</h2><div className="contact-layout"><section className="panel"><h3>{l("C\xF9ng tr\xF2 chuy\u1EC7n v\u1EC1 th\xFA c\u01B0ng", "Let\u2019s Talk Pets")}</h3>{done ? <p role="status">{l("\u0110\xE3 nh\u1EADn y\xEAu c\u1EA7u, shop s\u1EBD li\xEAn h\u1EC7 l\u1EA1i v\u1EDBi b\u1EA1n.", "Request received. The shop will contact you.")}</p> : <form noValidate onSubmit={submit}><div className="form-grid">{Object.keys(labels).map((key) => <Field key={key} id={"contact-" + key} label={labels[key]} required={["lastName", "firstName", "email"].includes(key)} error={errors[key]} type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} value={data[key]} onBlur={() => setErrors((e) => ({ ...e, [key]: error(key, data[key]) }))} onChange={(e) => setData({ ...data, [key]: e.target.value })} />)}</div><Field id="contact-service" label={l("D\u1ECBch v\u1EE5 quan t\xE2m", "Service of interest")}><select id="contact-service" value={data.service} onChange={(e) => setData({ ...data, service: e.target.value })}><option value="">{l("Ch\u1ECDn d\u1ECBch v\u1EE5", "Choose a service")}</option>{[["boarding", "L\u01B0u tr\xFA ban \u0111\xEAm", "Overnight boarding"], ["daycare", "Ch\u0103m s\xF3c ban ng\xE0y", "Daycare"], ["grooming", "Ch\u0103m s\xF3c l\xF4ng & spa", "Grooming & spa"], ["food", "Th\u1EE9c \u0103n t\u01B0\u01A1i", "Fresh food"], ["pickup", "\u0110\u01B0a \u0111\xF3n", "Pickup and drop-off"]].map(([id, vi, en]) => <option key={id} value={id}>{l(vi, en)}</option>)}</select></Field><Field id="contact-record" label={l("T\u1EA3i l\xEAn s\u1ED5 ti\xEAm ph\xF2ng", "Upload vaccination record")} error={errors.record} hint="JPG / PNG / PDF · ≤ 5MB"><input id="contact-record" type="file" accept="image/jpeg,image/png,application/pdf" aria-invalid={!!errors.record} aria-describedby="contact-record-hint contact-record-error" onChange={(e) => {
    const f = e.target.files[0] || null;
    setFile(f);
    setErrors((old) => ({ ...old, record: fileError(f) }));
  }} /></Field><Field id="contact-message" label={l("Ghi ch\xFA th\xEAm", "Anything else we should know?")}><textarea id="contact-message" rows="4" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} /></Field>{errors.form && <p role="alert">{t(errors.form)}</p>}<Button type="submit">{l("Y\xEAu c\u1EA7u g\u1ECDi l\u1EA1i", "Request a callback")}</Button></form>}</section><ContactInfo /></div></section>;
}
export {
  Contact as default
};

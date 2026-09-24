import { useState, useEffect } from "react";
import { COUNTRIES, TYPES, STATUS } from "./data.js";

const EMPTY = { company: "", name: "", website: "", phone: "", email: "", city: "", score: "", issues: "" };

function useStored(key, init) {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

const hostOf = (v) => {
  v = v.trim();
  if (!v) return "";
  try { return new URL(/^https?:/i.test(v) ? v : "https://" + v).hostname.replace(/^www\./, ""); } catch { return ""; }
};
const Ext = ({ href, children, alt }) => (
  <a className={"btn sm" + (alt ? " alt" : "")} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);
const q = encodeURIComponent;

function makePitch(f) {
  const n = f.name.trim() || "there", c = f.company.trim() || "your company";
  return `Hi ${n},

I came across ${c} and took a quick look at your website${f.score ? `. On mobile it scores ${f.score}/100 for speed` : ""}${f.issues ? `. What I noticed: ${f.issues}` : ""}.

A slow or outdated site costs you customers who find you on Google and leave before it loads. I build fast, modern, mobile-friendly websites (Next.js) that turn visitors into calls and bookings.

Would you like a free one-page audit and a quick redesign preview of your homepage? No obligation.

Best regards,
Zohaib
Portfolio: zohaib-portfolio-nu.vercel.app`;
}

export default function App() {
  const [country, setCountry] = useState("Germany");
  const [type, setType] = useState("restaurant");
  const [custom, setCustom] = useState("");
  const [picked, setPicked] = useState({ Berlin: true });
  const [url, setUrl] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [pitchEdit, setPitchEdit] = useState(null);
  const [leads, setLeads] = useStored("leads", []);
  const [msg, setMsg] = useState("");

  const cities = COUNTRIES[country];
  const kw = type === "__custom" ? custom.trim() || "business" : type;
  const host = hostOf(url);
  const pitch = pitchEdit ?? makePitch(form);

  const setField = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setPitchEdit(null); };
  const changeCountry = (c) => { setCountry(c); setPicked({ [COUNTRIES[c][0]]: true }); };
  const changeUrl = (v) => { setUrl(v); const h = hostOf(v); if (h && !form.website) setForm({ ...form, website: h }); };

  const save = () => {
    if (!form.company.trim()) return setMsg("Company ka naam likho.");
    setLeads([{ ...form, status: STATUS[0] }, ...leads]);
    setForm(EMPTY); setPitchEdit(null); setMsg("Lead save ho gayi.");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(pitch); setMsg("Pitch copy ho gaya."); }
    catch { setMsg("Copy nahi hua, text select karke manually copy karo."); }
  };
  const exportCsv = () => {
    if (!leads.length) return setMsg("Pehle koi lead save karo.");
    const cols = ["company", "name", "website", "phone", "email", "city", "score", "issues", "status"];
    const cell = (v) => { v = String(v ?? ""); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
    const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => cell(l[c])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "leads.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const setStatus = (i, s) => setLeads(leads.map((l, j) => (j === i ? { ...l, status: s } : l)));
  const remove = (i) => setLeads(leads.filter((_, j) => j !== i));

  const audit = host && [
    ["PageSpeed", `https://pagespeed.web.dev/analysis?url=${q("https://" + host)}`],
    ["GTmetrix", `https://gtmetrix.com/?url=${q("https://" + host)}`],
    ["SSL check", `https://www.ssllabs.com/ssltest/analyze.html?d=${q(host)}`],
    ["Accessibility (WAVE)", `https://wave.webaim.org/report#/https://${host}`],
    ["Tech stack", `https://builtwith.com/${q(host)}`],
    ["Impressum / contact", `https://www.google.com/search?q=${q(`site:${host} impressum OR contact OR kontakt`)}`],
    ["Website kholo", `https://${host}`],
  ];

  return (
    <main>
      <h1>Europe Business Lead Finder</h1>
      <p className="sub">Local businesses dhoondo, unki website audit karo, aur leads track karo.</p>

      <section>
        <h2>1. Businesses dhoondo (Google Maps)</h2>
        <label htmlFor="country">Country</label>
        <select id="country" value={country} onChange={(e) => changeCountry(e.target.value)}>
          {Object.keys(COUNTRIES).map((c) => <option key={c}>{c}</option>)}
        </select>
        <label htmlFor="type">Business type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
          <option value="__custom">Apni type likho...</option>
        </select>
        {type === "__custom" && (
          <input style={{ marginTop: 8 }} value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="jaise: florist, bakery" />
        )}
        <label>Cities</label>
        <div className="chips">
          {cities.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={!!picked[c]} onClick={() => setPicked({ ...picked, [c]: !picked[c] })}>{c}</button>
          ))}
        </div>
        {cities.filter((c) => picked[c]).map((c) => (
          <div className="res" key={c}>
            <b>{kw} in {c}</b>
            <div className="acts">
              <Ext href={`https://www.google.com/maps/search/${q(`${kw} ${c} ${country}`)}`}>Maps kholo</Ext>
              <Ext alt href={`https://www.google.com/search?q=${q(`${kw} ${c} ${country} contact`)}`}>Google search</Ext>
            </div>
          </div>
        ))}
        <p className="note">Maps mein business kholo: phone, address aur website wahan milti hai. Map zoom karke "Search this area" dabao to naye results aate hain.</p>
      </section>

      <section>
        <h2>2. Website audit</h2>
        <label htmlFor="url">Business ki website</label>
        <input id="url" value={url} onChange={(e) => changeUrl(e.target.value)} placeholder="example.de" inputMode="url" />
        <div className="links">
          {audit ? audit.map(([t, h]) => <Ext key={t} href={h}>{t}</Ext>) : <div className="empty">Website likho, tools ke links yahan aa jayenge.</div>}
        </div>
        <p className="note">Germany, Austria aur Switzerland ki sites par phone aur owner ka naam Impressum page par hota hai. Baaki countries mein Contact ya About page dekho.</p>
      </section>

      <section>
        <h2>3. Lead save karo aur pitch banao</h2>
        <div className="row">
          {[["company", "Company"], ["website", "Website"], ["phone", "Phone"], ["email", "Email"], ["city", "City / location"], ["score", "Mobile speed score (0-100)"], ["name", "Contact ka naam"]].map(([k, l]) => (
            <div key={k}><label htmlFor={"f" + k}>{l}</label><input id={"f" + k} value={form[k]} onChange={setField(k)} /></div>
          ))}
        </div>
        <label htmlFor="issues">Main issues (audit mein jo mile)</label>
        <input id="issues" value={form.issues} onChange={setField("issues")} placeholder="slow load, not mobile friendly, no HTTPS, no online booking" />
        <label htmlFor="pitch">Pitch message (English, edit kar sakte ho)</label>
        <textarea id="pitch" value={pitch} onChange={(e) => setPitchEdit(e.target.value)} />
        <div className="links">
          <button className="btn" onClick={save}>Lead save karo</button>
          <button className="btn alt" onClick={copy}>Pitch copy karo</button>
        </div>
        <p className="note" role="status">{msg}</p>
      </section>

      <section>
        <h2>Saved leads</h2>
        <div className="scroll">
          {leads.length === 0 ? <div className="empty">Abhi koi lead save nahi hui.</div> : (
            <table>
              <thead><tr>{["Company", "Website", "Phone", "Email", "City", "Score", "Status", ""].map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i}>
                    <td>{l.company}</td>
                    <td>{l.website && <a href={"https://" + l.website.replace(/^https?:\/\//, "")} target="_blank" rel="noopener noreferrer">{l.website}</a>}</td>
                    <td>{l.phone}</td><td>{l.email}</td><td>{l.city}</td><td>{l.score}</td>
                    <td><select value={l.status} onChange={(e) => setStatus(i, e.target.value)}>{STATUS.map((s) => <option key={s}>{s}</option>)}</select></td>
                    <td><button className="btn sm alt" onClick={() => remove(i)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="links">
          <button className="btn alt" onClick={exportCsv}>CSV download</button>
          <button className="btn alt" onClick={() => leads.length && window.confirm("Saari leads delete karni hain?") && setLeads([])}>Sab delete karo</button>
        </div>
        <p className="note">Leads sirf is browser mein save hoti hain. CSV download karte rehna.</p>
      </section>
    </main>
  );
}

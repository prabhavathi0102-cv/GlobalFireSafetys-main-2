import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { submitEnquiry } from "@/lib/enquiry.functions";
import {
  Flame, Shield, Siren, Droplets, HardHat, DoorClosed, CheckCircle2,
  Phone, Mail, MapPin, ArrowRight, Award, Users, Wrench, Building2, Send,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import hero from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import fireAlarm from "@/assets/fire-alarm.jpg";
import extinguishers from "@/assets/extinguishers.jpg";
import hydrant from "@/assets/hydrant.jpg";
import ppe from "@/assets/ppe.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Global Safety Enterprises | Fire & Safety Solutions in Chennai, Coimbatore, Tirupur" },
      { name: "description", content: "ISO 9001:2015 certified provider of fire extinguishers, fire alarms, hydrant systems, sprinklers and PPE. Trusted by Apollo, ITC, Foxconn, Bharat Petroleum and more." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Flame, title: "Fire Extinguishers", desc: "ABC, CO2, Water-Foam, Clean Agent, Kitchen & Modular extinguishers in all capacities — portable & trolley mounted." },
  { icon: Siren, title: "Fire Alarm Systems", desc: "Conventional & Addressable panels, smoke/heat detectors, sounders, manual call points and PA systems." },
  { icon: Droplets, title: "Hydrant & Sprinkler", desc: "Design, supply and installation of fire hydrant networks, hose reels, UL-listed sprinklers and valves." },
  { icon: HardHat, title: "Personal Protection (PPE)", desc: "Safety helmets, harnesses, goggles, gloves, reflective jackets, eye-wash and signage." },
  { icon: DoorClosed, title: "Fire Rated Doors", desc: "120-minute fire rated single & double doors for industrial, commercial and high-rise applications." },
  { icon: Wrench, title: "AMC & Refilling", desc: "Annual maintenance contracts, refilling, hydro-testing and on-site service across South India." },
];

const products = [
  { img: fireAlarm, title: "Fire Alarm Panels", tags: ["2–128 Zone", "Addressable", "PA Systems"] },
  { img: extinguishers, title: "Fire Extinguishers", tags: ["ABC 2–9 Kg", "CO2 2–22.5 Kg", "Clean Agent"] },
  { img: hydrant, title: "Hydrants & Valves", tags: ["SS & GM", "Hose Reels", "Sprinklers"] },
  { img: ppe, title: "Safety Equipment", tags: ["Helmets", "Harness", "Reflective Gear"] },
];

const stats = [
  { v: "20+", l: "Years of Trust" },
  { v: "1500+", l: "Projects Delivered" },
  { v: "4", l: "Offices Pan-India" },
  { v: "24/7", l: "Emergency Support" },
];

const certs = ["ISO 9001:2015", "UL LISTED", "LPCB", "FM APPROVED", "CE"];

const clients = [
  "Apollo Hospitals", "ITC Fortune", "Alliance Group", "Hiranandani",
  "Kauvery Hospital", "Bharat Petroleum", "CMC Vellore", "SRM Institute",
  "TGV Group", "Ambica Empire", "Navin's", "Ponni Sugars",
  "Barefoot Resorts", "Foxconn",
];

const distributors = [
  "New Bharat Fire Protection", "Ravel", "Newage Fire Fighting",
  "Omex", "Safex Fire Services", "ASES Security",
  "Ronak", "Leader Valves", "Lehry Valves",
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <img src={hero} alt="Industrial fire protection systems" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-semibold tracking-widest uppercase">
              <Flame className="h-3.5 w-3.5 text-fire" /> Trusted Fire & Safety Partner Since 20+ Years
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Fire Safety and<br />
              <span className="text-fire">Security Solutions</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              End-to-end fire protection, detection and safety solutions for industrial, commercial and residential clients — engineered, installed and maintained by certified experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 gradient-fire text-white px-6 py-3.5 rounded-md font-semibold shadow-fire hover:opacity-90 transition">
                Request a Free Site Audit <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-white px-6 py-3.5 rounded-md font-semibold hover:bg-white/20 transition">
                Explore Services
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {certs.map((c) => (
                <span key={c} className="px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 rounded text-xs font-semibold tracking-wider">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card/95 backdrop-blur border border-border rounded-t-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.l} className="p-5 md:p-6 text-center">
                  <div className="font-display font-bold text-2xl md:text-3xl text-navy">{s.v}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img src={aboutImg} alt="Fire sprinkler installation" loading="lazy" width={1400} height={1000} className="rounded-xl shadow-elegant w-full h-auto object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-card border border-border rounded-xl p-5 shadow-elegant max-w-[220px]">
              <Award className="h-8 w-8 text-fire" />
              <div className="font-display font-bold text-lg mt-2">Certified Excellence</div>
              <div className="text-xs text-muted-foreground mt-1">ISO 9001:2015 | UL | LPCB | FM | CE</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest text-fire uppercase">About GSE</div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">A leader in the Fire Protection Industry.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Global Safety Enterprises is a leading fire protection company operating across Chennai, Tirupur, Bangalore and Coimbatore — providing complete solutions for fire fighting, detection and alarm systems. We specialize in planning, designing and erecting fire hydrant systems with a dedicated after-sales team.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { t: "Our Vision", d: "To provide quality services that exceed customer expectations." },
                { t: "Our Mission", d: "Build long-term relationships through innovation & advanced technology." },
                { t: "Core Values", d: "Respect, honesty and business ethics in every engagement." },
                { t: "Our Goal", d: "Become a key player in fire safety across the region." },
              ].map((b) => (
                <div key={b.t} className="p-4 rounded-lg border border-border bg-card">
                  <div className="font-semibold text-navy">{b.t}</div>
                  <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-widest text-fire uppercase">What We Do</div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Complete Fire & Safety Services</h2>
            <p className="mt-4 text-muted-foreground">From compact extinguishers to full-scale hydrant networks — we design, supply, install and maintain every component.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group p-7 bg-card border border-border rounded-xl hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-lg gradient-fire grid place-items-center shadow-fire">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-bold text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <a href="#contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fire hover:gap-2.5 transition-all">
                  Enquire <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-bold tracking-widest text-fire uppercase">Our Range</div>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Premium Products. Certified Brands.</h2>
            </div>
            <a href="#contact" className="text-sm font-semibold text-navy hover:text-fire inline-flex items-center gap-2">
              Request Catalogue <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.title} className="group overflow-hidden rounded-xl bg-card border border-border hover:shadow-elegant transition">
                <div className="aspect-[4/3] overflow-hidden bg-navy-deep">
                  <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] font-semibold px-2 py-1 bg-muted text-muted-foreground rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Authorised distributors */}
          <div className="mt-16 p-8 md:p-10 rounded-2xl gradient-navy text-white">
            <div className="flex items-center gap-3 text-fire text-xs font-bold tracking-widest uppercase">
              <Building2 className="h-4 w-4" /> Authorised Distributor
            </div>
            <h3 className="mt-2 text-2xl md:text-3xl font-bold">Partnered with the industry's most trusted brands</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {distributors.map((d) => (
                <span key={d} className="px-3 py-2 bg-white/10 border border-white/15 rounded text-sm">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold tracking-widest text-fire uppercase">Why Choose GSE</div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Engineered for Safety. Built on Trust.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, t: "Certified Quality", d: "ISO 9001:2015, UL Listed, LPCB, FM Approved & CE certified products." },
              { icon: Users, t: "Expert Team", d: "Dedicated technicians for installation, commissioning and after-sales service." },
              { icon: Wrench, t: "End-to-End Service", d: "Design, supply, install, refill and maintain — one accountable partner." },
              { icon: Award, t: "Industry Leaders", d: "Trusted by hospitals, hotels, refineries, IT parks and manufacturing giants." },
            ].map((c) => (
              <div key={c.t} className="p-6 bg-card border border-border rounded-xl">
                <c.icon className="h-9 w-9 text-fire" />
                <div className="mt-4 font-bold text-lg">{c.t}</div>
                <p className="text-sm text-muted-foreground mt-1.5">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold tracking-widest text-fire uppercase">Our Clients</div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Trusted by Industry Leaders</h2>
            <p className="mt-4 text-muted-foreground">Serving hospitals, hotels, manufacturing, energy, education and hospitality across India.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((c) => (
              <div key={c} className="p-5 bg-card border border-border rounded-lg text-center font-semibold text-navy hover:border-fire hover:shadow-fire transition">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-fire" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ready to safeguard your facility?</h2>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">Talk to our fire safety experts for a complimentary site audit and tailored solution.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="tel:+919840455557" className="inline-flex items-center gap-2 bg-white text-fire px-6 py-3.5 rounded-md font-bold hover:bg-white/95 transition">
              <Phone className="h-4 w-4" /> +91 98404 55557
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-navy-deep text-white px-6 py-3.5 rounded-md font-bold hover:bg-black/90 transition">
              Request Callback <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <Footer />
      <FloatingActions />
    </div>
  );
}

const PRODUCT_OPTIONS = [
  "Fire Extinguishers",
  "Fire Alarm Systems",
  "Hydrants & Valves",
  "Sprinkler Systems",
  "Fire Rated Doors",
  "Safety Equipment (PPE)",
  "AMC & Refilling",
  "Other",
];

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = useServerFn(submitEnquiry);
  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <div className="text-xs font-bold tracking-widest text-fire uppercase">Contact Us</div>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Let's secure your space.</h2>
          <p className="mt-4 text-muted-foreground max-w-md">Reach out for quotes, site audits, AMC contracts or product enquiries. Our team responds within one business day.</p>

          <div className="mt-8 space-y-5">
            <a href="tel:+919840455557" className="flex items-start gap-4 group">
              <div className="h-11 w-11 rounded-lg gradient-fire grid place-items-center shadow-fire shrink-0"><Phone className="h-5 w-5 text-white" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Call us</div>
                <div className="font-semibold group-hover:text-fire transition">+91 98404 55557, +91 98404 55558</div>
              </div>
            </a>
            <a href="mailto:info@globalsafetys.in" className="flex items-start gap-4 group">
              <div className="h-11 w-11 rounded-lg bg-navy grid place-items-center shrink-0"><Mail className="h-5 w-5 text-white" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="font-semibold group-hover:text-fire transition">info@globalsafetys.in</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-lg bg-navy grid place-items-center shrink-0"><MapPin className="h-5 w-5 text-white" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Head Office</div>
                <div className="font-semibold">No: 295, MKN Road, Alandur, Chennai 600016</div>
                <div className="text-sm text-muted-foreground mt-1">Branches: Coimbatore · Tirupur · Bangalore</div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const payload = {
              name: String(fd.get("name") ?? ""),
              phone: String(fd.get("phone") ?? ""),
              email: String(fd.get("email") ?? ""),
              company: String(fd.get("company") ?? ""),
              product: String(fd.get("product") ?? ""),
              message: String(fd.get("message") ?? ""),
            };
            setError(null);
            setSubmitting(true);
            try {
              await submit({ data: payload });
              setSent(true);
              form.reset();
              setTimeout(() => setSent(false), 4000);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Failed to submit enquiry");
            } finally {
              setSubmitting(false);
            }
          }}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-elegant"
        >
          <h3 className="font-display font-bold text-2xl">Send us a message</h3>
          <p className="text-sm text-muted-foreground mt-1">We'll get back within 24 hours.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field label="Full name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />
            <div className="sm:col-span-2"><Field label="Email" name="email" type="email" required /></div>
            <div className="sm:col-span-2"><Field label="Company / Site" name="company" /></div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Product interested<span className="text-fire">*</span></label>
              <select
                name="product"
                required
                defaultValue=""
                className="mt-1.5 w-full px-3 py-2.5 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select a product</option>
                {PRODUCT_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Your requirement</label>
              <textarea name="message" rows={4} required className="mt-1.5 w-full px-3 py-2.5 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 gradient-fire text-white py-3.5 rounded-md font-semibold shadow-fire hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" /> {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
          {sent && (
            <div className="mt-4 flex items-center gap-2 text-sm text-[oklch(0.55_0.17_150)]">
              <CheckCircle2 className="h-4 w-4" /> Thanks! We'll be in touch shortly.
            </div>
          )}
          {error && (
            <div className="mt-4 text-sm text-fire">{error}</div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}{required && <span className="text-fire">*</span>}</label>
      <input name={name} type={type} required={required} className="mt-1.5 w-full px-3 py-2.5 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

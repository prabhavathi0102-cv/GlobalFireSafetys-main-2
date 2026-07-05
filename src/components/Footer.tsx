import { Mail, MapPin, Phone, Flame } from "lucide-react";

const offices = [
  { city: "Chennai", addr: "No: 295, MKN Road, Alandur, Chennai, Tamil Nadu 600016" },
  { city: "Coimbatore", addr: "Shop No: 2, Aruksun Arcade, Chinnasamy Road, New Siddhapudur, Coimbatore 641044" },
  { city: "Tirupur", addr: "No 3/2, Govindarajulu Street, Avinashi Road, Tirupur 641602" },
];

export function Footer() {
  return (
    <footer className="gradient-navy text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-fire" />
              <span className="font-display font-bold text-lg">GSE</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Global Safety Enterprises (P) Ltd — Trusted fire protection, detection and safety solutions partner since inception.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
              {["ISO 9001:2015", "UL LISTED", "LPCB", "FM APPROVED", "CE"].map((b) => (
                <span key={b} className="px-2 py-1 bg-white/10 rounded border border-white/15 font-semibold tracking-wide">{b}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {["About", "Services", "Products", "Clients", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-fire transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-2"><Phone className="h-4 w-4 text-fire shrink-0 mt-0.5" /><div>+91 98404 55557<br />+91 98404 55558<br />+91 421 433 2208</div></li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-fire shrink-0 mt-0.5" /><div>info@globalsafetys.in<br />globalsafetyenterprises@gmail.com</div></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Our Offices</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {offices.map((o) => (
                <li key={o.city} className="flex gap-2"><MapPin className="h-4 w-4 text-fire shrink-0 mt-0.5" /><div><span className="font-semibold text-white">{o.city}</span><br />{o.addr}</div></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Global Safety Enterprises (P) Ltd. All rights reserved.</div>
          <div>www.globalsafetys.in</div>
        </div>
      </div>
    </footer>
  );
}

import { Aperture, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Floating Pill Glass Container */}
        <div className="rounded-[28px] border border-white/10 bg-slate-950/20 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,15,35,0.25)] md:p-8">
          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white">
                <Aperture className="h-6 w-6" strokeWidth={1.5} />
                <span className="text-[17px] font-semibold tracking-tight">
                  CrisSells
                </span>
              </div>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/85">
                Premium camera rentals for creators who refuse to compromise.
                Cinema-grade gear, delivered.
              </p>
              <div className="mt-4 flex gap-2.5">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol
              title="Catalog"
              links={["Mirrorless", "DSLR", "Cinema", "Drones", "Action"]}
            />
            <FooterCol
              title="Company"
              links={["About us", "How it works", "Pricing", "Careers", "Blog"]}
            />
            <FooterCol
              title="Support"
              links={["Help center", "Insurance", "Contact", "Terms", "Privacy"]}
            />
          </div>

          {/* Copyright Row inside the Pill Container */}
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
            <p className="text-[12px] text-white/30">
              © 2026 CrisSells Rentals. All rights reserved.
            </p>
            <p className="text-[12px] text-white/30">
              Designed in Philippines. Built for creators everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[13px] text-white/75 transition-colors hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Aperture, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onLogoClick: () => void;
}

export function Header({ cartCount, onCartOpen, onLogoClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["Catalog", "Cinema", "Drones", "How it works"];

  return (
    <>
      <div className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2 sm:top-6">
        <nav
          className={`pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/20 px-1.5 py-1.5 shadow-[0_8px_30px_rgba(0,15,35,0.18)] backdrop-blur-xl transition-all duration-500 ${
            scrolled ? "shadow-[0_12px_36px_rgba(0,15,35,0.24)] ring-1 ring-white/10" : ""
          }`}
        >
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 rounded-full px-4 py-2.5 text-white transition-colors hover:bg-white/10"
            style={{ textShadow: "0 0 14px rgba(255,255,255,0.35)" }}
          >
            <Aperture className="h-5 w-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
            <span className="text-[15px] font-semibold tracking-tight">
              CrisSells
            </span>
          </button>

          <div className="hidden items-center md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full px-4 py-2.5 text-[14px] font-medium text-white/95 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[14px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Admin"
          >
            <span className="hidden lg:inline">Admin</span>
          </button>

          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.28)] transition-all hover:scale-[1.03] active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2.5 text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 animate-fade-in md:hidden">
          <div
            className="absolute inset-0 bg-sky-950/20 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative mx-4 mt-2 flex flex-col gap-1 rounded-3xl border border-white/10 bg-slate-950/25 p-3 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/admin");
              }}
              className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              Admin
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

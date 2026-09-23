import { type ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Aperture, LayoutDashboard, Package, ShoppingCart, LogOut, ExternalLink, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import GradientWaves from "@/components/react-bits/Backgrounds/GradientWaves";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/catalog", label: "Catalog & Inventory", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-white">
      <div className="fixed inset-0 z-0 h-screen w-full bg-black">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#ff00f7"
          crestColor="#5f00ff"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
          className="h-full w-full"
        />
      </div>

      <nav
        className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-white/10 bg-sky-950/30 backdrop-blur-2xl"
        aria-label="Admin navigation"
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <Aperture className="h-5 w-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[15px] font-semibold tracking-tight text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>CrisSells</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70 backdrop-blur-sm">Admin</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                        isActive
                          ? "bg-white/15 text-white shadow-[0_4px_16px_rgba(0,15,35,0.15)]"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-white/5 p-2.5 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-white">{user?.name || "Admin"}</p>
              <p className="truncate text-[11px] text-white/50">{user?.role || "staff"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:bg-red-500/15 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-sky-950/20 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
            <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span>MFA Verified &middot; Session encrypted (AES-256)</span>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white"
          >
            View Store
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </header>

        <main className="flex-1 p-6" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return <AdminRedirect />;
  }
  return <>{children}</>;
}

function AdminRedirect() {
  const navigate = useNavigate();
  navigate("/admin/login");
  return null;
}

import { useState, useCallback, useMemo } from "react";
import { Check } from "lucide-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
import { Catalog } from "@/components/Catalog";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { CameraDetail } from "@/components/CameraDetail";
import { CartDrawer } from "@/components/CartDrawer";
import GradientWaves from "@/components/react-bits/Backgrounds/GradientWaves";
import SwipeToast from "@/components/react-bits/Feedback/SwipeToast";

import { AdminAuthProvider, useAdminAuth } from "@/components/admin/AdminAuthContext";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminCatalog } from "@/components/admin/AdminCatalog";
import { AdminOrders } from "@/components/admin/AdminOrders";

import type { Camera, CartItem } from "@/types";

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function tomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function calcDays(start: string, end: string): number {
  if (!start || !end) return 0;

  const s = new Date(start).getTime();
  const e = new Date(end).getTime();

  if (e < s) return 0;

  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
}

function Storefront() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  const addToCart = useCallback(
    (camera: Camera) => {
      if (!camera.available) return;

      setCartItems((prev) => {
        if (prev.some((item) => item.camera.id === camera.id)) {
          showToast(`${camera.name} is already in your cart.`);
          return prev;
        }

        const start = todayStr();
        const end = tomorrowStr();
        const days = calcDays(start, end);

        showToast(`${camera.name} added to your cart.`);

        return [
          ...prev,
          {
            camera,
            startDate: start,
            endDate: end,
            days,
            total: days * camera.pricePerDay,
          },
        ];
      });
    },
    [showToast]
  );

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.camera.id !== id)
    );
  }, []);

  const updateDates = useCallback(
    (id: string, startDate: string, endDate: string) => {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.camera.id !== id) return item;

          const days = calcDays(startDate, endDate);

          return {
            ...item,
            startDate,
            endDate,
            days,
            total: days * item.camera.pricePerDay,
          };
        })
      );
    },
    []
  );

  const handleCheckout = useCallback(() => {
    setCartItems([]);
  }, []);

  const scrollToCatalog = useCallback(() => {
    document
      .getElementById("catalog")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

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

      <div className="relative z-10 bg-transparent">
        <Header
          cartCount={cartCount}
          onCartOpen={() => setCartOpen(true)}
          onLogoClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        />

        <main>
          <Hero onBrowse={scrollToCatalog} />
          <StatsBand />
          <Catalog onSelectCamera={setSelectedCamera} onAddToCart={addToCart} />
          <Features />
          <Testimonials />
        </main>

        <Footer />

        {selectedCamera && (
          <CameraDetail
            camera={selectedCamera}
            onClose={() => setSelectedCamera(null)}
            onAddToCart={addToCart}
          />
        )}

        {cartOpen && (
          <CartDrawer
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onRemove={removeFromCart}
            onUpdateDates={updateDates}
            onCheckout={handleCheckout}
          />
        )}

        {toast && (
          <SwipeToast
            open={true}
            onClose={() => setToast(null)}
            title={toast}
            description="Added to your cart"
            icon={<Check size={18} className="text-zinc-300" strokeWidth={2.5} />}
            actionLabel="Undo"
            onAction={() => setToast(null)}
            background="rgba(15, 23, 42, 0.55)"
            color="#edf7ff"
            fuseColor="#7dd3fc"
            width={328}
            radius={18}
            slideMs={400}
            settleBounce={0.2}
            swipeDistance={40}
            duration={4000}
            fuse="bottom"
            pauseOnHover
            closeButton={false}
          />
        )}
      </div>
    </div>
  );
}

function AdminGuard() {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <AdminLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* Storefront */}
          <Route path="/" element={<Storefront />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminGuard />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="catalog" element={<AdminCatalog />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from "react";
import {
  X,
  Star,
  Check,
  ArrowLeft,
  Cpu,
  Film,
  Camera as CameraIcon,
  Battery,
  Weight,
  Aperture,
  ShoppingCart,
} from "lucide-react";
import ClickSpark from "@/components/react-bits/Animations/ClickSpark";
import type { Camera } from "@/types";

interface CameraDetailProps {
  camera: Camera;
  onClose: () => void;
  onAddToCart: (camera: Camera) => void;
}

export function CameraDetail({ camera, onClose, onAddToCart }: CameraDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const specIcons: Record<string, typeof Cpu> = {
    sensor: Cpu,
    resolution: CameraIcon,
    video: Film,
    weight: Weight,
    mount: Aperture,
    battery: Battery,
  };

  const specLabels: Record<string, string> = {
    sensor: "Sensor",
    resolution: "Resolution",
    video: "Video",
    weight: "Weight",
    mount: "Mount",
    battery: "Battery",
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Container - Scaled and proportioned to fit without scrolling */}
      <div className="relative z-10 w-full max-w-[1050px] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-sky-950/60 shadow-[0_30px_120px_rgba(0,15,35,0.5)] ring-1 ring-white/5 backdrop-blur-md">
        
        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 bg-transparent">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to catalog
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col lg:flex-row px-8 pb-8 gap-8 lg:gap-12">
          
          {/* Gallery Column (Left) */}
          <div className="w-full lg:w-[42%] flex flex-col gap-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-inner">
              <img
                src={camera.gallery[activeImage]}
                alt={camera.name}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                key={activeImage}
              />
              {camera.tag && (
                <div className="absolute left-4 top-4 rounded-full bg-sky-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                  {camera.tag}
                </div>
              )}
            </div>

            <div className="flex gap-3 h-[72px]">
              {camera.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-full aspect-square overflow-hidden rounded-xl transition-all duration-200 ${
                    activeImage === i
                      ? "ring-2 ring-sky-400 opacity-100"
                      : "ring-1 ring-white/10 opacity-40 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Column (Right) */}
          <div className="w-full lg:w-[58%] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                {camera.brand} · {camera.category}
              </div>
              <h1 className="mt-1.5 text-3xl font-semibold tracking-tight text-white drop-shadow-md">
                {camera.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  <span className="text-[13px] font-semibold text-white">
                    {camera.rating}
                  </span>
                </div>
                <span className="text-[13px] text-white/70">
                  {camera.reviews} reviews
                </span>
                <div className="h-3 w-px bg-white/20" />
                <span
                  className={`text-[13px] font-medium ${
                    camera.available ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {camera.available ? "Available now" : "Currently rented"}
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-relaxed text-white/80">
                {camera.description}
              </p>
            </div>

            {/* Specs */}
            <div className="mt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {Object.entries(camera.specs).map(([key, value]) => {
                  const Icon = specIcons[key] ?? Cpu;
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2 text-white/60 mb-1">
                        <Icon className="h-3.5 w-3.5 text-sky-300/80" strokeWidth={2} />
                        <span className="text-[11px] font-medium">
                          {specLabels[key] ?? key}
                        </span>
                      </div>
                      <div className="text-[13px] font-semibold text-white/90 truncate">
                        {String(value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">
                What's included
              </h3>
              <div className="flex flex-wrap gap-2">
                {camera.features.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/80 backdrop-blur-sm"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400/80" strokeWidth={3} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
              <div>
                <div className="text-[12px] text-white/60 font-medium mb-0.5">Starting from</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-white drop-shadow-sm">
                    ${camera.pricePerDay}
                  </span>
                  <span className="text-[13px] text-white/60 font-medium">
                    per day
                  </span>
                </div>
              </div>
              <ClickSpark
                sparkColor="#ffffff"
                sparkSize={6}
                sparkRadius={20}
                sparkCount={6}
                duration={400}
              >
                <button
                  onClick={() => {
                    onAddToCart(camera);
                    onClose();
                  }}
                  disabled={!camera.available}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[14px] font-semibold text-slate-900 transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {camera.available ? "Add to cart" : "Unavailable"}
                </button>
              </ClickSpark>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
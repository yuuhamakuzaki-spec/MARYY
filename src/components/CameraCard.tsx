import { Star, Check, X } from "lucide-react";
import type { Camera } from "@/types";
import ClickSpark from "@/components/react-bits/Animations/ClickSpark";

interface CameraCardProps {
  camera: Camera;
  onSelect: (camera: Camera) => void;
  onAddToCart: (camera: Camera) => void;
}

export function CameraCard({ camera, onSelect, onAddToCart }: CameraCardProps) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-sky-950/35 shadow-[0_8px_40px_rgba(0,15,35,0.2)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:shadow-[0_16px_60px_rgba(0,15,35,0.3)]"
      onClick={() => onSelect(camera)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={camera.image}
          alt={camera.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-transparent to-transparent opacity-70" />

        {camera.tag && (
          <div className="absolute left-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg">
            {camera.tag}
          </div>
        )}

        <div
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold shadow-lg ${
            camera.available
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {camera.available ? (
            <Check className="h-3 w-3" strokeWidth={3} />
          ) : (
            <X className="h-3 w-3" strokeWidth={3} />
          )}
          {camera.available ? "Available" : "Rented"}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-sky-950/50 px-2.5 py-1 shadow-lg backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" style={{ filter: "drop-shadow(0 1px 3px rgba(0,10,30,0.5))" }} />
          <span className="text-[12px] font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.7)" }}>
            {camera.rating}
          </span>
          <span className="text-[12px] text-white/90" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.7)" }}>
            ({camera.reviews})
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium uppercase tracking-wide text-white/95" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>
            {camera.brand} · {camera.category}
          </span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7), 0 0 12px rgba(0,15,35,0.4)" }}>
          {camera.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/90" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.5)" }}>
          {camera.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[13px] text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>
                ${camera.pricePerDay}
              </span>
              <span className="text-[13px] text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>/day</span>
            </div>
          </div>
          <ClickSpark
            sparkColor="#0A84FF"
            sparkSize={8}
            sparkRadius={20}
            sparkCount={6}
            duration={350}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(camera);
              }}
              disabled={!camera.available}
              className="rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.3)] transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {camera.available ? "Add to cart" : "Unavailable"}
            </button>
          </ClickSpark>
        </div>
      </div>
    </div>
  );
}

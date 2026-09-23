import { Camera, CheckCircle2, Star } from "lucide-react";
import AnimatedContent from "@/components/react-bits/Animations/AnimatedContent";

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-0 pt-8">
      <div className="relative mx-auto max-w-5xl px-6">
        <AnimatedContent distance={50} direction="vertical" duration={0.8} delay={0}>
          <div className="grid grid-cols-3 overflow-hidden rounded-3xl border border-white/15 bg-sky-950/30 backdrop-blur-xl divide-x divide-white/10">
            <StatCell
              value="120+"
              label="Cameras in the fleet"
              icon={Camera}
              accent="#5bA3ff"
            />
            <StatCell
              value="8,400+"
              label="Rentals completed"
              icon={CheckCircle2}
              accent="#30D5C8"
            />
            <RatingCell />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

function StatCell({
  value,
  label,
  icon: Icon,
  accent,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="group relative px-4 py-4 transition-all duration-500">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(180px circle at 50% 0%, ${accent}25, transparent 70%)` }}
      />
      <div className="relative flex flex-col items-center text-center">
        <div
          className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:border-white/40"
          style={{ backgroundColor: `${accent}22` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent, filter: "drop-shadow(0 2px 6px rgba(0,10,30,0.5))" }} strokeWidth={1.8} />
        </div>
        <div
          className="text-3xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:scale-[1.02] sm:text-4xl"
          style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 12px rgba(0,15,35,0.4)" }}
        >
          {value}
        </div>
        <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/95 sm:text-[12px]" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.7)" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function RatingCell() {
  return (
    <div className="group relative px-4 py-4 transition-all duration-500">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(180px circle at 50% 0%, #FBBF2425, transparent 70%)" }} />
      <div className="relative flex flex-col items-center text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-[#FBBF2422] transition-all duration-500 group-hover:scale-110 group-hover:border-white/40">
          <Star className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" style={{ filter: "drop-shadow(0 2px 6px rgba(0,10,30,0.5))" }} strokeWidth={1.8} />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-3xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:scale-[1.02] sm:text-4xl"
            style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 12px rgba(0,15,35,0.4)" }}
          >
            4.9
          </span>
        </div>
        <div className="mt-1.5 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,10,30,0.6))" }}
            />
          ))}
        </div>
        <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/95 sm:text-[12px]" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.7)" }}>
          from 2,100 reviews
        </div>
      </div>
    </div>
  );
}
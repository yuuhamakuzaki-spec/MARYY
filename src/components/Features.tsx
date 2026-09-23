import { Shield, Truck, Wrench, Clock } from "lucide-react";
import GradientText from "@/components/react-bits/TextAnimations/GradientText";
import AnimatedContent from "@/components/react-bits/Animations/AnimatedContent";

export function Features() {
  const features = [
    {
      icon: Truck,
      title: "Door-to-door delivery",
      desc: "Gear arrives at your location in a protective hard case. Free delivery on orders over $100.",
    },
    {
      icon: Shield,
      title: "Damage protection",
      desc: "Every rental includes optional insurance. Shoot with confidence, not anxiety.",
    },
    {
      icon: Wrench,
      title: "Professionally maintained",
      desc: "Each body is cleaned, calibrated, and firmware-updated between every rental.",
    },
    {
      icon: Clock,
      title: "Flexible durations",
      desc: "Rent for a day, a week, or a month. Discounts kick in automatically on longer bookings.",
    },
  ];

  return (
    <section className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          {/* Pure text with soft sky drop-shadow for seamless cloud blending */}
          <div
            className="inline-flex px-1 py-1"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(12, 35, 64, 0.45))",
            }}
          >
            <GradientText
              colors={["#ffffff", "#7dd3fc", "#e0f2fe"]}
              animationSpeed={6}
              className="text-[13px] font-bold uppercase tracking-widest"
            >
              Why CrisSells
            </GradientText>
          </div>

          <div className="mt-4">
            <h2
              className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)",
              }}
            >
              Rent with confidence.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <AnimatedContent
              key={f.title}
              distance={60}
              direction="vertical"
              duration={0.7}
              delay={i * 0.08}
            >
              <div className="h-full rounded-3xl border border-white/15 bg-sky-950/35 p-8 shadow-[0_8px_40px_rgba(0,15,35,0.2)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:shadow-[0_16px_60px_rgba(0,15,35,0.3)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-sky-400/20 shadow-[0_4px_16px_rgba(96,196,255,0.15)]">
                  <f.icon
                    className="h-6 w-6 text-sky-100"
                    style={{ filter: "drop-shadow(0 2px 6px rgba(0,10,30,0.5))" }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="mt-6 text-lg font-semibold text-white"
                  style={{
                    textShadow:
                      "0 2px 4px rgba(0,10,30,0.7), 0 0 12px rgba(0,15,35,0.4)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="mt-3 text-[14px] leading-relaxed text-white/90"
                  style={{ textShadow: "0 1px 3px rgba(0,10,30,0.5)" }}
                >
                  {f.desc}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
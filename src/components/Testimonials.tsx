import { Quote } from "lucide-react";
import GradientText from "@/components/react-bits/TextAnimations/GradientText";
import AnimatedContent from "@/components/react-bits/Animations/AnimatedContent";
import ScrollFloat from "@/components/react-bits/TextAnimations/ScrollFloat";

export function Testimonials() {
  const reviews = [
    {
      text: "Rented a RED KOMODO for a music video shoot. The gear arrived pristine, fully charged, with spare batteries. Flawless experience from start to finish.",
      name: "Marcus Chen",
      role: "Music video director",
    },
    {
      text: "The Sony FX3 saved my documentary. I needed a low-light cinema body on 24 hours' notice and CrisSells delivered. The damage protection gave me total peace of mind.",
      name: "Aisha Patel",
      role: "Documentary filmmaker",
    },
    {
      text: "I rent from CrisSells for every commercial gig. The consistency is unreal. Every lens is sharp, every body is clean. It's like having a rental house on speed dial.",
      name: "Jordan Rivera",
      role: "Commercial photographer",
    },
  ];

  return (
    <section className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          {/* Soft sky drop-shadow for seamless blending over clouds */}
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
              Trusted by creators
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
              8,400+ shoots and counting.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <AnimatedContent
              key={r.name}
              distance={60}
              direction="vertical"
              duration={0.7}
              delay={i * 0.08}
            >
              <div className="h-full rounded-3xl border border-white/15 bg-sky-950/35 p-8 shadow-[0_8px_40px_rgba(0,15,35,0.2)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/25">
                <Quote
                  className="h-8 w-8 text-sky-300/60"
                  strokeWidth={1}
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,10,30,0.5))" }}
                />
                <p
                  className="mt-5 text-[15px] leading-relaxed text-white"
                  style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}
                >
                  "{r.text}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(56,118,186,0.3)]">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="text-[14px] font-semibold text-white"
                      style={{ textShadow: "0 1px 3px rgba(0,10,30,0.7)" }}
                    >
                      {r.name}
                    </div>
                    <div
                      className="text-[12px] text-white/75"
                      style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}
                    >
                      {r.role}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
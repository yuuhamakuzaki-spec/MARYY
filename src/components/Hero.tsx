import { ArrowRight } from "lucide-react";
import BlurText from "@/components/react-bits/TextAnimations/BlurText";
import DriftWall, { type DriftWallItem } from "@/components/react-bits/Media/DriftWall";

interface HeroProps {
  onBrowse: () => void;
}

const heroDriftImages: DriftWallItem[] = [
  { image: "https://images.pexels.com/photos/34033017/pexels-photo-34033017.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Mount Cook at sunset" },
  { image: "https://images.pexels.com/photos/3805955/pexels-photo-3805955.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Dramatic portrait" },
  { image: "https://images.pexels.com/photos/18617747/pexels-photo-18617747.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Urban night underpass" },
  { image: "https://images.pexels.com/photos/15389332/pexels-photo-15389332.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Solitary tree, mountain silhouette" },
  { image: "https://images.pexels.com/photos/37233404/pexels-photo-37233404.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Studio dramatic lighting" },
  { image: "https://images.pexels.com/photos/26970215/pexels-photo-26970215.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Hong Kong night taxi" },
  { image: "https://images.pexels.com/photos/34033024/pexels-photo-34033024.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Mount Cook glowing" },
  { image: "https://images.pexels.com/photos/39190655/pexels-photo-39190655.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Behind the scenes studio" },
  { image: "https://images.pexels.com/photos/17955862/pexels-photo-17955862.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Dimly lit night street" },
  { image: "https://images.pexels.com/photos/38064845/pexels-photo-38064845.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Norwegian fjord" },
  { image: "https://images.pexels.com/photos/29057425/pexels-photo-29057425.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Confident studio portrait" },
  { image: "https://images.pexels.com/photos/11213185/pexels-photo-11213185.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Night city reflections" },
];

export function Hero({ onBrowse }: HeroProps) {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 sm:px-10 pt-20">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-8 xl:gap-14">

          {/* Main Text Card Container */}
          <div className="w-full max-w-2xl flex-shrink-0 rounded-[2rem] border border-white/15 bg-sky-950/25 p-8 backdrop-blur-md sm:p-10">
            <BlurText
              text="Rent the gear. Shoot the impossible."
              delay={120}
              animateBy="words"
              direction="top"
              className="text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)" }}
              stepDuration={0.5}
            />

            <p className="mt-7 max-w-md text-lg font-light leading-relaxed text-white sky-text-strong">
              Cinema-grade cameras, drones, and vintage film bodies.
              Meticulously maintained, delivered to your door.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={onBrowse}
                className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-sky-900 shadow-[0_8px_32px_rgba(56,118,186,0.4)] transition-all hover:scale-[1.03] active:scale-95"
              >
                Browse catalog
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </button>
              <button className="rounded-full border border-white/25 bg-sky-950/30 px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_4px_16px_rgba(0,15,35,0.3)] backdrop-blur-md transition-all hover:bg-sky-950/45 hover:text-white">
                How it works
              </button>
            </div>
          </div>

          {/* DriftWall Gallery Container */}
          <div className="flex w-full items-center justify-center overflow-visible lg:w-auto lg:flex-shrink-0">
            <div
              className="hero-driftwall relative h-[530px] w-full max-w-[980px] flex-shrink-0 overflow-visible drop-shadow-[0_20px_40px_rgba(15,23,42,0.3)] lg:w-[980px] transition-transform"
              style={{ transform: "scale(clamp(0.68, calc(100vw / 1500), 1))" }}
            >
              <DriftWall
                items={heroDriftImages}
                columns={5}
                tileWidth={160}
                tileHeight={108}
                gap={14}
                tilt={14}
                turn={-10}
                perspective={1200}
                depth={120}
                speed={38}
                direction="up"
                variance={0.3}
                parallax={0.7}
                lift={68}
                fade={0.25}
                dim={0.55}
                overlayColor="#0c1e37"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
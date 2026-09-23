import DriftWall, { type DriftWallItem } from "@/components/react-bits/Media/DriftWall";
import BlurText from "@/components/react-bits/TextAnimations/BlurText";

const galleryImages: DriftWallItem[] = [
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
  { image: "https://images.pexels.com/photos/16166873/pexels-photo-16166873.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Misty mountains" },
  { image: "https://images.pexels.com/photos/33406877/pexels-photo-33406877.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Studio session" },
  { image: "https://images.pexels.com/photos/9432522/pexels-photo-9432522.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Moody alleyway" },
  { image: "https://images.pexels.com/photos/37911514/pexels-photo-37911514.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Misty Irish hills" },
  { image: "https://images.pexels.com/photos/17094508/pexels-photo-17094508.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Studio softbox lighting" },
  { image: "https://images.pexels.com/photos/1722380/pexels-photo-1722380.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Graffiti night street" },
  { image: "https://images.pexels.com/photos/28893059/pexels-photo-28893059.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Rocky peaks Romania" },
  { image: "https://images.pexels.com/photos/20419529/pexels-photo-20419529.jpeg?auto=compress&cs=tinysrgb&h=400&w=600", title: "Female photographer studio" },
];

export function Gallery() {
  return (
    <section className="relative bg-transparent py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)" }}>
            Shot with CrisSells gear.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-light text-white/90" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)" }}>
            Real frames from real rentals. Every photo below was captured on a camera from our fleet.
          </p>
        </div>
      </div>

      <div className="mt-12 flex justify-center px-6">
        <div className="h-[420px] w-full max-w-[1280px] sm:h-[520px] lg:h-[600px]">
          <DriftWall
            items={galleryImages}
            columns={5}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={16}
            turn={-14}
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
    </section>
  );
}

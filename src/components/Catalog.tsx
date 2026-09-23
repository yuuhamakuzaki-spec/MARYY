import { useMemo, useState } from "react";
import { CameraCard } from "@/components/CameraCard";
import { cameras, categories } from "@/data/cameras";
import type { Camera, CameraCategory } from "@/types";
import BlurText from "@/components/react-bits/TextAnimations/BlurText";
import GradientText from "@/components/react-bits/TextAnimations/GradientText";
import AnimatedContent from "@/components/react-bits/Animations/AnimatedContent";
import GlideSelect from "@/components/react-bits/Inputs/GlideSelect";

interface CatalogProps {
  onSelectCamera: (camera: Camera) => void;
  onAddToCart: (camera: Camera) => void;
}

export function Catalog({ onSelectCamera, onAddToCart }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<
    CameraCategory | "All"
  >("All");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "rating"
  >("featured");

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
  ];

  const filtered = useMemo(() => {
    let result = [...cameras];
    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
    }
    return result;
  }, [activeCategory, sortBy]);

  return (
    <section id="catalog" className="relative bg-transparent pt-6 pb-16 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
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
                The Collection
              </GradientText>
            </div>

            <div className="mt-3">
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)" }}>
                Find your camera.
              </h2>
            </div>
            <p className="mx-auto mt-4 max-w-md text-[15px] font-light text-white/90" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.8), 0 0 16px rgba(0,15,35,0.5)" }}>
              {cameras.length} cameras across six categories. Every body
              inspected, cleaned, and calibrated before it reaches you.
            </p>
          </div>

        </div>

        {/* Row layout with categories on the left and compact sort on the right */}
        <div className="mt-10 relative z-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-white text-sky-900 shadow-[0_4px_16px_rgba(56,118,186,0.35)]"
                    : "bg-sky-950/30 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-sky-950/45"
                }`}
                style={activeCategory !== cat.value ? { textShadow: "0 1px 3px rgba(0,10,30,0.6)" } : undefined}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-sky-950/25 px-3 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-md hover:bg-sky-950/40 hover:text-white transition-all duration-300">
            <span className="text-[13px] text-white/90 font-medium pl-1" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.6)" }}>Sort by</span>
            <GlideSelect
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as typeof sortBy)}
              ariaLabel="Sort cameras"
              showTags={false}
              accentColor="#f5f5f5"
              surfaceColor="rgba(12,30,55,0.6)"
              highlightColor="rgba(30,60,100,0.8)"
              textColor="#f5f5f5"
              size="sm"
              radius={10}
              menuWidth={180}
              placement="bottom"
              align="left"
              popDuration={180}
              glideDuration={220}
              rememberPosition
              className="[filter:drop-shadow(0_8px_24px_rgba(0,15,35,0.2))]"
            />
          </div>
        </div>

        {/* 4 Cards Per Row Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((camera, i) => (
            <AnimatedContent
              key={camera.id}
              distance={50}
              direction="vertical"
              duration={0.6}
              delay={i * 0.05}
            >
              <CameraCard
                camera={camera}
                onSelect={onSelectCamera}
                onAddToCart={onAddToCart}
              />
            </AnimatedContent>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-white/70" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>
            No cameras in this category.
          </div>
        )}
      </div>
    </section>
  );
}
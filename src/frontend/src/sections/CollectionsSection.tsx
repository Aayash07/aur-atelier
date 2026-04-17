import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: "Noir Lumière",
    description: "Dramatic silhouettes in black and ivory",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
  },
  {
    id: 2,
    name: "Été Doré",
    description: "Effortless summer in golden tones",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85",
  },
  {
    id: 3,
    name: "La Bohème",
    description: "Free-spirited textures and flowing forms",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=85",
  },
  {
    id: 4,
    name: "Minuit Bleu",
    description: "Midnight blue for the evening hour",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=85",
  },
  {
    id: 5,
    name: "Atelier Blanc",
    description: "Pristine whites and architectural cuts",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=85",
  },
  {
    id: 6,
    name: "Velours Rouge",
    description: "Rich red velvet for the bold statement",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85",
  },
];

function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      const image = imageRef.current;
      const overlay = overlayRef.current;
      if (!card || !image || !overlay) return;

      gsap.set(overlay, { opacity: 0, y: 10 });

      const onEnter = () => {
        gsap.to(image, { scale: 1.08, duration: 0.55, ease: "power2.out" });
        gsap.to(overlay, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(card.querySelector(".card-shadow-box"), {
          boxShadow: "0 16px 64px oklch(0.25 0.05 260 / 0.15)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(card, { scale: 1.02, duration: 0.4, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(image, { scale: 1, duration: 0.55, ease: "power2.out" });
        gsap.to(overlay, {
          opacity: 0,
          y: 10,
          duration: 0.35,
          ease: "power2.in",
        });
        gsap.to(card.querySelector(".card-shadow-box"), {
          boxShadow: "0 4px 24px oklch(0.25 0.05 260 / 0.08)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      data-ocid={`collections.item.${index + 1}`}
      className="cursor-pointer will-change-transform"
      style={{ opacity: 0, transform: "translateY(60px)" }}
    >
      {/* Image container */}
      <div
        className="card-shadow-box relative overflow-hidden shadow-luxury"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          ref={imageRef}
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover will-change-transform"
          loading="lazy"
          decoding="async"
        />

        {/* Base gradient always visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.25 0.05 260 / 0.04) 0%, oklch(0.25 0.05 260 / 0.50) 100%)",
          }}
        />

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.25 0.05 260 / 0) 30%, oklch(0.25 0.05 260 / 0.72) 100%)",
          }}
        >
          <p
            className="font-display italic font-light text-xl text-center mb-3 tracking-wide"
            style={{ color: "oklch(0.97 0.02 60)" }}
          >
            {collection.name}
          </p>
          <span
            className="text-label-caps"
            style={{ color: "oklch(0.85 0.08 60)", letterSpacing: "0.22em" }}
          >
            View Collection →
          </span>
        </div>
      </div>

      {/* Text below image */}
      <div className="pt-5">
        <h3
          className="font-display italic font-light mb-1.5"
          style={{
            color: "oklch(0.25 0.05 260)",
            fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
          }}
        >
          {collection.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "oklch(0.5 0.02 260)" }}
        >
          {collection.description}
        </p>
        <span
          data-ocid={`collections.link.${index + 1}`}
          className="text-label-caps transition-colors-smooth cursor-pointer"
          style={{ color: "oklch(0.82 0.1 60)" }}
          aria-label={`View ${collection.name} collection`}
        >
          View Collection →
        </span>
      </div>
    </div>
  );
}

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header stagger reveal
      gsap.from(headerRef.current?.querySelectorAll(".reveal-header") ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Cards stagger reveal
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.to(Array.from(cards), {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="collections"
      ref={sectionRef}
      data-ocid="collections.section"
      className="py-32"
      style={{ background: "oklch(0.98 0.01 80)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <p
            className="text-label-caps mb-5 reveal-header"
            data-ocid="collections.eyebrow"
            style={{ color: "oklch(0.82 0.1 60)" }}
          >
            The Collections
          </p>
          <h2
            className="text-display-xl font-display italic font-light mb-5 reveal-header"
            data-ocid="collections.headline"
            style={{ color: "oklch(0.25 0.05 260)" }}
          >
            Curated for the Bold
          </h2>
          <p
            className="max-w-md mx-auto text-base leading-relaxed reveal-header"
            data-ocid="collections.subtext"
            style={{ color: "oklch(0.5 0.02 260)" }}
          >
            Each collection is an act of intention — assembled for those who
            wear fashion as a language, not merely a covering.
          </p>
        </div>

        {/* Collections grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          data-ocid="collections.list"
        >
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <a
            href="#contact"
            data-ocid="collections.view_all_button"
            className="inline-block text-label-caps border-b transition-smooth pb-1"
            style={{
              color: "oklch(0.25 0.05 260)",
              borderColor: "oklch(0.82 0.1 60)",
            }}
          >
            Explore All Collections
          </a>
        </div>
      </div>
    </section>
  );
}

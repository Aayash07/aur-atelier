import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=90";

const GOLD = "oklch(0.82 0.1 60)";
const CHARCOAL = "oklch(0.25 0.05 260)";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      // 1. Ken Burns — background image scale in
      gsap.fromTo(
        imgRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 2, ease: "power2.out" },
      );

      // 2. Eyebrow fades in + slides up
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" },
      );

      // 3. Headline words stagger
      gsap.fromTo(
        [word1Ref.current, word2Ref.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.5,
        },
      );

      // 4. Tagline fades in
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power2.out" },
      );

      // 5. CTA button fades in + scales
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: 1.5,
          ease: "back.out(1.4)",
        },
      );

      // 6. Scroll indicator bounces (yoyo loop)
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 0.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    },
    { scope: containerRef },
  );

  // CTA hover: GSAP quickTo for smooth gold fill
  const handleCtaEnter = () => {
    gsap.to(ctaRef.current, {
      backgroundColor: GOLD,
      color: CHARCOAL,
      borderColor: GOLD,
      duration: 0.28,
      ease: "power2.out",
    });
  };
  const handleCtaLeave = () => {
    gsap.to(ctaRef.current, {
      backgroundColor: "transparent",
      color: GOLD,
      borderColor: GOLD,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero — Auré Atelier SS 2025"
      data-ocid="hero.section"
    >
      {/* Background image — Ken Burns target */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          transformOrigin: "center center",
        }}
        role="img"
        aria-label="Editorial fashion photograph — Auré Atelier SS 2025"
      />

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${CHARCOAL.replace(")", " / 0.38)")} 0%, ${CHARCOAL.replace(")", " / 0.68)")} 100%)`,
        }}
      />

      {/* Centred content block */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto">
        {/* Eyebrow label */}
        <span
          ref={eyebrowRef}
          className="text-label-caps mb-6"
          style={{
            color: GOLD,
            letterSpacing: "0.3em",
            opacity: 0, // GSAP reveals
          }}
          data-ocid="hero.eyebrow"
        >
          SS 2025 Collection
        </span>

        {/* Headline — two-line serif display */}
        <h1
          className="flex flex-col items-center leading-none mb-6"
          aria-label="Auré Atelier"
        >
          <span
            ref={word1Ref}
            className="text-display-hero italic"
            style={{ color: "oklch(0.99 0.005 80)", opacity: 0 }}
          >
            Auré
          </span>
          <span
            ref={word2Ref}
            className="text-display-hero italic"
            style={{ color: "oklch(0.99 0.005 80)", opacity: 0 }}
          >
            Atelier
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-body mb-10"
          style={{
            color: "oklch(0.95 0.01 60 / 0.8)",
            fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)",
            letterSpacing: "0.1em",
            fontWeight: 300,
            opacity: 0, // GSAP reveals
          }}
          data-ocid="hero.tagline"
        >
          Where artistry meets elegance
        </p>

        {/* CTA button — gold outline, hover fills */}
        <button
          ref={ctaRef}
          type="button"
          onClick={() => scrollTo("collections")}
          onMouseEnter={handleCtaEnter}
          onMouseLeave={handleCtaLeave}
          onFocus={handleCtaEnter}
          onBlur={handleCtaLeave}
          className="font-body font-medium uppercase cursor-pointer px-11 py-3.5"
          style={{
            border: `1px solid ${GOLD}`,
            color: GOLD,
            backgroundColor: "transparent",
            letterSpacing: "0.22em",
            fontSize: "0.65rem",
            opacity: 0, // GSAP reveals
          }}
          aria-label="Explore the Auré Atelier SS 2025 Collections"
          data-ocid="hero.primary_button"
        >
          Explore Collections
        </button>
      </div>

      {/* Scroll-down indicator (bottom-centre) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5">
        <span
          className="text-label-caps"
          style={{
            color: "oklch(0.95 0.01 60 / 0.45)",
            letterSpacing: "0.22em",
          }}
          aria-hidden="true"
        >
          Scroll
        </span>
        <button
          ref={arrowRef}
          type="button"
          onClick={() => scrollTo("about")}
          aria-label="Scroll to About section"
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          style={{ background: "transparent", border: "none", padding: 0 }}
          data-ocid="hero.scroll_indicator"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 2v16M4 12l6 6 6-6"
              stroke={GOLD}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

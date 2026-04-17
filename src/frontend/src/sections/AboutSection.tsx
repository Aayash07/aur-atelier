import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const triggerOpts: ScrollTrigger.Vars = {
        start: "top 75%",
        toggleActions: "play none none none",
      };

      // ── Parallax: image inner moves at ~0.6x scroll speed ─────────────
      if (imageInnerRef.current && imageWrapRef.current) {
        const wrapH = imageWrapRef.current.offsetHeight;
        gsap.to(imageInnerRef.current, {
          y: wrapH * 0.22,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Eyebrow ─────────────────────────────────────────────────────
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: eyebrowRef.current, ...triggerOpts },
        });
      }

      // ── Headline word stagger ────────────────────────────────────────
      if (headlineRef.current) {
        const words =
          headlineRef.current.querySelectorAll<HTMLSpanElement>(".word");
        gsap.from(words, {
          opacity: 0,
          y: 38,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, ...triggerOpts },
        });
      }

      // ── Paragraphs ───────────────────────────────────────────────────
      [para1Ref, para2Ref, para3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.from(ref.current, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, ...triggerOpts },
        });
      });

      // ── Blockquote: fade + scale ─────────────────────────────────────
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, ...triggerOpts },
        });
      }

      // ── CTA ──────────────────────────────────────────────────────────
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ctaRef.current, ...triggerOpts },
        });
      }
    },
    { scope: sectionRef },
  );

  const headlineWords = "Crafted with Intention".split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      data-ocid="about.section"
      className="py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.02 60)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Portrait with Parallax ────────────────────────── */}
          <div
            ref={imageWrapRef}
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "3 / 4" }}
          >
            <div
              ref={imageInnerRef}
              className="absolute"
              style={{ inset: 0, top: "-14%", bottom: "-14%" }}
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85"
                alt="Auré Atelier artisan workshop"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.25 0.05 260 / 0.03) 0%, oklch(0.25 0.05 260 / 0.20) 100%)",
              }}
            />
          </div>

          {/* ── Right: Brand Story ──────────────────────────────────── */}
          <div className="flex flex-col gap-7 lg:pl-6">
            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              data-ocid="about.eyebrow"
              className="text-label-caps text-accent"
            >
              Our Story
            </p>

            {/* Headline — word-by-word stagger */}
            <h2
              ref={headlineRef}
              data-ocid="about.headline"
              className="font-display text-foreground leading-tight"
              aria-label="Crafted with Intention"
              style={{
                fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
              }}
            >
              {headlineWords.map((word, i) => (
                <span
                  key={word}
                  className="word inline-block"
                  style={{
                    marginRight: i < headlineWords.length - 1 ? "0.28em" : 0,
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* Gold rule */}
            <div
              className="h-px w-10"
              style={{ background: "oklch(0.82 0.1 60)" }}
              aria-hidden="true"
            />

            {/* Paragraphs */}
            <p
              ref={para1Ref}
              data-ocid="about.body_1"
              className="text-muted-foreground leading-relaxed"
              style={{ fontSize: "0.9375rem" }}
            >
              Founded in Paris in 2012, Auré Atelier began as a quiet rebellion
              against the pace of fast fashion. Our founder, Aurélie Marchais,
              returned from a decade apprenticing under the great couturiers of
              the Marais to open a single-room studio on Rue du Faubourg
              Saint-Honoré — a space where every garment would be touched by the
              same hands from first sketch to final seam.
            </p>

            <p
              ref={para2Ref}
              data-ocid="about.body_2"
              className="text-muted-foreground leading-relaxed"
              style={{ fontSize: "0.9375rem" }}
            >
              Each collection blends the precision of classical couture with a
              contemporary minimalism — structured silhouettes, hand-selected
              natural fabrics, and details that reward close attention. We limit
              production to forty pieces per season so that every client becomes
              a custodian of something genuinely rare.
            </p>

            <p
              ref={para3Ref}
              data-ocid="about.body_3"
              className="text-muted-foreground leading-relaxed"
              style={{ fontSize: "0.9375rem" }}
            >
              Sustainability is not a marketing position here — it is the
              consequence of slowness. Artisanal methods are inherently
              sustainable: zero-waste pattern cutting, natural dyes, and the
              simple fact that a well-made dress does not need to be replaced.
            </p>

            {/* Blockquote */}
            <blockquote
              ref={quoteRef}
              data-ocid="about.blockquote"
              className="border-l-2 pl-6 py-1"
              style={{ borderColor: "oklch(0.82 0.1 60)" }}
            >
              <p
                className="font-display italic text-foreground"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  fontWeight: 300,
                  lineHeight: 1.45,
                }}
              >
                "Every stitch tells a story."
              </p>
              <cite className="text-label-caps text-muted-foreground not-italic mt-3 block">
                — Aurélie Marchais, Founder
              </cite>
            </blockquote>

            {/* CTA */}
            <button
              ref={ctaRef}
              type="button"
              data-ocid="about.discover_link"
              className="group inline-flex items-center gap-3 text-foreground text-sm font-medium tracking-wide w-fit transition-smooth cursor-pointer"
              onClick={() => {
                document
                  .getElementById("collections")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative pb-[2px]">
                Discover Our Craft
                {/* Base gold underline */}
                <span
                  className="absolute bottom-0 left-0 h-px w-full"
                  style={{ background: "oklch(0.82 0.1 60)" }}
                  aria-hidden="true"
                />
                {/* Hover charcoal overlay — slides in from left */}
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
                  style={{ background: "oklch(0.25 0.05 260)" }}
                  aria-hidden="true"
                />
              </span>
              {/* Arrow */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7.5h10M8.5 3.5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

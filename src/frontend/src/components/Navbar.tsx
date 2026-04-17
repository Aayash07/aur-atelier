import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP navbar background transition
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      backgroundColor: scrolled
        ? "oklch(0.99 0.005 80 / 0.88)"
        : "oklch(0.99 0.005 80 / 0)",
      backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      borderBottomColor: scrolled
        ? "oklch(0.91 0.015 80)"
        : "oklch(0.91 0.015 80 / 0)",
      boxShadow: scrolled ? "0 4px 24px oklch(0.25 0.05 260 / 0.06)" : "none",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrolled]);

  // GSAP mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (menuOpen) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(
        menu,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        menu.querySelectorAll(".mobile-nav-item"),
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.07,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
      gsap.to(menu, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), menuOpen ? 450 : 0);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        data-ocid="navbar"
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ backgroundColor: "oklch(0.99 0.005 80 / 0)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            data-ocid="navbar.logo_link"
            onClick={() => handleNavClick("#hero")}
            className="font-display italic text-xl tracking-tight text-foreground hover:text-accent transition-colors-smooth"
            style={{
              fontSize: "1.35rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Auré Atelier
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                  onClick={() => handleNavClick(link.href)}
                  className="text-label-caps text-foreground/70 hover:text-foreground transition-colors-smooth relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="navbar.menu_toggle"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={closeMenu}
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className="fixed inset-0 z-40 md:hidden"
        style={{
          backgroundColor: "oklch(0.25 0.05 260 / 0.25)",
          backdropFilter: "blur(4px)",
          display: "none",
        }}
      />

      {/* Mobile drawer */}
      <div
        ref={mobileMenuRef}
        data-ocid="navbar.mobile_menu"
        className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border flex-col justify-center px-10 md:hidden"
        style={{ display: "none" }}
      >
        <button
          type="button"
          data-ocid="navbar.mobile_close_button"
          onClick={closeMenu}
          className="absolute top-6 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors-smooth"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <p className="font-display italic text-foreground/40 text-sm mb-10 mobile-nav-item">
          Auré Atelier
        </p>
        <ul className="flex flex-col gap-7">
          {navLinks.map((link) => (
            <li key={link.href} className="mobile-nav-item">
              <button
                type="button"
                data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                onClick={() => handleNavClick(link.href)}
                className="font-display italic text-foreground hover:text-accent transition-colors-smooth"
                style={{ fontSize: "1.75rem", fontWeight: 300 }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

import { Instagram } from "lucide-react";
import { SiPinterest } from "react-icons/si";

const year = new Date().getFullYear();
const hostname = typeof window !== "undefined" ? window.location.hostname : "";
const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

export default function Footer() {
  return (
    <footer
      data-ocid="footer"
      className="bg-foreground text-background/80 py-14 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <p
            className="font-display italic text-background/90 text-lg tracking-tight mb-1"
            style={{ fontWeight: 300 }}
          >
            Auré Atelier
          </p>
          <p className="text-label-caps text-background/40 text-xs">
            Luxury Fashion — Est. 2024
          </p>
        </div>

        {/* Social */}
        <div className="flex items-center gap-6">
          <a
            data-ocid="footer.instagram_link"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-background/50 hover:text-background transition-colors-smooth"
          >
            <Instagram size={18} />
          </a>
          <a
            data-ocid="footer.pinterest_link"
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
            className="text-background/50 hover:text-background transition-colors-smooth"
          >
            <SiPinterest size={18} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-label-caps text-background/35 text-center">
          © {year}. Built with love using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/50 hover:text-background transition-colors-smooth underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

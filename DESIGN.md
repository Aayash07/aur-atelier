# Design Brief — Auré Atelier

## Overview
Luxury editorial fashion showcase for high-end designer boutique. Refined minimalism meets modern web, inspired by premium fashion publications and contemporary luxury brands (Celine, Helmut Newton). Focus: generous whitespace, refined typography, elegant depth, smooth GSAP animations.

## Visual Direction
**Tone**: Luxury minimalist; understated sophistication; editorial precision
**Differentiation**: Deep charcoal + warm gold palette; serif-driven headlines; generous whitespace; smooth micro-interactions on scroll and hover
**Aesthetic**: Modern fashion editorial with high-impact imagery, card-based gallery layout, parallax depth, refined shadows

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| background | 0.98 0.01 80 | Soft ivory cream, minimal warmth |
| foreground | 0.25 0.05 260 | Deep charcoal-blue for text |
| accent | 0.85 0.08 60 | Warm champagne gold for highlights |
| secondary | 0.96 0.02 80 | Soft off-white for cards |
| muted | 0.88 0.02 240 | Taupe grey for subtle backgrounds |
| primary | 0.25 0.05 260 | Deep charcoal for UI elements |

## Typography
- **Display**: Fraunces (serif; bold; headlines)
- **Body**: General Sans (sans-serif; refined; readable)
- **Mono**: Geist Mono (monospace; fallback)
- **Sizes**: xl (5xl–6xl), lg (4xl–5xl), md (3xl–4xl); body-lg, body-sm

## Elevation & Depth
- **shadow-luxury**: `0 2px 8px rgba(0,0,0,0.08), 0 12px 24px rgba(0,0,0,0.06)` — subtle card elevation
- **shadow-luxury-lg**: `0 8px 16px rgba(0,0,0,0.12), 0 24px 48px rgba(0,0,0,0.08)` — prominent hover state
- Depth through layering, never through garish drop-shadows

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header | Semi-transparent on scroll; subtle border-bottom; dark text; right-aligned nav |
| Hero | Full viewport; high-impact image + centered text; fade-in animation |
| About | Two-column; parallax image left; text right; generous padding |
| Collections | Grid gallery (4 cols desktop, 2 mobile); hover: scale + overlay |
| Contact | Form section; minimal labels; gold accent on submit button |
| Footer | Soft muted background; refined legal text; centered |

## Spacing & Rhythm
- Generous vertical rhythm (sections 80–120px apart on desktop)
- Padding inside sections: 40–60px on mobile, 80–100px on desktop
- Card gaps: 24–32px
- Micro-spacing inside cards: 12–16px

## Component Patterns
- **Cards**: bg-card, shadow-luxury, hover:scale-105, transition-smooth
- **Buttons**: bg-accent, text-primary, padding 12-16px 24-32px, hover:shadow-luxury-lg
- **Images**: rounded borders, subtle border (border-muted), overlay on hover
- **Text Inputs**: bg-secondary, border-muted, focus:ring-accent

## Motion & Animation
- **Page Load**: Fade-in headings + slide-up body text (GSAP stagger)
- **Scroll**: Parallax on hero image; scale-in on gallery cards (ScrollTrigger)
- **Hover**: Card scale(1.05); button shadow elevation; overlay fade-in
- **Transitions**: All smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Choreography**: Entrance animations on first load; scroll-triggered reveals on cards; subtle idle float on imagery

## Signature Detail
Gold accent deployed sparingly: accent color on form submit button, hover states, and icon highlights. Never dominant; always luxe.

## Dark Mode
Charcoal backgrounds (0.15 0.02 260); warm gold accent preserved; increased contrast for legibility; softer greys (0.28–0.6 L).

## Constraints
- No neon, no gradients on text, no heavy shadows
- GSAP for all animations; no CSS-only flickers
- 60fps smooth scrolling; test on mid-range devices
- High-quality placeholder images (Unsplash luxury fashion collection)
- Production-ready client demo quality

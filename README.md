# CHIC COUTURE — Haute Luxury Fashion & Boutique

> **"Wear Confidence"**  
> An award-level, cinematic luxury e-commerce experience crafted for Maison Chic Couture. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

---

## ✦ Brand Identity & Design System

- **Brand Name**: Chic Couture
- **Tagline**: *"Wear Confidence"* (Great Vibes cursive script)
- **Brand Emblem**: Two interlocking letter "C"s—one molten metallic gold, one deep rich black—with the silhouette of an elegant woman in an evening gown flowing through them.
- **Palette**:
  - Warm Ivory Canvas: `#FBF9F4`
  - Deep Rich Black: `#0B0B0B`
  - Brand Gold: Base `#C9A24B`, Highlight `#E6C879`, Shadow `#8F6B1F`
  - Metallic Gradient: `linear-gradient(135deg, #8F6B1F 0%, #E6C879 45%, #C9A24B 70%, #8F6B1F 100%)`
  - Hairline Borders: `rgba(201, 162, 75, 0.35)`
- **Typography**:
  - Headings: `Cormorant Garamond` (Google Fonts)
  - Body & UI: `Plus Jakarta Sans` (Google Fonts)
  - Taglines & Accents: `Great Vibes` (Google Fonts)

---

## ✦ Key Features

1. **Sticky Glass Navbar**
   - Transparent top transitioning into ivory blur with thin gold border on scroll.
   - Global Search (`⌘K`), Wishlist drawer counter, Shopping bag pop counter.
   - Full-screen animated mobile menu with staggered link entrance.

2. **Full-Viewport Cinematic Hero**
   - "Wear Confidence" in Cormorant Garamond serif with gold metallic gradient.
   - Slow parallax, floating gold sparkles/hearts particles, and dual CTAs.
   - Scroll indicator with animated down beacon.

3. **Gold-on-Black Infinite Marquee**
   - Silky smooth scrolling marquee with couture highlights and pause on hover.

4. **Shop by Category**
   - Tall image cards with zoom, gold border draw, and arrow reveals:
     - Evening & Cocktail Gowns
     - Ethnic & Bridal Couture (Zardozi Sarees & Lehengas)
     - Designer Co-ord Sets
     - Western Pret & Midi Dresses
     - Festive & Party Edit
     - Haute Parfumerie & Beauty
     - Atelier Jewellery & Accessories

5. **New Arrivals & Featured Product Grid**
   - Multi-category filter tabs.
   - Secondary editorial image swap on hover.
   - Quick-View modal with image zoom and Add to Bag.
   - Wishlist heart with bounce animation and localStorage persistence.
   - Size chips (XS–XXL) & color swatches with instant active states.

6. **Editorial Banner**
   - "Style That Speaks Before You Do" full-width parallax lifestyle split.
   - Atelier craftsmanship manifesto and bespoke tailoring assurance.

7. **Lookbook & Style Gallery**
   - Asymmetric masonry grid.
   - Interactive pulsating gold hotspots on model images for instant "Shop the Look".
   - Full-screen Lightbox modal.

8. **Why Chic Couture**
   - Dark velvet section featuring 4 pillars (Pure Silks, Sculpted Fit, 48h Dispatch, 7-Day Returns) with gold foil icons and animated metric counters.

9. **Beauty & Haute Parfumerie Edit**
   - Niche extrait de parfums, 24k gold body elixirs, and statement accessories.

10. **Patron Testimonials Carousel**
    - Star ratings, gold quote marks, and verified buyer badges.

11. **Instagram Social Runway Grid**
    - 6-image feed with hover overlay metrics and `@chiccouture` follow button.

12. **The Chic Circle Newsletter**
    - Luxury signup card with validation, gold confetti explosion, and instant promo code `CHIC10` reveal (10% discount).

13. **Rich Black Luxury Footer**
    - Centered emblem, gold divider with diamond floral ornament, flagship salon addresses (Mumbai & Delhi), WhatsApp concierge, and back-to-top button.

---

## ✦ Complete Store Routes

- **Home**: `/` (All 13 luxury sections)
- **Shop Catalogue**: `/shop` (Filter sidebar by category, price slider, sizes, colors, sort, search sync)
- **Product Detail Page**: `/product/[id]` (SSG pre-rendered, gallery zoom, size guide table, accordion dossier, related items, customer reviews, sticky mobile Add to Bag bar)
- **Lookbook**: `/lookbook` (Campaign films and runway looks)
- **The Maison Story**: `/about` (Heritage, Varanasi looms, Corsetry, Founder's letter)
- **Concierge & Salons**: `/contact` (Bespoke fitting form, salon addresses, FAQ with JSON-LD Schema, WhatsApp chat)
- **Concierge Checkout**: `/checkout` (Shipping address, payment options, coupon calculation, order confirmation receipt)
- **Technical SEO**: `/sitemap.xml` & `/robots.txt`

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```
All 23 pages are statically pre-rendered with Turbopack for lightning-fast Core Web Vitals (LCP < 2.5s, CLS < 0.1).

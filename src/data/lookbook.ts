import { LookbookItem } from "@/types";

export const lookbookItems: LookbookItem[] = [
  {
    id: "look-1",
    title: "Midnight Gala Serenade",
    season: "Fall / Winter Haute Couture",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1400&auto=format&fit=crop",
    model: "Elena Rostova",
    description: "Sculpted liquid black velvet paired with molten brass minaudière under grand atrium lighting.",
    hotspots: [
      {
        x: 48,
        y: 42,
        productId: "aurum-sculpted-velvet-gown",
        title: "The Aurum Sculpted Velvet Gown",
        price: 24900,
      },
      {
        x: 62,
        y: 68,
        productId: "diana-sculptural-gold-minaudiere",
        title: "Diana Sculptural Brass Minaudière",
        price: 16500,
      },
    ],
  },
  {
    id: "look-2",
    title: "The Sovereign Empress",
    season: "Heritage Bridal & Festive",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop",
    model: "Nisha Sen",
    description: "Pure katan silk organza with antique beaten bullion wire zardozi borders.",
    hotspots: [
      {
        x: 52,
        y: 35,
        productId: "nocturne-embellished-saree",
        title: "Nocturne Zardozi Organza Saree",
        price: 38500,
      },
    ],
  },
  {
    id: "look-3",
    title: "Sunlit Riviera Monolith",
    season: "Spring / Resort Pret",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    model: "Camille Dupont",
    description: "Kinetic sunray pleats rippling in molten gold lurex chiffon against Mediterranean stonework.",
    hotspots: [
      {
        x: 45,
        y: 50,
        productId: "solstice-gold-pleated-midi",
        title: "Solstice Gilded Plissé Midi Dress",
        price: 14800,
      },
      {
        x: 55,
        y: 28,
        productId: "sovereign-oud-amber-parfum",
        title: "Sovereign Extrait de Parfum",
        price: 11500,
      },
    ],
  },
  {
    id: "look-4",
    title: "Architectural Powerhouse",
    season: "Autumn Tailoring Capsule",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1400&auto=format&fit=crop",
    model: "Arya Sharma",
    description: "Sharp double-breasted sand-washed mulberry silk jacket with hand-cast gold monogram buttons.",
    hotspots: [
      {
        x: 50,
        y: 45,
        productId: "elysian-silk-blazer-coord",
        title: "Elysian Double-Breasted Silk Co-ord",
        price: 18200,
      },
    ],
  },
];

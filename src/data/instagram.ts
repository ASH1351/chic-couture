export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  handle: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
    caption: "The velvet silhouette that silenced the room at Milan Fashion Week. #WearConfidence #ChicCouture",
    likes: 3420,
    comments: 89,
    handle: "@chiccouture",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    caption: "Hand-spun silk organza bathed in antique zardozi. 180 artisan hours in a single drape. #MaisonChic",
    likes: 4890,
    comments: 134,
    handle: "@chiccouture",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    caption: "Gilded plissé in kinetic motion. The Solstice Dress caught in golden hour. #ChicCircle",
    likes: 2750,
    comments: 62,
    handle: "@chiccouture",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    caption: "Tailoring that commands respect. Double-breasted silk co-ord for modern power. #WearConfidence",
    likes: 3190,
    comments: 77,
    handle: "@chiccouture",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    caption: "Olfactive decadence. Sovereign Extrait de Parfum infused with Cambodian agarwood. #HauteParfumerie",
    likes: 1980,
    comments: 45,
    handle: "@chiccouture",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop",
    caption: "Champagne sequins caught in the ballroom shimmer. Unapologetic glamour. #ChicCouture",
    likes: 5210,
    comments: 160,
    handle: "@chiccouture",
  },
];

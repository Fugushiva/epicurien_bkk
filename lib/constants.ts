import type { ProductCategory } from "@/components/ui/ProductCard";

export interface Product {
  id: string;
  name: string;
  nameKey?: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageSrc: string;
  imageAlt: string;
}

/**
 * Menu products — source: CONTENT.md (verified from Japanese press, Oct 2025)
 * Prices in THB.
 */
export const PRODUCTS: Product[] = [
  {
    id: "croissant-nature",
    name: "Croissant Nature",
    description:
      "Our signature: 27 layers of pure butter dough, baked to a shatter-crisp golden crust.",
    price: 95,
    category: "croissant",
    imageSrc: "/images/products/croissant-nature.jpg",
    imageAlt: "Classic French butter croissant from Épicurien",
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    description:
      "Perfectly balanced layers of laminated dough with a rich dark chocolate heart.",
    price: 110,
    category: "viennoiserie",
    imageSrc: "/images/products/pain-au-chocolat.jpg",
    imageAlt: "Pain au chocolat with dark chocolate",
  },
  {
    id: "pain-aux-raisins",
    name: "Pain aux Raisins",
    description:
      "Swirled viennoiserie with plump raisins and a light custard cream. Highly recommended.",
    price: 115,
    category: "viennoiserie",
    imageSrc: "/images/products/pain-aux-raisins.jpg",
    imageAlt: "Pain aux raisins swirl pastry",
  },
  {
    id: "pain-suisse",
    name: "Pain Suisse",
    description:
      "A childhood favourite: flaky dough with chocolate chips and crème pâtissière.",
    price: 130,
    category: "viennoiserie",
    imageSrc: "/images/products/pain-suisse.jpg",
    imageAlt: "Pain suisse with crème pâtissière",
  },
  {
    id: "croissant-chocolat-amande",
    name: "Croissant Chocolat Amande",
    description:
      "Twice-baked croissant filled with almond cream and dark chocolate. An indulgence.",
    price: 130,
    category: "croissant",
    imageSrc: "/images/products/croissant-chocolat-amande.jpg",
    imageAlt: "Croissant with almond cream and chocolate",
  },
  {
    id: "baguette",
    name: "Baguette Tradition",
    description:
      "Stone-baked baguette with a crisp crust and airy crumb. Available Saturday.",
    price: 85,
    category: "bread",
    imageSrc: "/images/products/baguette.jpg",
    imageAlt: "French baguette tradition",
  },
];

/** Featured products shown in the CroissantBar section (homepage) */
export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 6);

/** Press publications */
export const PRESS_PUBLICATIONS = [
  { name: "Le Parisien", href: "#", year: 2021, lang: "FR" },
  { name: "Koktail", href: "#", year: 2021, lang: "EN" },
  { name: "The Thaiger", href: "#", year: 2025, lang: "EN" },
  { name: "Corner.inc", href: "#", year: 2026, lang: "EN" },
] as const;

/** Business info */
export const BAKERY_INFO = {
  name: "Épicurien French Bakery",
  address: "W District, Sukhumvit 71 Rd, Phra Khanong, Watthana, Bangkok 10110",
  phone: "+66 80 791 2902",
  email: "hello@epicurien.bkk",
  instagram: "@epicurien.bkk",
  hours: {
    weekdays: "08:00 – 21:00",
    weekends: "08:00 – 21:00",
  },
  bts: "BTS Phra Khanong (~5 min walk)",
} as const;

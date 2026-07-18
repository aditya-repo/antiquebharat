import type { RegionPageData } from "@/app/lib/regions/types";

export const karnatakaRegion: RegionPageData = {
  slug: "karnataka",
  name: "Karnataka",
  tagline: "Silk, Sandalwood & Palace-Born Craft",
  heroImage:
    "https://images.unsplash.com/photo-1596176530529-78163f031173?auto=format&fit=crop&w=1400&q=80",
  heroImageAlt: "Heritage landscape and craft culture of Karnataka",
  copy: [
    "In Mysore, silk leaves the loom with a soft gold sheen meant for Dasara and wedding halls, while sandalwood carvers shape deities whose fragrance lingers in the workshop long after the chisel stops. At Channapatna, lathes turn lac-coated wood into toys bright enough for a child's palm. Karnataka does not keep its crafts for display alone — they mark ceremony, play, and the quiet pride of hereditary makers.",
    "From Bidar's inlay metalware to Ilkal's bold cotton borders and Kasuti embroidery counted thread by thread, this land holds a rare density of palace-born and village-rooted mastery. What you find here is not a souvenir trail — it is memory made visible, one weave, one turn, and one cast at a time.",
  ],
  highlights: [
    "Mysore silk looms weaving soft zari-bordered sarees for Dasara and wedding ceremony",
    "Channapatna lathes turning lac-coated wood into bright, safe toys for generations",
    "Bidriware artisans inlaying silver into blackened alloy — palace metal craft from Bidar",
    "Ilkal cotton sarees with bold chequered borders from northern Karnataka looms",
    "Kasuti embroidery, Mysore sandalwood carving, and bronze casting for temple and home",
  ],
  quote:
    "In Karnataka, heritage is woven in silk, turned on the lathe, and cast in bronze for altar and everyday life.",
  craftsSubtitle: "Karnataka Heritage Collection",
  crafts: [
    {
      place: "Mysore",
      craft: "Mysore Silk",
      slug: "mysore-silk",
      description:
        "Soft mulberry silk with zari borders — the signature saree weave of Mysore and royal Dasara tradition.",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Channapatna",
      craft: "Channapatna Toys",
      slug: "channapatna",
      description:
        "Lathe-turned wooden toys coated in natural lac — bright, safe forms from Karnataka's toy town.",
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Bidar",
      craft: "Bidriware",
      slug: "bidriware",
      description:
        "Blackened zinc-copper alloy inlaid with silver wire — Mughal-era metal craft from Bidar.",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Ilkal",
      craft: "Ilkal Sarees",
      slug: "ilkal",
      description:
        "Cotton sarees with distinctive chequered borders and body weave from Bagalkot district looms.",
      image:
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Dharwad",
      craft: "Kasuti Embroidery",
      slug: "kasuti",
      description:
        "Counted-thread embroidery on Ilkal cotton — geometric and folk motifs from northern Karnataka.",
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Mysore",
      craft: "Sandalwood Carving",
      slug: "sandalwood",
      description:
        "Fragrant sandalwood shaped into deities, boxes, and panels — Mysore's palace carving legacy.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Udupi",
      craft: "Bronze Casting",
      slug: "bronze-casting",
      description:
        "Lost-wax bronze idols and ritual vessels — temple casting traditions of coastal Karnataka.",
      image:
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=400&q=80",
    },
  ],
  communitiesSubtitle:
    "Craft clusters across Karnataka preserving age-old techniques.",
  communities: [
    {
      name: "Silk Weavers",
      slug: "mysore-silk-weavers",
      description:
        "Loom clusters of Mysore weaving mulberry silk with zari for Dasara and wedding wear.",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Toy Makers",
      slug: "channapatna-toys",
      description:
        "Lathe workers of Channapatna turning and lac-coating wood into bright heritage toys.",
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Bidri Artisans",
      slug: "bidar-bidri",
      description:
        "Metal inlay craftsmen of Bidar blackening alloy and setting silver into palace-born forms.",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ilkal Weavers",
      slug: "ilkal-weavers",
      description:
        "Cotton loom families of Ilkal weaving chequered borders into the region's signature saree.",
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sandalwood Carvers",
      slug: "mysore-sandalwood",
      description:
        "Mysore sculptors shaping fragrant sandalwood into deities and decorative panels by hand.",
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    },
  ],
  productsTitle: "SHOP KARNATAKA",
  productsCtaLabel: "VIEW ALL KARNATAKA PRODUCTS",
  products: [
    {
      id: "ka-1",
      name: "Mysore Silk Stole",
      description:
        "Soft mulberry silk stole with zari border — Mysore weave for ceremony and evening wear.",
      price: 5499,
      tags: ["Textiles", "Mysore"],
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-2",
      name: "Channapatna Lac Toy Set",
      description:
        "Lathe-turned wooden toys in natural lac — bright Channapatna craft safe for children.",
      price: 1299,
      tags: ["Toys", "Channapatna"],
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-3",
      name: "Bidar Bidriware Box",
      description:
        "Black alloy box with silver inlay — Bidriware metal craft from Bidar heritage workshops.",
      price: 3899,
      tags: ["Metal", "Bidar"],
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-4",
      name: "Ilkal Cotton Stole",
      description:
        "Cotton stole with chequered Ilkal border — northern Karnataka loom heritage for daily wear.",
      price: 2199,
      tags: ["Textiles", "Ilkal"],
      image:
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-5",
      name: "Kasuti Embroidered Table Runner",
      description:
        "Ilkal cotton runner with counted-thread Kasuti embroidery — Dharwad needlework tradition.",
      price: 1799,
      tags: ["Home", "Dharwad"],
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-6",
      name: "Mysore Sandalwood Carved Box",
      description:
        "Fragrant sandalwood box with relief carving — Mysore palace carving for keepsakes.",
      price: 4299,
      tags: ["Wood", "Mysore"],
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-7",
      name: "Bronze Temple Diya",
      description:
        "Lost-wax bronze oil lamp — coastal Karnataka casting tradition for altar and home.",
      price: 2499,
      tags: ["Metal", "Udupi"],
      image:
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ka-8",
      name: "Mysore Silk Cushion Cover",
      description:
        "Silk-blend cushion with zari accent — Mysore loom heritage for the living room.",
      price: 1999,
      tags: ["Home", "Mysore"],
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    },
  ],
  showHeritageJournal: true,
};

import type { RegionPageData } from "@/app/lib/regions/types";

export const odishaRegion: RegionPageData = {
  slug: "odisha",
  name: "Odisha",
  tagline: "Land of Ikat, Scroll & Sacred Stone",
  heroImage:
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1400&q=80",
  heroImageAlt: "Heritage landscape and craft culture of Odisha",
  copy: [
    "In Sambalpur, warp and weft are tied and dyed before the loom ever speaks — ikat bands emerging in rust, indigo, and cream. At Raghurajpur, every lane is a studio: Pattachitra scrolls dry in the sun while palm leaf manuscripts wait for the scribe's careful hand. Odisha does not keep its crafts behind glass; they belong to temples, processions, and the daily work of hereditary makers.",
    "From Pipli's applique canopies that shade Jagannath's chariot to Cuttack's silver filigree and Konark's stone carved to catch the light, this coast holds a patient vocabulary of devotion and skill. What you find here is not a souvenir trail — it is ritual made visible, one band of colour and one chisel stroke at a time.",
  ],
  highlights: [
    "Sambalpuri ikat bands tied and dyed before the loom reveals rust, cream, and indigo geometry",
    "Pattachitra scroll painters of Raghurajpur filling cloth with Jagannath lore and fine line",
    "Pipli applique artisans stitching bright cloth canopies and ritual umbrellas for procession",
    "Cuttack silver filigree twisted into delicate jewellery and ceremonial forms",
    "Konark and Puri stone carvers, horn craft, and palm leaf manuscripts keeping temple art alive",
  ],
  quote:
    "In Odisha, heritage is tied in ikat, painted on scroll, and carved in stone for gods and daily life.",
  craftsSubtitle: "Odisha Heritage Collection",
  crafts: [
    {
      place: "Sambalpur",
      craft: "Sambalpuri Ikat",
      slug: "sambalpuri-ikat",
      description:
        "Tie-dyed warp and weft weaving — bold bandha motifs in cotton and silk from western Odisha.",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Raghurajpur",
      craft: "Pattachitra",
      slug: "pattachitra",
      description:
        "Temple scroll painting on cloth — Jagannath lore, myth, and fine natural-pigment detail.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Pipli",
      craft: "Applique Work",
      slug: "applique",
      description:
        "Bright cloth cut and stitched into canopies, umbrellas, and ritual hangings for procession.",
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Cuttack",
      craft: "Silver Filigree",
      slug: "silver-filigree",
      description:
        "Fine silver wire twisted into jewellery, boxes, and ceremonial forms — Cuttack's tarakasi craft.",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Konark",
      craft: "Stone Carving",
      slug: "stone-carving",
      description:
        "Sandstone panels and sculptural forms echoing Konark and Puri temple carving traditions.",
      image:
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Paralakhemundi",
      craft: "Horn Craft",
      slug: "horn-craft",
      description:
        "Buffalo and cattle horn shaped into combs, panels, and decorative forms with polished finish.",
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
    },
    {
      place: "Puri",
      craft: "Palm Leaf Manuscripts",
      slug: "palm-leaf",
      description:
        "Incised and inked talapatra — sacred texts and illustrated folios on dried palm leaf.",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80",
    },
  ],
  communitiesSubtitle:
    "Craft clusters across Odisha preserving age-old techniques.",
  communities: [
    {
      name: "Ikat Weavers",
      slug: "sambalpuri-weavers",
      description:
        "Tie-dye and loom clusters of Sambalpur weaving bandha geometry into cotton and silk.",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Pattachitra Artists",
      slug: "pattachitra-artists",
      description:
        "Hereditary painters of Raghurajpur keeping temple scroll art alive on cloth and canvas.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Applique Artisans",
      slug: "pipli-applique",
      description:
        "Pipli stitchers cutting and layering bright cloth for chariot canopies and ritual umbrellas.",
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Filigree Silversmiths",
      slug: "cuttack-filigree",
      description:
        "Cuttack tarakasi workers twisting fine silver wire into jewellery and ceremonial pieces.",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Stone Carvers",
      slug: "konark-carvers",
      description:
        "Sculptors near Konark and Puri carving sandstone panels and temple-inspired forms.",
      image:
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    },
  ],
  productsTitle: "SHOP ODISHA",
  productsCtaLabel: "VIEW ALL ODISHA PRODUCTS",
  products: [
    {
      id: "od-1",
      name: "Sambalpuri Ikat Cotton Stole",
      description:
        "Handwoven bandha ikat in rust and cream — signature Sambalpur geometry for everyday drape.",
      price: 2799,
      tags: ["Textiles", "Sambalpur"],
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-2",
      name: "Raghurajpur Pattachitra Panel",
      description:
        "Temple scroll painting on cloth — Jagannath lore in natural pigment from heritage painters.",
      price: 3299,
      tags: ["Art", "Raghurajpur"],
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-3",
      name: "Pipli Applique Wall Hanging",
      description:
        "Bright cloth applique panel — Pipli stitch-work inspired by chariot canopy tradition.",
      price: 1899,
      tags: ["Decor", "Pipli"],
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-4",
      name: "Cuttack Silver Filigree Earrings",
      description:
        "Fine tarakasi silver wire earrings — delicate Cuttack filigree for ceremony and gift.",
      price: 2499,
      tags: ["Jewellery", "Cuttack"],
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-5",
      name: "Konark Stone Carved Panel",
      description:
        "Sandstone relief panel with temple motif — Konark carving tradition for wall display.",
      price: 4599,
      tags: ["Stone", "Konark"],
      image:
        "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-6",
      name: "Horn Craft Decorative Comb",
      description:
        "Polished buffalo horn comb with carved detail — Paralakhemundi horn craft heritage.",
      price: 899,
      tags: ["Accessories", "Odisha"],
      image:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-7",
      name: "Palm Leaf Manuscript Folio",
      description:
        "Incised talapatra folio with illustrated script — Puri scribe craft on dried palm leaf.",
      price: 1999,
      tags: ["Art", "Puri"],
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "od-8",
      name: "Sambalpuri Ikat Cushion Cover",
      description:
        "Cotton cushion with bandha ikat pattern — western Odisha weave for the living room.",
      price: 1499,
      tags: ["Home", "Sambalpur"],
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    },
  ],
  showHeritageJournal: true,
};

import { ExploreHeritage } from "@/app/components/ExploreHeritage";
import { HandpickedCollection } from "@/app/components/HandpickedCollection";
import { HeritageJournal } from "@/app/components/HeritageJournal";
import { HeroBanner } from "@/app/components/HeroBanner";
import { MeetTheArtisan } from "@/app/components/MeetTheArtisan";
import { NewArrivals } from "@/app/components/NewArrivals";
import { ShopByCategory } from "@/app/components/ShopByCategory";

export default function Home() {
  return (
    <main className="relative z-0 min-h-screen">
      <HeroBanner />
      <ShopByCategory />
      <HandpickedCollection />
      <NewArrivals />
      <MeetTheArtisan />
      <ExploreHeritage />
      <HeritageJournal />
    </main>
  );
}

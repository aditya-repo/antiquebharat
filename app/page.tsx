import { HandpickedCollection } from "@/app/components/HandpickedCollection";
import { HeroBanner } from "@/app/components/HeroBanner";
import { NewArrivals } from "@/app/components/NewArrivals";
import { ShopByCategory } from "@/app/components/ShopByCategory";

export default function Home() {
  return (
    <main className="relative z-0 min-h-screen">
      <HeroBanner />
      <ShopByCategory />
      <HandpickedCollection />
      <NewArrivals />
    </main>
  );
}

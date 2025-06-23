import { FeaturedListings } from "@/components/FeaturedListing";
import { SearchHero } from "@/components/SearchHero";
import { TrendingDestinations } from "@/components/TrendingDestination";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SearchHero />
      <TrendingDestinations />
      <FeaturedListings />
    </div>
  );
}

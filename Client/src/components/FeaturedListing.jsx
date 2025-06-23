import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/api";
import { useEffect, useState } from "react";
import { useAllListingStore } from "@/store/useAllListingStore";

export function FeaturedListings() {
  const [listings, setListings] = useState([]);
  const { setAllListing } = useAllListingStore();
  const allListing = useAllListingStore((state) => state.allListing);
  // const [favoritedIds, setFavoritedIds] = useState(new Set());
  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await apiFetch("/listing", { method: "GET" });
        setListings(data);
        // console.log(data);
        // setAllListing(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    }
    // async function fetchFavorites() {
    //   try {
    //     const res = await apiFetch("/favorites", { method: "GET" });
    //     const ids = new Set(res.data.map((listing) => listing.id));
    //     setFavoritedIds(ids);
    //   } catch (error) {
    //     console.error("Failed to fetch favorites:", error);
    //   }
    // }
    // fetchFavorites();

    fetchListings();
    // if (!allListing || allListing.length === 0) {
    //   fetchListings();
    // } else {
    //   setListings(allListing);
    // }
  }, []);
  // const handleFavoriteToggle = async (listingId) => {
  //   try {
  //     if (favoritedIds.has(listingId)) {
  //       await apiFetch(`/favorites/${listingId}`, { method: "DELETE" });
  //       setFavoritedIds((prev) => {
  //         const newSet = new Set(prev);
  //         newSet.delete(listingId);
  //         return newSet;
  //       });
  //     } else {
  //       await apiFetch(`/favorites/${listingId}`, { method: "POST" });
  //       setFavoritedIds((prev) => new Set(prev).add(listingId));
  //     }
  //   } catch (err) {
  //     console.error("Favorite toggle failed:", err);
  //   }
  // };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured stays
          </h2>
          <p className="text-gray-600">
            Discover our most popular accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listing/${listing.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={listing.imageUrls[0] || "/placeholder.svg"}
                    alt={listing.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {listing.superhost && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                      Superhost
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {listing.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    {listing.location}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    Hosted by {listing.host.name}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${listing.price}
                      </span>
                      <span className="text-gray-600 text-sm"> / night</span>
                    </div>
                    {/* <Button
                      variant={"default"}
                      className=" bg-black z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteToggle(listing.id);
                      }}
                    >
                      {favoritedIds.has(listing.id)
                        ? "Remove from favorite"
                        : "Add to favorite"}
                    </Button> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

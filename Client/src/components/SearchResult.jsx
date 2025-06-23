import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListingStore } from "@/store/useListingStore";

// const searchResults = [
//   {
//     id: 1,
//     title: "Stylish Studio in Manhattan",
//     location: "Manhattan, New York",
//     price: 150,
//     rating: 4.8,
//     reviews: 124,
//     images: ["/placeholder.svg?height=300&width=400"],
//     host: "Sarah",
//     superhost: true,
//     amenities: ["Wifi", "Kitchen", "Air conditioning"],
//   },
//   {
//     id: 2,
//     title: "Cozy Brooklyn Apartment",
//     location: "Brooklyn, New York",
//     price: 120,
//     rating: 4.7,
//     reviews: 89,
//     images: ["/placeholder.svg?height=300&width=400"],
//     host: "Michael",
//     superhost: false,
//     amenities: ["Wifi", "Kitchen", "Washer"],
//   },
//   {
//     id: 3,
//     title: "Luxury Penthouse with View",
//     location: "Upper East Side, New York",
//     price: 400,
//     rating: 4.9,
//     reviews: 156,
//     images: ["/placeholder.svg?height=300&width=400"],
//     host: "Emma",
//     superhost: true,
//     amenities: ["Wifi", "Kitchen", "Pool", "Gym"],
//   },
// ];

export function SearchResults() {
  const searchResults = useListingStore((state) => state.listings);
  return (
    <div className="space-y-6">
      {searchResults.map((listing) => (
        <Link
          key={listing.id}
          to={`/listing/${listing.id}`}
          className="block group"
        >
          <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-80 h-64 md:h-48">
                <img
                  src={listing.imageUrls[0] || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                {/* {listing.superhost && (
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
                    Superhost
                  </div>
                )} */}
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{listing.city}</p>
                    <p className="text-gray-500 text-sm mb-3">
                      Hosted by {listing.host.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    {/* <span className="text-sm font-medium">
                      {listing.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({listing.reviews})
                    </span> */}
                  </div>
                </div>

                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {listing.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div> */}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-semibold text-gray-900">
                      ${listing.price}
                    </span>
                    <span className="text-gray-600 text-sm"> / night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

import { apiFetch } from "@/api";
import { useTrendingDestinationStore } from "@/store/useTrendingDestinationStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function TrendingDestinations() {
  const [destinations, setDestinations] = useState([]);
  const { setTrending } = useTrendingDestinationStore();
  const trending = useTrendingDestinationStore((state) => state.trending);
  useEffect(() => {
    const getTrendingDestination = async () => {
      try {
        const res = await apiFetch("/listing/trending", {
          method: "GET",
        });
        setDestinations(res.trending);
        // setTrending(res.trending);
        console.log(res.trending);
      } catch (error) {
        console.log("Error occured:-> ", error);
      }
    };
    // if (!trending || trending.length === 0) {
    getTrendingDestination();
    // } else {
    // setDestinations(trending);
    // }
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trending destinations
          </h2>
          <p className="text-gray-600">
            Most popular choices for travelers from your country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              to={`/listing/${destination.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={destination.imageUrls[0] || "/placeholder.svg"}
                  alt={destination.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{destination.title}</h3>
                  <p className="text-sm opacity-90">
                    ${destination.price}/night
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/api";
import { useNavigate } from "react-router-dom";
import { useListingStore } from "@/store/useListingStore";
export function SearchHero() {
  const { setListings } = useListingStore();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: "",
    dateFrom: "",
    dateTo: "",
    guests: "",
  });
  const { city, guests, dateFrom, dateTo } = searchData;

  const query = new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(guests && { guests }),
    ...(city && { city }),
  }).toString();
  const onClickHandler = async () => {
    const res = await apiFetch(`/listing?${query}`, {
      method: "GET",
    });
    console.log(res);
    setListings(res);

    if (res.length > 0) navigate("/result");
  };

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find your next stay
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search low prices on hotels, homes and much more...
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search destinations"
                    className="pl-10 h-12"
                    value={searchData.city}
                    onChange={(e) =>
                      setSearchData({ ...searchData, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-10 h-12"
                    value={searchData.dateFrom}
                    onChange={(e) =>
                      setSearchData({ ...searchData, dateFrom: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    className="pl-10 h-12"
                    value={searchData.dateTo}
                    onChange={(e) =>
                      setSearchData({ ...searchData, dateTo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Add guests"
                    className="pl-10 h-12"
                    value={searchData.guests}
                    onChange={(e) =>
                      setSearchData({ ...searchData, guests: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={onClickHandler}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl text-lg font-medium flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

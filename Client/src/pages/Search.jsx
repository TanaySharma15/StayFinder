import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";
import { SearchFilters } from "@/components/SearchFilter";
import { SearchResults } from "@/components/SearchResult";
import { MapView } from "@/components/MapView";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState();
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SearchFilters />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            300+ stays in New York
          </h1>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center space-x-2"
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center space-x-2"
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="w-4 h-4 mr-2" />
              {showMap ? "Hide map" : "Show map"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`${viewMode === "map" ? "lg:w-1/2" : "w-full"} ${
              showMap ? "hidden lg:block" : ""
            }`}
          >
            <SearchResults />
          </div>

          {(viewMode === "map" || showMap) && (
            <div
              className={`${viewMode === "map" ? "lg:w-1/2" : "w-full"} ${
                showMap ? "h-96 lg:h-auto" : ""
              }`}
            >
              <MapView />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

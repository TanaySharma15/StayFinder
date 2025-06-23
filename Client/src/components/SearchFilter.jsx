import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, ChevronDown } from "lucide-react";

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([50, 500]);

  return (
    <div className="border-b border-gray-200 bg-white sticky  z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 py-4 overflow-x-auto">
          {/* Price Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>Price</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-semibold">Price range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Property Type */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <span>Type of place</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <h3 className="font-semibold">Type of place</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Entire place</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Private room</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Shared room</span>
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* More Filters */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            <span>More filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

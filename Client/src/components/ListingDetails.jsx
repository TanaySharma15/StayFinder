import { Wifi, Car, Tv, Wind, Waves, Mountain } from "lucide-react";

const amenityIcons = {
  Wifi: Wifi,
  Kitchen: Tv,
  "Air conditioning": Wind,
  Pool: Waves,
  "Mountain view": Mountain,
  Parking: Car,
};

export function ListingDetails({ description, amenities, rules }) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="border-b border-gray-200 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          About this place
        </h2>
        <div className="prose prose-gray max-w-none">
          {description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="border-b border-gray-200 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          What this place offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity, index) => {
            const Icon = amenityIcons[amenity] || Tv;
            return (
              <div key={index} className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* House Rules */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          House rules
        </h2>
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <p key={index} className="text-gray-700">
              {rule}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

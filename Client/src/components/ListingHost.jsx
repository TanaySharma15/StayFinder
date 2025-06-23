import { Star, Shield } from "lucide-react";

export function ListingHost({ host }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center space-x-4">
        <img
          src={host.avatar || "/placeholder.svg"}
          alt={host.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Hosted by {host.name}
          </h2>
          <p className="text-gray-600 text-sm">{host.joinedDate}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{host.rating}</span>
              <span className="text-sm text-gray-500">
                ({host.reviews} reviews)
              </span>
            </div>
            {host.superhost && (
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-rose-500" />
                <span className="text-sm font-medium text-rose-500">
                  Superhost
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

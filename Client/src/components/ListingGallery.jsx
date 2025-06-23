import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid3X3, Share, Heart } from "lucide-react";

export function ListingGallery({ images }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Main listing photo"
            width={800}
            height={600}
            className="w-full h-64 md:h-full object-cover hover:brightness-90 transition-all cursor-pointer"
          />
        </div>

        {/* Side Images */}
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="hidden md:block">
            <img
              src={image || "/placeholder.svg"}
              alt={`Listing photo ${index + 2}`}
              width={400}
              height={300}
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/90 hover:bg-white"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/90 hover:bg-white"
        >
          <Heart className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Show All Photos Button */}
      <Button
        variant="secondary"
        className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
        onClick={() => setShowAllPhotos(true)}
      >
        <Grid3X3 className="w-4 h-4 mr-2" />
        Show all photos
      </Button>
    </div>
  );
}

import { apiFetch } from "@/api";
import { BookingCard } from "@/components/BookingCard";
import { ListingDetails } from "@/components/ListingDetails";
import { ListingGallery } from "@/components/ListingGallery";
import { ListingHost } from "@/components/ListingHost";
import { ListingReviews } from "@/components/ListingReview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Mock data - in real app, this would come from API

export default function ListingPage() {
  const [listing, setListing] = useState({});
  const params = useParams();
  const id = params.listingId;
  useEffect(() => {
    const getListingById = async () => {
      const res = await apiFetch(`/listing/${id}`, {
        method: "GET",
      });
      console.log(res.data);
      setListing(res.data);
    };
    getListingById();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {listing.title}
          </h1>
          <p className="text-gray-600">{listing.location}</p>
        </div>

        {/* Gallery */}
        {listing.imageUrls && <ListingGallery images={listing.imageUrls} />}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            {/* <ListingHost host={listing.host} /> */}
            {listing.description && listing.amenities && listing.rules && (
              <ListingDetails
                description={listing.description}
                amenities={listing.amenities}
                rules={listing.rules}
              />
            )}
            {/* <ListingReviews
              rating={listing.rating}
              reviewCount={listing.reviews}
            /> */}
          </div>

          <div className="lg:col-span-1">
            <BookingCard
              listingId={id}
              price={listing.price}
              rating={listing.rating}
              reviews={listing.reviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

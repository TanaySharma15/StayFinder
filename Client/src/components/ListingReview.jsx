import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    user: {
      name: "John",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    date: "October 2023",
    rating: 5,
    comment:
      "Amazing place! Sarah was a wonderful host and the apartment was exactly as described. Perfect location and very clean.",
  },
  {
    id: 2,
    user: {
      name: "Emily",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    date: "September 2023",
    rating: 5,
    comment:
      "Great stay in Manhattan. The apartment is modern and well-equipped. Would definitely recommend!",
  },
  {
    id: 3,
    user: {
      name: "Michael",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    date: "August 2023",
    rating: 4,
    comment:
      "Nice place, good location. Only minor issue was the noise from the street, but overall a great experience.",
  },
];

export function ListingReviews({ rating, reviewCount }) {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Star className="w-6 h-6 fill-current text-yellow-400" />
        <span className="text-2xl font-semibold">{rating}</span>
        <span className="text-gray-600">({reviewCount} reviews)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={review.user.avatar || "/placeholder.svg"}
                alt={review.user.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900">
                  {review.user.name}
                </div>
                <div className="text-sm text-gray-600">{review.date}</div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      <Button variant="outline" className="mt-6">
        Show all {reviewCount} reviews
      </Button>
    </div>
  );
}

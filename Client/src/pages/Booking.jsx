import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, CreditCard, Shield } from "lucide-react";

// Mock booking data
const bookingData = {
  listing: {
    id: 1,
    title: "Stylish Studio in Manhattan",
    location: "Manhattan, New York, United States",
    image: "/placeholder.svg?height=300&width=400",
    host: "Sarah",
    rating: 4.8,
    reviews: 124,
    superhost: true,
  },
  dates: {
    checkIn: "2024-12-15",
    checkOut: "2024-12-20",
    nights: 5,
  },
  guests: 2,
  pricing: {
    basePrice: 150,
    nights: 5,
    subtotal: 750,
    cleaningFee: 50,
    serviceFee: 112,
    taxes: 89,
    total: 1001,
  },
};

export default function BookingPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Confirm and pay
              </h1>
              <p className="text-gray-600">
                Your trip is protected by AirCover
              </p>
            </div>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Your trip</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Dates</div>
                    <div className="text-gray-600">
                      {new Date(bookingData.dates.checkIn).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        bookingData.dates.checkOut
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-600 hover:text-rose-700"
                  >
                    Edit
                  </Button>
                </div>

                <Separator />

                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-gray-600">
                      {bookingData.guests} guests
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-600 hover:text-rose-700"
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Pay with</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-rose-600"
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Credit or debit card</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-rose-600"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      P
                    </div>
                    <span className="font-medium">PayPal</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card number
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry date
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Cancellation policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Free cancellation for 48 hours. Cancel before Dec 13 for a
                  partial refund.
                </p>
              </CardContent>
            </Card>

            {/* Confirm Button */}
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 text-lg font-medium">
              Confirm and pay
            </Button>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardContent className="p-6">
                {/* Listing Info */}
                <div className="flex space-x-4 mb-6">
                  <div className="relative">
                    <img
                      src={bookingData.listing.image || "/placeholder.svg"}
                      alt={bookingData.listing.title}
                      width={120}
                      height={90}
                      className="w-30 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {bookingData.listing.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {bookingData.listing.location}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="text-sm font-medium">
                          {bookingData.listing.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({bookingData.listing.reviews})
                        </span>
                      </div>
                      {bookingData.listing.superhost && (
                        <Badge variant="secondary" className="text-xs">
                          Superhost
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Price details</h4>

                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      ${bookingData.pricing.basePrice} x{" "}
                      {bookingData.pricing.nights} nights
                    </span>
                    <span className="text-gray-700">
                      ${bookingData.pricing.subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Cleaning fee</span>
                    <span className="text-gray-700">
                      ${bookingData.pricing.cleaningFee}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Service fee</span>
                    <span className="text-gray-700">
                      ${bookingData.pricing.serviceFee}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Taxes</span>
                    <span className="text-gray-700">
                      ${bookingData.pricing.taxes}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total (USD)</span>
                    <span>${bookingData.pricing.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

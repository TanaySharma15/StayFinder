import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Star } from "lucide-react";
import { apiFetch } from "@/api";
import { toast } from "react-toastify";

export function BookingCard({ listingId, price, rating, reviews }) {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState(1);

  const handleBooking = async () => {
    const bookingData = {
      dateFrom: checkIn?.toISOString(),
      dateTo: checkOut?.toISOString(),
      guests: guests,
    };
    // console.log(bookingData);

    try {
      const res = await apiFetch(`/bookings/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bookingData,
      });

      // console.log("Booking response:", result);
      toast.success("Booking Confirmed!");
    } catch (error) {
      toast.error("Already booked");
    }
  };
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const subtotal = nights * price;
  const cleaningFee = 50;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <div className="sticky top-32">
      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-semibold">${price}</span>
            <span className="text-gray-600"> night</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 justify-start border-r border-gray-300 rounded-none"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold text-gray-900 uppercase">
                      Check-in
                    </div>
                    <div className="text-sm text-gray-600">
                      {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 justify-start rounded-none"
                >
                  <div className="text-left">
                    <div className="text-xs font-semibold text-gray-900 uppercase">
                      Check-out
                    </div>
                    <div className="text-sm text-gray-600">
                      {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) =>
                    date < new Date() || (checkIn && date <= checkIn)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-14 justify-start border border-gray-300 rounded-lg"
              >
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-900 uppercase">
                    Guests
                  </div>
                  <div className="text-sm text-gray-600">
                    {guests} guest{guests !== 1 ? "s" : ""}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-sm text-gray-600">
                      Ages 13 or above
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Reserve Button */}
          <div onClick={handleBooking}>
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 text-lg font-medium">
              Reserve
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            You won't be charged yet
          </p>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-700">
                  ${price} x {nights} nights
                </span>
                <span className="text-gray-700">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Cleaning fee</span>
                <span className="text-gray-700">${cleaningFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Service fee</span>
                <span className="text-gray-700">${serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

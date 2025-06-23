import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  MapPin,
  DollarSign,
  Home,
  Wifi,
  Car,
  Tv,
  Wind,
} from "lucide-react";

const amenityOptions = [
  { id: "wifi", label: "Wifi", icon: Wifi },
  { id: "parking", label: "Free parking", icon: Car },
  { id: "tv", label: "TV", icon: Tv },
  { id: "ac", label: "Air conditioning", icon: Wind },
  { id: "kitchen", label: "Kitchen", icon: Home },
];

export default function HostPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
    propertyType: "",
    guests: 1,
    amenities: [],
    images: [],
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleAmenityToggle = (amenityId) => {
    setListingData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your listing
          </h1>
          <p className="text-gray-600">
            Share your space with travelers from around the world
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Steps */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {/* Step 1: Property Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    What type of place will you host?
                  </h2>
                  <p className="text-gray-600">
                    Choose the option that best describes your space
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Entire place", "Private room", "Shared room"].map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setListingData({ ...listingData, propertyType: type })
                        }
                        className={`p-6 border-2 rounded-xl text-left transition-colors ${
                          listingData.propertyType === type
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Home className="w-8 h-8 mb-3 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">{type}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {type === "Entire place" &&
                            "Guests have the whole place to themselves"}
                          {type === "Private room" &&
                            "Guests have their own room in a home"}
                          {type === "Shared room" &&
                            "Guests sleep in a room shared with others"}
                        </p>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Step 2: city */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Where's your place located?
                  </h2>
                  <p className="text-gray-600">
                    Your address is only shared with guests after they book
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your city"
                      className="pl-10 h-12"
                      value={listingData.city}
                      onChange={(e) =>
                        setListingData({
                          ...listingData,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter your state"
                        className="pl-10 h-12"
                        value={listingData.state}
                        onChange={(e) =>
                          setListingData({
                            ...listingData,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="max-w-md mx-auto">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter your country"
                        className="pl-10 h-12"
                        value={listingData.country}
                        onChange={(e) =>
                          setListingData({
                            ...listingData,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Basic Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Share some basics about your place
                  </h2>
                  <p className="text-gray-600">
                    You'll add more details later, like bed types
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-medium">Guests</span>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          setListingData({
                            ...listingData,
                            guests: Math.max(1, listingData.guests - 1),
                          })
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {listingData.guests}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          setListingData({
                            ...listingData,
                            guests: listingData.guests + 1,
                          })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Amenities */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Tell guests what your place has to offer
                  </h2>
                  <p className="text-gray-600">
                    You can add more amenities after you publish your listing
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {amenityOptions.map((amenity) => {
                    const Icon = amenity.icon;
                    const isSelected = listingData.amenities.includes(
                      amenity.id
                    );

                    return (
                      <button
                        key={amenity.id}
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={`p-4 border-2 rounded-xl text-left transition-colors ${
                          isSelected
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {amenity.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Photos */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Add some photos of your place
                  </h2>
                  <p className="text-gray-600">
                    You'll need at least 5 photos to get started
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Drag your photos here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Choose at least 5 photos
                    </p>
                    <Button variant="outline">Upload from your device</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Title, Description & Price */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Now, let's give your place a title
                  </h2>
                  <p className="text-gray-600">
                    Short titles work best. Have fun with it—you can always
                    change it later
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      type="text"
                      placeholder="Give your listing a catchy title"
                      value={listingData.title}
                      onChange={(e) =>
                        setListingData({
                          ...listingData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe your place to guests"
                      rows={4}
                      value={listingData.description}
                      onChange={(e) =>
                        setListingData({
                          ...listingData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per night
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={listingData.price}
                        onChange={(e) =>
                          setListingData({
                            ...listingData,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="btn-primary">
              Next
            </Button>
          ) : (
            <Button
              className="btn-primary"
              onClick={() => {
                console.log(listingData);
              }}
            >
              Publish Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

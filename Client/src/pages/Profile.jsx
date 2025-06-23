import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, MapPin, Calendar, Heart } from "lucide-react";
import { apiFetch } from "@/api";
import { useUserStore } from "@/store/useUserStore";
import { useUserListingStore } from "@/store/useUserListingStore";
import { useUserBookingStore } from "@/store/useUserBookingStore";
import { useUserFavorite } from "@/store/useUserFavoriteStore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userListings, setUserListings] = useState([{}]);
  const [userBookings, setUserBookings] = useState([{}]);
  const [wishlistItems, setWishlistItems] = useState([{}]);
  const user = useUserStore((state) => state.user);
  const { setUser } = useUserStore();
  const { setUserListing } = useUserListingStore();
  const userListing = useUserListingStore((state) => state.userListing);
  const { setUserBooking } = useUserBookingStore();
  const userBooking = useUserBookingStore((state) => state.userBooking);
  // const { setUserFavorite } = useUserFavorite();
  // const userFavorite = useUserFavorite((state) => state.userFavorite);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({});
  const { clearUser } = useUserStore();
  let listingsLength;
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await apiFetch("/user/profile", {
        method: "GET",
      });
      // console.log(res.data);
      setUserInfo(res.data);
    };
    const getUserListings = async () => {
      const res = await apiFetch("/user/listings", {
        method: "GET",
      });
      const data = res.data.listings;
      listingsLength = data.length;
      setUserListings(data);
      setUserListing(data);
      // console.log("listings: ", data);
    };
    const getUserBookings = async () => {
      const res = await apiFetch("/bookings", {
        method: "GET",
      });
      // console.log(res.data);
      setUserBookings(res.data);
      setUserBooking(res.data);
    };
    const getUserFavorites = async () => {
      const res = await apiFetch("/favorites", {
        method: "GET",
      });
      const data = res.favorites;
      console.log(data);
      setWishlistItems(data);
      // setUserFavorite(data);
    };

    if (!user?.id) {
      getUserDetails();
    } else {
      setUserInfo(user);
    }
    if (userListing.length !== listingsLength) {
      getUserListings();
    } else {
      setUserListings(userListing);
    }
    if (!userBooking || userBooking.length === 0) {
      getUserBookings();
    } else {
      setUserBookings(userBooking);
    }

    // if (!userFavorite || userFavorite.length === 0) {
    getUserFavorites();
    // } else {
    //   setWishlistItems(userFavorite);
    // }
  }, []);
  const updateUser = async () => {
    const res = await apiFetch("/user/profile", {
      method: "PUT",
      body: updatedUserInfo,
    });
    const response = await apiFetch("/user/profile", {
      method: "GET",
    });
    // console.log(res.data);
    clearUser();
    setUser(response.data);
    setUserInfo(response.data);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={userInfo.avatar}
                alt="Profile"
                width={120}
                height={120}
                className="w-30 h-30 rounded-full"
              />
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-white border-2 border-gray-200 text-gray-600 hover:text-gray-900"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userInfo.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-rose-100 text-rose-700"
                >
                  {userInfo.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <span>{new Date(userInfo.createdAt).getDate()}/</span>
                    <span>{new Date(userInfo.createdAt).getMonth()}/</span>
                    <span>{new Date(userInfo.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{userInfo.bio}</p>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={updatedUserInfo.name}
                    onChange={(e) =>
                      setUpdatedUserInfo({
                        ...updatedUserInfo,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    value={updatedUserInfo.location}
                    onChange={(e) =>
                      setUpdatedUserInfo({
                        ...updatedUserInfo,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button className="btn-primary" onClick={() => updateUser()}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                My Listings
              </h2>{" "}
              <Link to="/host">
                <Button asChild className="btn-primary">
                  <span>Add New Listing</span>
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative">
                    {listing.imageUrls && (
                      <img
                        src={listing.imageUrls[0] || "/placeholder.svg"}
                        alt={listing.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <Badge
                      className={`absolute top-3 right-3 ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {listing.city}, {listing.country}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold">${listing.price}</span>
                        <span className="text-gray-600 text-sm"> / night</span>
                      </div>
                      <div
                        onClick={async () => {
                          const result = await Swal.fire({
                            title: "Are you sure?",
                            text: "This listing will be permanently deleted!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          });

                          if (result.isConfirmed) {
                            try {
                              const res = await apiFetch(
                                `/listing/${listing.id}`,
                                {
                                  method: "DELETE",
                                }
                              );

                              console.log("Deleted listing:", res.message);
                              setUserListings((prev) =>
                                prev.filter((l) => l.id !== listing.id)
                              );
                              setUserListing(userListings);
                            } catch (err) {
                              toast.error(
                                "Cannot delete listing! Already booked"
                              );
                            }
                          } else {
                            toast.error("Cannot delete! Try later");
                          }
                        }}
                      >
                        <Button>Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Bookings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBookings.map(
                (booking) =>
                  booking.listing && (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={
                            booking.listing.imageUrls[0] || "/placeholder.svg"
                          }
                          alt={booking.listing.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${
                            booking.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {booking.listing.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {booking.listing.city}, {booking.listing.country}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {new Date(booking.dateFrom).getDate()}/
                          {new Date(booking.dateFrom).getMonth()}/
                          {new Date(booking.dateFrom).getFullYear()} -
                          {new Date(booking.dateTo).getDate()}/
                          {new Date(booking.dateTo).getDate()}/
                          {new Date(booking.dateTo).getDate()}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            ${booking.listing.price} / night
                          </span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Wishlist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map(
                (item) =>
                  item.listing && (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={item.listing.imageUrls[0] || "/placeholder.svg"}
                          alt={item.listing.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4 fill-current text-rose-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.listing.title.substring(0, 30)}...
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.listing.city}, {item.listing.country}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold">
                              ${item.listing.price}
                            </span>
                            <span className="text-gray-600 text-sm">
                              {" "}
                              / night
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

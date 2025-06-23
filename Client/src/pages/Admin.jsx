import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Users,
  Home,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
  Ban,
  UserCheck,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiFetch } from "@/api";
import { useNavigate } from "react-router-dom";

// Mock data for bookings
const bookingsData = [
  {
    id: 1,
    guestName: "Alice Brown",
    guestEmail: "alice@example.com",
    listingName: "Cozy Downtown Apartment",
    checkIn: "2024-12-15",
    checkOut: "2024-12-20",
    amount: 600,
    status: "confirmed",
    bookingDate: "2024-11-20",
  },
  {
    id: 2,
    guestName: "Bob Wilson",
    guestEmail: "bob@example.com",
    listingName: "Modern Loft Space",
    checkIn: "2024-12-22",
    checkOut: "2024-12-25",
    amount: 800,
    status: "pending",
    bookingDate: "2024-11-25",
  },
  {
    id: 3,
    guestName: "Carol Davis",
    guestEmail: "carol@example.com",
    listingName: "Beach House Villa",
    checkIn: "2025-01-05",
    checkOut: "2025-01-10",
    amount: 1750,
    status: "cancelled",
    bookingDate: "2024-12-01",
  },
  {
    id: 4,
    guestName: "Daniel Lee",
    guestEmail: "daniel@example.com",
    listingName: "Mountain Cabin Retreat",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    amount: 540,
    status: "confirmed",
    bookingDate: "2024-12-05",
  },
  {
    id: 5,
    guestName: "Eva Martinez",
    guestEmail: "eva@example.com",
    listingName: "Historic Townhouse",
    checkIn: "2025-02-01",
    checkOut: "2025-02-04",
    amount: 480,
    status: "confirmed",
    bookingDate: "2024-12-08",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [listingFilter, setListingFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [totalUser, setTotalUser] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [revenueThisMonth, setRevenueThisMonth] = useState(0);
  const [userData, setUserData] = useState([{}]);
  const [listingData, setListingData] = useState([{}]);
  const [bookingData, setBookingData] = useState([{}]);
  useEffect(() => {
    const getStats = async () => {
      const res = await apiFetch("/admin/dashboard", {
        method: "GET",
      });
      setTotalUser(res.totalUser);
      setTotalBookings(res.totalBooking);
      setTotalListings(res.totalListing);
      setRevenueThisMonth(res.revenueThisMonth);
    };
    getStats();
    const getUserData = async () => {
      const res = await apiFetch("/admin/getUsers", {
        method: "GET",
      });
      setUserData(res.data);
    };
    getUserData();
    const getListingData = async () => {
      const res = await apiFetch("/admin/listings", {
        method: "GET",
      });
      setListingData(res.listing);
    };
    getListingData();
    const getBookingData = async () => {
      const res = await apiFetch("/admin/bookings", {
        method: "GET",
      });
      console.log(res.booking);
      setBookingData(res.booking);
    };
    getBookingData();
  }, []);
  const dashboardStats = [
    {
      title: "Total Users",
      value: totalUser,
      icon: Users,
      change: "+12%",
      color: "bg-blue-500",
    },
    {
      title: "Total Listings",
      value: totalListings,
      icon: Home,
      change: "+8%",
      color: "bg-green-500",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      change: "+15%",
      color: "bg-purple-500",
    },
    {
      title: "Revenue This Month",
      value: "$" + revenueThisMonth,
      icon: DollarSign,
      change: "+23%",
      color: "bg-rose-500",
    },
  ];
  const revenueData = [
    { month: "Jan", revenue: 450 },
    { month: "Feb", revenue: 520 },
    { month: "Mar", revenue: 2800 },
    { month: "Apr", revenue: 1010 },
    { month: "May", revenue: 4550 },
    { month: "Jun", revenue: 670 },
    { month: "Jul", revenue: revenueThisMonth },
  ];
  const getStatusBadge = (status) => {
    const statusConfig = {
      ACTIVE: {
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      BAN: {
        variant: "destructive",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      },
      PENDING: {
        variant: "secondary",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      },
      CONFIRM: {
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      CANCELLED: {
        variant: "destructive",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const getRoleBadge = (role) => {
    return (
      <Badge
        variant="outline"
        className={
          role === "Host"
            ? "border-blue-200 text-blue-700"
            : "border-purple-200 text-purple-700"
        }
      >
        {role}
      </Badge>
    );
  };

  //   const matchesSearch =
  //     listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     listing.hostEmail.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter =
  //     listingFilter === "all" || listing.status === listingFilter;
  //   return matchesSearch && matchesFilter;
  // });

  const filteredBookings = bookingsData.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.listingName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      bookingFilter === "all" || booking.status === bookingFilter;
    return matchesSearch && matchesFilter;
  });
  const getUserProfile = (userId) => {
    console.log(userId);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your platform with comprehensive insights and controls
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px] bg-white shadow-sm">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="listings"
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Listings</span>
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  totalUser && (
                    <Card
                      key={index}
                      className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">
                              {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                              {stat.value}
                            </p>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-green-600">
                                {stat.change}
                              </span>
                              <span className="text-sm text-gray-500">
                                from last month
                              </span>
                            </div>
                          </div>
                          <div className={`p-4 rounded-full ${stat.color}`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                );
              })}
            </div>

            {/* Revenue Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Revenue Overview
                </CardTitle>
                <p className="text-gray-600">
                  Monthly revenue trends for the current year
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#f43f5e"
                        strokeWidth={3}
                        dot={{ fill: "#f43f5e", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#f43f5e", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      User Management
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Manage platform users and their permissions
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-full sm:w-64 bg-gray-50 border-gray-200 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2 bg-white"
                        >
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem onClick={() => setUserFilter("all")}>
                          All Users
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setUserFilter("banned")}
                        >
                          Banned Users
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="font-semibold text-gray-900">
                          User
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Role
                        </TableHead>

                        <TableHead className="font-semibold text-gray-900">
                          Join Date
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Bookings
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Total Spent
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData &&
                        userData.map((user) => (
                          <TableRow
                            key={user.id}
                            className="border-gray-100 hover:bg-gray-50"
                          >
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  width={40}
                                  height={40}
                                  className="w-10 h-10 rounded-full ring-2 ring-gray-100"
                                />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {user.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell className="text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {user?.bookings?.length}
                            </TableCell>
                            <TableCell className="font-medium text-gray-900">
                              ${" "}
                              {user?.bookings?.reduce((sum, booking) => {
                                return sum + booking?.listing?.price || 0;
                              }, 0)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                >
                                  <DropdownMenuItem
                                    onClick={() => getUserProfile(user.id)}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  {user.isBan === false ? (
                                    <DropdownMenuItem className="text-red-600">
                                      <Ban className="w-4 h-4 mr-2" />
                                      Ban User
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">
                                      <UserCheck className="w-4 h-4 mr-2" />
                                      Unban User
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Listing Management
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Monitor and manage all property listings
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search listings..."
                        className="pl-10 w-full sm:w-64 bg-gray-50 border-gray-200 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2 bg-white"
                        >
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem
                          onClick={() => setListingFilter("all")}
                        >
                          All Listings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setListingFilter("active")}
                        >
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setListingFilter("pending")}
                        >
                          Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="font-semibold text-gray-900">
                          Listing
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Location
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Price/Night
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Host Email
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Bookings
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listingData.map((listing) => (
                        <TableRow
                          key={listing?.id}
                          className="border-gray-100 hover:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-5">
                              <img
                                src={
                                  listing?.imageUrls?.[0] || "/placeholder.svg"
                                }
                                alt={listing?.title}
                                width={60}
                                height={45}
                                className="w-15 h-12 rounded-lg object-cover ring-2 ring-gray-100"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 space-x-2">
                            {listing?.city},{listing?.country}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            ${listing?.price}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {listing?.host?.email}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(listing?.status)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {listing?.bookings?.length}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Listing
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Booking Management
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Track and manage all platform bookings
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search bookings..."
                        className="pl-10 w-full sm:w-64 bg-gray-50 border-gray-200 focus:bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2 bg-white"
                        >
                          <Filter className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem
                          onClick={() => setBookingFilter("all")}
                        >
                          All Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setBookingFilter("confirmed")}
                        >
                          Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setBookingFilter("pending")}
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setBookingFilter("cancelled")}
                        >
                          Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="font-semibold text-gray-900">
                          Booked By
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Guests
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Listing
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Check-in
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Check-out
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Amount
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingData.map((booking) => (
                        <TableRow
                          key={booking.id}
                          className="border-gray-100 hover:bg-gray-50"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking?.user?.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking?.user?.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">
                                {booking?.guests}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {booking?.listing?.title}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(booking?.dateFrom).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(booking?.dateTo).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            ${booking?.listing?.price}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(booking?.listing?.status)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

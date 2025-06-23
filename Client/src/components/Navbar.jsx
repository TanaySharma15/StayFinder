import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/useUserStore";

export function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useUserStore();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-rose-500 text-2xl font-bold">airbnb</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div
              className={`flex items-center bg-white border rounded-full shadow-sm hover:shadow-md transition-shadow ${
                isSearchFocused ? "shadow-md" : ""
              }`}
            >
              <button className="px-6 py-2 text-sm font-medium border-r border-gray-300">
                Anywhere
              </button>
              <button className="px-6 py-2 text-sm font-medium border-r border-gray-300">
                Any week
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-600">
                Add guests
              </button>
              <button className="p-2 bg-rose-500 text-white rounded-full m-2">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/host"
              className="hidden md:block text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              Airbnb your home
            </Link>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Globe className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 rounded-full border-gray-300"
                >
                  <Menu className="w-4 h-4" />
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!user?.id && (
                  <div>
                    <DropdownMenuItem asChild>
                      <Link to="/signup">Sign up</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Log in</Link>
                    </DropdownMenuItem>
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/host">Airbnb your home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

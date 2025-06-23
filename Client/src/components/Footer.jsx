import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  AirCover
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Anti-discrimination
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Disability support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Community forum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  New features
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900">
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 Airbnb Clone. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Privacy
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Terms
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

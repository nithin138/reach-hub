import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Customers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Customers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/user/services" className="text-gray-600 hover:text-primary-600">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/user" className="text-gray-600 hover:text-primary-600">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Providers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/provider" className="text-gray-600 hover:text-primary-600">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/provider/services" className="text-gray-600 hover:text-primary-600">
                  Manage Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold text-primary-600 mr-4">
                ServiceHub
              </span>
              <p className="text-gray-600">
                © {new Date().getFullYear()} ServiceHub. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-primary-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

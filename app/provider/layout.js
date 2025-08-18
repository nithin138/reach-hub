'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Package,
  User,
  Menu,
  ChevronLeft,
} from 'lucide-react'

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/provider/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', href: '/provider/enquiries', icon: FileText },
    { name: 'Services', href: '/provider/services', icon: Briefcase },
    { name: 'Products', href: '/provider/products', icon: Package },
    { name: 'Provider Profile', href: '/provider/profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex gap-2  overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? 'w-20' : 'w-72'
          } transition-all duration-300 bg-white border-r flex flex-col h-max p-4 rounded-2xl sticky top-4`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <span className="text-xl font-bold text-blue-600">ReachHub</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-small transition-colors duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{name}</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

'use client'

import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePathname } from 'next/navigation'



export default function RootLayout({ children }) {
  const pathname = usePathname()
  console.log('Current Path:', pathname)
  const hideLayout = pathname?.startsWith('/auth/login') || pathname?.startsWith('/auth/register')
console.log('Hide Layout:', hideLayout)

  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {!hideLayout && <Navbar />}
            <main className="flex-1">{children}</main>
            {!hideLayout && <Footer />}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

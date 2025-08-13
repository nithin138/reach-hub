import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'ServiceHub - Connect with Local Service Providers',
  description: 'Find trusted local service providers or offer your services to customers in your area.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen ">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
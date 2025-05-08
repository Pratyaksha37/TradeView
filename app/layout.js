import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'CryptoTracker',
  description: 'Track crypto prices, market trends and news'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <Navbar/>
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

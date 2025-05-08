'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-gray-700 ${
      pathname === path ? 'bg-blue-600 text-white' : 'text-gray-300'
    }`

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">CryptoTracker</h1>
      <div className="flex space-x-4">
        <Link href="/" className={linkClass('/')}>Home</Link>
        <Link href="/market" className={linkClass('/market')}>Market</Link>
        <Link href="/converter" className={linkClass('/converter')}>Converter</Link>
        <Link href="/news" className={linkClass('/news')}>News</Link>
      </div>
    </nav>
  )
}

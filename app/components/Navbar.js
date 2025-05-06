'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold text-blue-600 cursor-pointer">TradeView</span>
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/market" className="text-gray-700 hover:text-blue-500">
            Market
          </Link>
          <Link href="/news" className="text-gray-700 hover:text-blue-500">
            News
          </Link>
        </div>
      </div>
    </nav>
  )
}

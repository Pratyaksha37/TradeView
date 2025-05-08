export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <div className="text-3xl font-bold">TradeView</div>
      <div className="space-x-6 text-lg">
        <a href="/" className="hover:text-blue-400 transition duration-300">Home</a>
        <a href="/market" className="hover:text-blue-400 transition duration-300">Market</a>
        <a href="/converter" className="hover:text-blue-400 transition duration-300">Convert</a>
        <a href="/news" className="hover:text-blue-400 transition duration-300">News</a>
      </div>
    </nav>
  )
}

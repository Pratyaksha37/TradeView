export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">TradeView</div>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/market" className="hover:underline">Market</a>
        <a href="/converter" className="hover:underline">Convert</a>
        <a href="/news" className="hover:underline">News</a>
      </div>
    </nav>
  )
}

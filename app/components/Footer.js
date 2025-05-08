export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-gray-400">© 2025 TradeView. All rights reserved.</p>
        <div className="flex space-x-4 text-gray-400">
          <a href="#" className="hover:text-white transition"><i className="fab fa-github"></i> GitHub</a>
          <a href="#" className="hover:text-white transition"><i className="fab fa-discord"></i> Discord</a>
        </div>
      </div>
    </footer>
  )
}

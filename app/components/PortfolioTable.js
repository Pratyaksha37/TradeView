'use client'

export default function PortfolioTable({ portfolioData }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {portfolioData.map(coin => {
            const value = coin.balance * coin.price
            
            return (
              <tr key={coin.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{coin.name}</div>
                      <div className="text-sm text-gray-500">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{coin.balance} {coin.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  {coin.change && (
                    <div className={`text-xs ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {coin.change >= 0 ? '+' : ''}{coin.change}%
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </td>
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
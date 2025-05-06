export default function PortfolioTable() {
    const coins = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        balance: 0.01741516,
        usd: 717.79,
        price: 41182.10,
        change: -5.93,
        allocation: 93.24,
        logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      },
      {
        name: 'Ethereum Classic',
        symbol: 'ETC',
        balance: 1.7337757,
        usd: 52.00,
        price: 29.99,
        change: -6.57,
        allocation: 6.76,
        logo: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        balance: 0.01741516,
        usd: 88.05,
        price: 410.52,
        change: -5.93,
        allocation: 8.24,
        logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      },
    ]
  
    return (
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Portfolio</h3>
        <div className="bg-white rounded-2xl shadow divide-y">
          {coins.map((coin) => (
            <div key={coin.name} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <img src={coin.logo} alt={coin.name} className="w-8 h-8" />
                <div>
                  <p className="font-medium">{coin.name}</p>
                  <p className="text-sm text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${coin.usd.toFixed(2)}</p>
                <p className="text-sm text-gray-400">{coin.balance} {coin.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-semibold">${coin.price.toLocaleString()}</p>
                <p className={`text-sm ${coin.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {coin.change}%
                </p>
              </div>
              <div className="text-right font-medium">
                {coin.allocation.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
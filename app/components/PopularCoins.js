'use client'

import { useEffect, useState } from 'react'

export default function PopularCoins() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false'
        )
        const data = await res.json()
        setCoins(data)
      } catch (err) {
        console.error('Failed to fetch coins:', err)
      }
    }

    fetchCoins()
  }, [])

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Cryptocurrencies</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h3 className="text-lg font-semibold">{coin.name}</h3>
                <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <p className="mt-2 text-xl font-medium">${coin.current_price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

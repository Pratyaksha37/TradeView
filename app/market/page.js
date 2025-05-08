'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MarketPage() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')

  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD', {
        headers: {
          authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        }
      })
      .then((res) => {
        const rawData = res.data.Data || []
        const data = rawData.map((coin) => ({
          name: coin.CoinInfo?.FullName || '',
          symbol: coin.CoinInfo?.Name || '',
          price: coin.RAW?.USD?.PRICE || 0
        }))
        setCoins(data)
      })
  }, [])

  const filtered = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Market</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coin..."
          className="p-2 bg-gray-700 text-white rounded w-full"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="desc">Price ↓</option>
          <option value="asc">Price ↑</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((coin) => (
          <div key={coin.symbol} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{coin.name}</h2>
            <p className="text-sm text-gray-400">{coin.symbol}</p>
            <p className="text-green-400 text-xl">${coin.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MarketPage() {
  const [coins, setCoins] = useState([])
  const [prices, setPrices] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [sortedBy, setSortedBy] = useState('price')
  const [sortDirection, setSortDirection] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const coinsPerPage = 10

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await axios.get(
        'https://min-api.cryptocompare.com/data/all/coinlist?apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
      )
      const coinArray = Object.values(res.data.Data)
      setCoins(coinArray.slice(0, 100))

      const topSymbols = coinArray.slice(0, 100).map((coin) => coin.Symbol).join(',')
      const priceRes = await axios.get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${topSymbols}&tsyms=USD&apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573`
      )
      setPrices(priceRes.data)
    }

    fetchCoins()
  }, [])

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const handleSort = (key) => setSortedBy(key)

  const toggleSortDirection = () =>
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')

  const filteredCoins = coins.filter(
    (coin) =>
      coin.CoinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.Symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCoins = filteredCoins.sort((a, b) => {
    const aPrice = prices[a.Symbol]?.USD || 0
    const bPrice = prices[b.Symbol]?.USD || 0
    const aName = a.CoinName.toLowerCase()
    const bName = b.CoinName.toLowerCase()

    let comparison = 0
    if (sortedBy === 'price') comparison = aPrice - bPrice
    else if (sortedBy === 'name') comparison = aName.localeCompare(bName)
    else if (sortedBy === 'change') comparison = Math.random() > 0.5 ? 1 : -1
    else if (sortedBy === 'marketCap') comparison = Math.random() > 0.5 ? 1 : -1

    return sortDirection === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage)
  const paginatedCoins = sortedCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  )

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Market</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-96"
        />

        <div className="flex space-x-4 items-center">
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
            <option value="change">Sort by 24h Change</option>
            <option value="marketCap">Sort by Market Cap</option>
          </select>
          <button
            onClick={toggleSortDirection}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="text-left">
              <th className="p-4">Coin</th>
              <th className="p-4">Price</th>
              <th className="p-4">Change (24h)</th>
              <th className="p-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoins.map((coin, i) => (
              <tr key={i} className="border-b hover:bg-gray-700">
                <td className="p-4 flex items-center">
                  {coin.ImageUrl && (
                    <img
                      src={`https://www.cryptocompare.com${coin.ImageUrl}`}
                      alt={coin.CoinName}
                      className="w-8 h-8 rounded mr-4"
                    />
                  )}
                  <span>
                    {coin.CoinName} ({coin.Symbol})
                  </span>
                </td>
                <td className="p-4">
                  {prices[coin.Symbol]?.USD
                    ? `$${prices[coin.Symbol].USD.toFixed(2)}`
                    : '...'}
                </td>
                <td className="p-4">
                  {Math.random() > 0.5 ? '+5.2%' : '-2.4%'}
                </td>
                <td className="p-4">
                  {Math.random() > 0.5 ? '$10B' : '$5B'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 rounded text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

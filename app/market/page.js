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
      try {
        const coinListResponse = await axios.get(
          'https://min-api.cryptocompare.com/data/all/coinlist?apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        )
        setCoins(Object.values(coinListResponse.data.Data))
      } catch (error) {
        console.error('Error fetching coin list:', error)
      }
    }

    const fetchPrices = async () => {
      try {
        const pricesResponse = await axios.get(
          'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP&tsyms=USD,EUR&apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        )
        setPrices(pricesResponse.data)
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    }

    fetchCoins()
    fetchPrices()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (key) => {
    setSortedBy(key)
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const filteredCoins = coins.filter(coin =>
    coin.CoinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.Symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedCoins = filteredCoins.sort((a, b) => {
    const aPrice = prices[a.Symbol]?.USD || 0
    const bPrice = prices[b.Symbol]?.USD || 0


    return sortDirection === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage)
  const currentCoins = sortedCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Market</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700 w-96" 
          />
        </div>
        <div className="flex space-x-4 items-center">
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            <option value="price">Sort by Price</option>
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
            {currentCoins.length > 0 ? (
              currentCoins.map((coin, i) => (
                <tr key={i} className="border-b hover:bg-gray-700">
                  <td className="p-4 flex items-center">
                    {coin.ImageUrl && (
                      <img
                        src={`https://www.cryptocompare.com${coin.ImageUrl}`}
                        alt={coin.CoinName}
                        className="w-8 h-8 rounded mr-4"
                      />
                    )}
                    <span>{coin.CoinName} ({coin.Symbol})</span>
                  </td>
                  <td className="p-4">
                    {prices[coin.Symbol]?.USD ? `$${prices[coin.Symbol].USD}` : 'Loading...'}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

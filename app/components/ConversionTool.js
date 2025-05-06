'use client'

import { useState, useEffect } from 'react'

export default function ConversionTool() {
  const [coins, setCoins] = useState([])
  const [amount, setAmount] = useState(1)
  const [fromCoin, setFromCoin] = useState('bitcoin')
  const [toCurrency, setToCurrency] = useState('usd')
  const [converted, setConverted] = useState(null)

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/list')
      const data = await res.json()
      setCoins(data.slice(0, 50)) // limit options
    }

    fetchCoins()
  }, [])

  const convert = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin}&vs_currencies=${toCurrency}`
      )
      const data = await res.json()
      const rate = data[fromCoin][toCurrency]
      setConverted(rate * amount)
    } catch (err) {
      console.error('Conversion failed:', err)
    }
  }

  return (
    <section className="p-6 bg-white my-8 max-w-xl mx-auto rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Crypto Converter</h2>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          className="p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <select
          className="p-2 border rounded"
          value={fromCoin}
          onChange={(e) => setFromCoin(e.target.value)}
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>

        <button
          onClick={convert}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Convert
        </button>

        {converted !== null && (
          <div className="mt-4 text-lg">
            {amount} {fromCoin.toUpperCase()} = {converted} {toCurrency.toUpperCase()}
          </div>
        )}
      </div>
    </section>
  )
}

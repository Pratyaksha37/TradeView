'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ConverterPage() {
  const [fromCurrency, setFromCurrency] = useState('BTC')
  const [toCurrency, setToCurrency] = useState('USD')
  const [amount, setAmount] = useState(1)
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [exchangeRates, setExchangeRates] = useState({})
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD,EUR,INR&apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573`
        )
        setExchangeRates(response.data)
      } catch (error) {
        console.error('Error fetching exchange rates:', error)
      }
      setLoading(false)
    }

    fetchExchangeRates()
  }, [fromCurrency, toCurrency]) 
  
  useEffect(() => {
    if (amount > 0 && exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency]
      setConvertedAmount(amount * rate)
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Crypto Converter</h2>
        <div className="space-y-4">
         
          <div className="flex space-x-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-700 bg-gray-700 text-white"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="p-2 rounded border border-gray-700 bg-gray-700 text-white"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="LTC">LTC</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-700 bg-gray-700 text-white"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
            </select>
            <button
              onClick={() => setAmount(amount)} 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Convert
            </button>
          </div>

          {loading ? (
            <div className="text-center text-white mt-4">Loading...</div>
          ) : (
            convertedAmount !== null && (
              <div className="text-center text-white mt-4">
                <p>
                  {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

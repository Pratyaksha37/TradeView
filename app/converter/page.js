'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ConverterPage() {
  const [coinList, setCoinList] = useState([])
  const [fromCoin, setFromCoin] = useState('BTC')
  const [toCoin, setToCoin] = useState('USD')
  const [amount, setAmount] = useState(1)
  const [converted, setConverted] = useState(null)

  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((res) => {
        const list = Object.keys(res.data.Data).slice(0, 100)
        setCoinList(list)
      })
  }, [])

  useEffect(() => {
    if (fromCoin && toCoin && amount) {
      axios
        .get(`https://min-api.cryptocompare.com/data/price?fsym=${fromCoin}&tsyms=${toCoin}`, {
          headers: {
            authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
          }
        })
        .then((res) => {
          setConverted(res.data[toCoin] * amount)
        })
    }
  }, [fromCoin, toCoin, amount])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Coin Converter</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={fromCoin}
          onChange={(e) => setFromCoin(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {coinList.map((coin) => (
            <option key={coin}>{coin}</option>
          ))}
        </select>
        <select
          value={toCoin}
          onChange={(e) => setToCoin(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option>USD</option>
          {coinList.map((coin) => (
            <option key={coin}>{coin}</option>
          ))}
        </select>
      </div>
      {converted !== null && (
        <p className="text-xl text-green-400">
          {amount} {fromCoin} = {converted.toFixed(4)} {toCoin}
        </p>
      )}
    </div>
  )
}

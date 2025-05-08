'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Card from './components/Card'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

export default function HomePage() {
  const [topCoins, setTopCoins] = useState([])
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=6&tsym=USD', {
        headers: {
          authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        }
      })
      .then((res) => {
        const coins = res.data.Data.map((coin) => ({
          name: coin.CoinInfo.FullName,
          symbol: coin.CoinInfo.Name,
          price: coin.RAW.USD.PRICE,
          imageUrl: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`
        }))
        setTopCoins(coins)
      })

    axios
      .get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30', {
        headers: {
          authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        }
      })
      .then((res) => {
        const history = res.data.Data.Data
        setChartData({
          labels: history.map((point) =>
            new Date(point.time * 1000).toLocaleDateString()
          ),
          datasets: [
            {
              label: 'BTC/USD',
              data: history.map((point) => point.close),
              borderColor: '#3b82f6',
              fill: false
            }
          ]
        })
      })
  }, [])

  return (
    <div className="space-y-10">
      <Card />

      <div>
        <h1 className="text-3xl font-bold mb-4">Top Coins</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={coin.imageUrl}
                  alt={coin.name}
                  className="w-10 h-10 mr-3 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-sm text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <p className="text-green-400 text-xl">${coin.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Bitcoin Price (30 Days)</h2>
        <div className="bg-gray-800 p-6 rounded">
          {chartData ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: 'white'
                    }
                  }
                },
                scales: {
                  x: {
                    ticks: {
                      color: 'white'
                    }
                  },
                  y: {
                    ticks: {
                      color: 'white'
                    }
                  }
                }
              }}
            />
          ) : (
            <p className="text-gray-400">Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  )
}

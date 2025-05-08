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
    const coinSymbols = ['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP']
    const fsyms = coinSymbols.join(',')
    const tsyms = 'USD'

    axios
      .get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`, {
        headers: {
          authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
        }
      })
      .then((res) => {
        const raw = res.data.RAW
        const display = res.data.DISPLAY

        const coins = Object.keys(raw).map((symbol) => ({
          symbol,
          name: display[symbol]?.USD?.FROMSYMBOL || symbol,
          price: raw[symbol].USD.PRICE,
          imageUrl: `https://www.cryptocompare.com${raw[symbol].USD.IMAGEURL}`
        }))

        setTopCoins(coins)
      })
      .catch((err) => {
        console.error('Error fetching coin data:', err)
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
      .catch((err) => {
        console.error('Error fetching BTC history:', err)
      })
  }, [])

  return (
    <div className="space-y-10">
      <Card />

      <div>
        <h1 className="text-3xl font-bold mb-4">Top Coins</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topCoins.length > 0 ? (
            topCoins.map((coin) => (
              <div
                key={coin.symbol}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition"
              >
                
                <div className="flex justify-center mb-4">
                  <img
                    src={coin.imageUrl}
                    alt={coin.name}
                    className="w-20 h-20 rounded-full"
                  />
                </div>

               
                <h2 className="text-lg text-center font-semibold text-white mb-2">{coin.name}</h2>

                
                <p className="text-center text-xl text-green-400">${coin.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Loading selected coins...</p>
          )}
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

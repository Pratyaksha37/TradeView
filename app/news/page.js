'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&apiKey=664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573`
        )
        if (response.data.Data) {
          setNews(response.data.Data)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Crypto News</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {news.length > 0 ? (
          news.map((article, i) => (
            <a
              key={i}
              href={article.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition block"
            >
              {article.imageurl && (
                <img
                  src={`https://www.cryptocompare.com${article.imageurl}`}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
            </a>
          ))
        ) : (
          <p className="text-gray-400">No news available.</p>
        )}
      </div>
    </div>
  )
}

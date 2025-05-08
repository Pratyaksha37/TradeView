'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    axios
      .get('https://api.coindesk.com/v1/news')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setNews(res.data)
        }
      })
      .catch(() => {
        setNews([])
      })
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
              className="bg-gray-800 p-4 rounded hover:bg-gray-700 transition block"
            >
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-400">
                {article.description || 'No description available'}
              </p>
            </a>
          ))
        ) : (
          <p className="text-gray-400">No news available or API limit reached.</p>
        )}
      </div>
    </div>
  )
}

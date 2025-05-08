'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const newsPerPage = 6

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {
      headers: {
        authorization: 'Apikey 664c6e6238f8fea8752b1c0b10fbe1a36497b9d0379ae92f71c7a2f8f1a6d573'
      }
    }).then(res => {
      setNews(res.data.Data)
    })
  }, [])

  const indexOfLast = currentPage * newsPerPage
  const indexOfFirst = indexOfLast - newsPerPage
  const currentNews = news.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(news.length / newsPerPage)

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages))
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1))

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Latest Crypto News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentNews.map(item => (
          <div key={item.id} className="bg-gray-800 p-4 rounded shadow">
            {item.imageurl && <img src={item.imageurl} alt={item.title} className="w-full h-40 object-cover rounded mb-4" />}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-300">{item.body.substring(0, 100)}...</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 mt-2 inline-block">Read more</a>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-700 px-4 py-2 rounded disabled:opacity-40">Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-700 px-4 py-2 rounded disabled:opacity-40">Next</button>
      </div>
    </div>
  )
}

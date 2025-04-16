// src/app/news/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default function NewsListPage() {
    const [news, setNews] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchNews = async () => {
            const res = await fetch("/api/news")
            const data = await res.json()
            setNews(data)
        }
        fetchNews()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            <Navbar />

            <main className="flex-grow w-[80%] mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold  my-12 text-gray-800">Noticias</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => router.push(`/news/${item.id}`)}
                            className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="h-48 w-full bg-gray-100">
                                {item.images && (
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
} 
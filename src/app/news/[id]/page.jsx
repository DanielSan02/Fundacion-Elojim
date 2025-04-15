// src/app/news/[id]/page.jsx
import { notFound } from "next/navigation"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default async function NewsDetailPage({ params }) {
    const id = params?.id

    const res = await fetch(`http://localhost:3000/api/news/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) return notFound()

    const post = await res.json()

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            <Navbar />

            <main className="flex-grow w-[80%] my-12 mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-96 object-cover rounded-xl mb-6"
                    />
                )}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.content || "(Sin contenido)"}
                </p>
            </main>

            <Footer />
        </div>
    )
} 

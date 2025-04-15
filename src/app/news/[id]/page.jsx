// src/app/news/[id]/page.jsx
import { notFound } from "next/navigation"

export default async function NewsDetailPage({ params }) {
    const id = params?.id

    const res = await fetch(`http://localhost:3000/api/news/${id}`, {
        cache: 'no-store' // Para evitar errores por contenido estático
    })

    if (!res.ok) return notFound()

    const post = await res.json()

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
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
        </div>
    )
}
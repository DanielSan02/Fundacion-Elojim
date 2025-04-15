// src/app/registerNews/page.jsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterNewsPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("title", form.title)
        data.append("content", form.content)
        if (form.image) data.append("image", form.image)

        const res = await fetch("/api/news", {
            method: "POST",
            body: data
        })

        if (res.ok) router.push("/news")
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-2xl mt-10">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Registrar Noticia</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    name="title"
                    placeholder="Título de la noticia"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Contenido..."
                    className="w-full p-3 h-40 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form.content}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-xl file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Publicar Noticia
                </button>
            </form>
        </div>
    )
}

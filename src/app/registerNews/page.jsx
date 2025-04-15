// src/app/registerNews/page.jsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"

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
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            <Navbar />

            <main className="flex-grow py-12  justify-center ">
                <div className="max-w-2xl mx-auto my-12 bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Noticia</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Título
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Contenido
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows="6"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={form.content}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                Imagen
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                           file:rounded-xl file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Publicar Noticia
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    )
}
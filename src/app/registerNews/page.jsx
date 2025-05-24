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
        images: []
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        
        // Limpiar error cuando el usuario empieza a corregir
        if (errors[name]) {
            setErrors({...errors, [name]: null})
        }
    }

    const handleFileChange = (e) => {
        // Conservar imágenes anteriores y añadir las nuevas
        const newImages = Array.from(e.target.files)
        setForm({ 
            ...form, 
            images: [...form.images, ...newImages] 
        })
        
        // Limpiar error de imágenes cuando se añaden nuevas
        if (errors.images) {
            setErrors({...errors, images: null})
        }
    }

    // Función para eliminar una imagen seleccionada
    const removeImage = (indexToRemove) => {
        setForm({
            ...form,
            images: form.images.filter((_, index) => index !== indexToRemove)
        })
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!form.title.trim()) {
            newErrors.title = "El título es obligatorio"
        }
        
        if (form.images.length < 3) {
            newErrors.images = "Se requieren al menos 3 imágenes"
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }
        
        const data = new FormData()
        data.append("title", form.title)
        data.append("content", form.content)
        form.images.forEach((img) => data.append("images", img))

        try {
            const res = await fetch("/api/news", {
                method: "POST",
                body: data,
                credentials: "include"
            })

            if (res.ok) {
                router.push("/news")
            } else {
                const errorData = await res.json()
                alert(`Error: ${errorData.message || "No se pudo publicar la noticia"}`)
            }
        } catch (error) {
            console.error("Error al publicar la noticia:", error)
            alert("Error al publicar la noticia. Por favor, intente nuevamente.")
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            {/* <Navbar /> */}

            <main className="flex-grow py-12 justify-center">
                <div className="max-w-2xl mx-auto my-12 bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Registrar Post o Noticia</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Título
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black dark:bg-white dark:text-black`}
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Contenido
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                rows="6"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black dark:bg-white dark:text-black"
                                value={form.content}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Imágenes (mínimo 3)
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-xl file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100 ${errors.images ? 'border border-red-500 rounded-lg' : ''}`}
                            />
                            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                            
                            {/* Mostrar imágenes seleccionadas */}
                            {form.images.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Imágenes seleccionadas ({form.images.length}):
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {form.images.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 border">
                                                    <img 
                                                        src={URL.createObjectURL(img)} 
                                                        alt={`Imagen ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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

            {/* <Footer /> */}
        </div>
    )
}
import { notFound } from "next/navigation"
import Navbar from "@/components/NavBar"
import Footer from "@/components/Footer"
import Gallery from "../../../components/News/Gallery" 

export default async function NewsDetailPage({ params }) {
    const {id} = await params;

    const res = await fetch(`http://localhost:3000/api/news/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) return notFound()

    const post = await res.json()

    return (
        <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
            <Navbar />

            <main className="flex-grow w-[90%] my-20 mx-auto px-2 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

                {post.images && post.images.length > 0 && (
                    <div className="mb-8">
                        <Gallery 
                            images={post.images.map(image => `/${image}`)} 
                        />
                    </div>
                )}

                <div className="mt-8">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {post.content || "(Sin contenido)"}
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
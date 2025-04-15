// app/api/news/route.js
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { PrismaClient } from "@prisma/client"
import { existsSync } from "fs"

const prisma = new PrismaClient()

export async function POST(req) {
    try {
        const formData = await req.formData()
        const title = formData.get("title")
        const content = formData.get("content") || ""
        const image = formData.get("image")

        // Asignar un autor fijo (o extraer de sesión)
        const authorId = 1

        let imagePath = null

        if (image && image.name) {
            const bytes = await image.arrayBuffer()
            const buffer = Buffer.from(bytes)
            const fileName = `${Date.now()}-${image.name}`
            const uploadDir = path.join(process.cwd(), "public/uploads")
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

            const filePath = path.join(uploadDir, fileName)
            await writeFile(filePath, buffer)
            imagePath = `/uploads/${fileName}`
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                // image: imagePath // solo si lo agregaste al modelo
            },
        })

        return new Response(JSON.stringify(post), {
            headers: { "Content-Type": "application/json" },
            status: 201,
        })
    } catch (error) {
        console.error("❌ Error al crear noticia:", error)
        return new Response("Error interno", { status: 500 })
    }
}


export async function GET() {
    try {
        const prisma = new PrismaClient()
        const posts = await prisma.post.findMany({
            orderBy: { id: 'desc' },
        })

        return new Response(JSON.stringify(posts), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        })
    } catch (error) {
        console.error("❌ Error al obtener noticias:", error)
        return new Response("Error al obtener noticias", { status: 500 })
    }
}

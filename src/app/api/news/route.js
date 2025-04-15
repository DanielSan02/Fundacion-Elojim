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
        const images = formData.getAll("images")
        const authorId = 1 // asignación temporal

        const uploadDir = path.join(process.cwd(), "public/uploads")
        if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

        const savedPaths = []

        for (const image of images) {
            if (typeof image.name !== "string") continue

            const buffer = Buffer.from(await image.arrayBuffer())
            const fileName = `${Date.now()}-${image.name}`
            const filePath = path.join(uploadDir, fileName)

            await writeFile(filePath, buffer)
            savedPaths.push(`/uploads/${fileName}`)
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                images: savedPaths
            }
        })

        return new Response(JSON.stringify(post), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        })

    } catch (error) {
        console.error("❌ Error creando noticia:", error)
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

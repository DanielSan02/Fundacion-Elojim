import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
    try {
        const id = parseInt(params.id)
        if (isNaN(id)) {
            return new Response("ID inválido", { status: 400 })
        }

        const post = await prisma.post.findUnique({
            where: { id },
        })

        if (!post) {
            return new Response("Noticia no encontrada", { status: 404 })
        }

        return new Response(JSON.stringify(post), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        })
    } catch (error) {
        console.error("❌ Error al obtener la noticia:", error)
        return new Response("Error interno del servidor", { status: 500 })
    }
}

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

        const authorId = 1

        let imagePaths = [];

         // Verificar si hay imágenes y procesarlas
        if (images && images.length > 0) {
            const uploadDir = path.join(process.cwd(), "public/uploads");
    
            // Crear el directorio si no existe
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
    
            // Procesar cada imagen y guardar la ruta
            for (const image of images) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = `${Date.now()}-${image.name}`;
                const filePath = path.join(uploadDir, fileName);
        
                // Escribir el archivo en el directorio de uploads
                await writeFile(filePath, buffer);
                // Guardar la ruta de la imagen
                imagePaths.push(`/uploads/${fileName}`);
            }
        }
    
        const post = await prisma.post.create({
            data: {
            title,
            content,
            authorId,
            images: imagePaths,
            },
        });
  
        return new Response(JSON.stringify(post), {
        headers: { "Content-Type": "application/json" },
        status: 201,
        });
    } catch (error) {
      console.error("❌ Error al crear noticia:", error);
      return new Response("Error interno", { status: 500 });
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

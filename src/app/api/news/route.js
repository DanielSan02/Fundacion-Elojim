import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { existsSync } from "fs";
import { getToken } from "next-auth/jwt";


const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // 🔐 Obtener token JWT desde la cookie
    const token = await getToken({ req });
    console.log("TOKEN RECIBIDO:", token);


    if (!token || !token.sub) {
      return new Response("No autorizado", { status: 401 });
    }

    const authorId = parseInt(token.sub); // ID del usuario logueado

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content") || "";
    const images = formData.getAll("images");

    let imagePaths = [];

    if (images && images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

      for (const image of images) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const fileName = `${Date.now()}-${image.name}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        imagePaths.push(`uploads/${fileName}`);
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
    const posts = await prisma.post.findMany({
      orderBy: { id: 'desc' },
    });

    return new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error al obtener noticias:", error);
    return new Response("Error al obtener noticias", { status: 500 });
  }
}

// Nuevo endpoint DELETE para eliminar una noticia
export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Obtener el id de la noticia a eliminar desde el body de la solicitud

    // Obtener la noticia que se eliminará
    const postToDelete = await prisma.post.findUnique({
      where: { id },
    });

    if (!postToDelete) {
      return new Response("Noticia no encontrada", { status: 404 });
    }

    // Eliminar las imágenes relacionadas (si existen)
    if (postToDelete.images && postToDelete.images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // Eliminar cada archivo de imagen
      postToDelete.images.forEach((image) => {
        const imagePath = path.join(uploadDir, image);
        if (existsSync(imagePath)) {
          unlinkSync(imagePath); // Eliminar la imagen
        }
      });
    }

    // Eliminar el registro de la base de datos
    await prisma.post.delete({
      where: { id },
    });

    return new Response("Noticia eliminada exitosamente", {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error al eliminar noticia:", error);
    return new Response("Error interno al eliminar noticia", { status: 500 });
  }
}
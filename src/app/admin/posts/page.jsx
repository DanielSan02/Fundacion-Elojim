"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ProtectedAdmin from "@/components/ProtectedAdmin";
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const { toast } = useToast(); 
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        setPosts(data); // Set the posts to state
      } else {
        console.error("Error fetching posts");
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  // Delete post function
  const handleDelete = async (id) => {
    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Remove the deleted post from the state to reflect the changes immediately
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        toast({
                title: "Post eliminado",
                description: "El post ha sido eliminado correctamente.",
              });
      } else {
        console.error("Error eliminando el post");
      }
    } catch (error) {
      console.error("Error eliminando el post", error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <ProtectedAdmin>
    <ContentLayout title="All Posts">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Todos los Posts</h2>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr>
              {/* <th className="py-2 px-4 border-b">ID</th> */}
              <th className="py-2 px-4 border-b">Titulo</th>
              <th className="py-2 px-4 border-b">Contenido</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                {/* <td className="py-2 px-4 border-b">{post.id}</td> */}
                <td className="py-2 px-4 border-b">{post.title}</td>
                <td className="py-2 px-4 border-b">{post.content.slice(0, 150)}...</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentLayout>
    </ProtectedAdmin>
  );
}

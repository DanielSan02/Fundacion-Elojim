"use client";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedAdmin from "@/components/ProtectedAdmin";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const cards = [
    {
      title: "Gestión de Noticias 📰",
      description: "Agregar, listar o eliminar noticias relevantes para la comunidad.",
      color: "#1D4ED8",
    },
    {
      title: "Eventos por Programa 📅",
      description: "Agregar, listar, eliminar o editar eventos asociados a cada programa.",
      color: "#10B981",
    },
    {
      title: "Registros de Programas 📂",
      description: "Agregar, listar, eliminar o ver los registros vinculados a cada programa.",
      color: "#EF4444",
    },
  ];

  return (
    <ProtectedAdmin>
      <ContentLayout title="Dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mt-12 mb-20">
          <h2 className="text-3xl font-bold text-center text-[#1B3C8C] mb-12">
            Bienvenido al Panel Administrativo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((item, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-xl transition-shadow duration-300 bg-white rounded-2xl border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div
                    className="h-2 w-20 mb-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ContentLayout>
    </ProtectedAdmin>
  );
}

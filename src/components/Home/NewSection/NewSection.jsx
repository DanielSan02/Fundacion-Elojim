"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Share2, ChevronRight, Calendar } from "lucide-react";

const NewSection = () => {
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  const filteredNews =
    activeCategory === "all"
      ? news
      : news.filter((item) => item.category === activeCategory);

  return (
    <section id="noticias" className="py-20 bg-[#E8E6E1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B3C8C] mb-4">
            Últimas Noticias
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre nuestros proyectos, eventos y el impacto
            que generamos en la comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.length > 0 && (
            <Card className="md:col-span-2 lg:col-span-3 overflow-hidden bg-white">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={filteredNews[0].image || "/placeholder.svg"}
                    alt={filteredNews[0].title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#3B82F6]">
                    Destacado
                  </Badge>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(filteredNews[0].createdAt || Date.now()).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1B3C8C] mb-4">
                      {filteredNews[0].title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {filteredNews[0].content?.slice(0, 120) + "..."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button className="bg-[#1B3C8C] hover:bg-[#2563EB]">
                      Leer más
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {filteredNews
            .slice(1)
            .map((item) => (
              <Card key={item.id} className="group overflow-hidden bg-white">
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(item.createdAt || Date.now()).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3C8C] mb-3 group-hover:text-[#3B82F6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.content?.slice(0, 100) + "..."}
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                  <Button
                    variant="link"
                    className="text-[#1B3C8C] p-0 hover:text-[#3B82F6]">
                    Leer más
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="text-[#1B3C8C] border-[#1B3C8C] hover:bg-[#1B3C8C] hover:text-white">
            Ver Más Noticias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewSection;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { programs } from "@/data/programs";
import ProgramCard from "./ProgramCard";
import ProgramDetail from "./ProgramDetail";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProgramasPage() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B3C8C] mb-4">
          Nuestros Programas Sociales
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestros programas sociales y únete a las iniciativas que
          están transformando vidas en nuestra comunidad.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar programas..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show">
        {filteredPrograms.map((program) => (
          <motion.div key={program.id} variants={item}>
            <ProgramCard program={program} onClick={handleProgramClick} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No se encontraron programas que coincidan con tu búsqueda.
          </p>
        </div>
      )}

      <ProgramDetail
        program={selectedProgram}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
}

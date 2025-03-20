"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePrograms } from "@/context/ProgramContext";

export default function ProgramCard({ program, onClick }) {
  const { isRegistered } = usePrograms();
  const registered = isRegistered(program.id);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <Card
        className="h-full cursor-pointer overflow-hidden border-2 hover:shadow-lg transition-shadow"
        style={{ borderColor: program.color, backgroundColor: program.bgColor }}
        onClick={() => onClick(program)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div
              className="rounded-full p-2 mb-4"
              style={{ backgroundColor: program.color }}>
              <program.icon className="h-6 w-6 text-white" />
            </div>
            {registered && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Inscrito
              </Badge>
            )}
          </div>
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: program.color }}>
            {program.title}
          </h3>
          <p className="text-gray-600 text-sm">{program.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

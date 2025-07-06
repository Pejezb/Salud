"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const funcionalidades = [
  {
    titulo: "Gestión de citas",
    descripcion:
      "Programa, reprograma y cancela citas fácilmente. Notificaciones automáticas por correo y panel de control en tiempo real.",
  },
  {
    titulo: "Historial clínico digital",
    descripcion:
      "Guarda antecedentes médicos, diagnósticos, tratamientos y archivos clínicos en un entorno seguro y accesible.",
  },
  {
    titulo: "Agenda inteligente",
    descripcion:
      "Visualiza tu agenda por día, semana o mes, y gestiona tus horarios con total flexibilidad.",
  },
  {
    titulo: "Recordatorios para pacientes",
    descripcion:
      "Reduce ausencias y mejora la puntualidad con notificaciones automáticas vía email o SMS.",
  },
  {
    titulo: "Soporte para múltiples especialidades",
    descripcion:
      "Optimizado para odontólogos, psicólogos, médicos generales, nutricionistas y más.",
  },
  {
    titulo: "Acceso desde cualquier dispositivo",
    descripcion:
      "Totalmente responsivo. Accede desde tu laptop, tablet o móvil sin perder funcionalidad.",
  },
];

export default function FuncionalidadesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Funcionalidades
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Todo lo que necesitas para administrar tu consulta de manera profesional, simple y segura.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
          {funcionalidades.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white border border-primary/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.titulo}</h3>
                  <p className="text-muted-foreground text-sm">{item.descripcion}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

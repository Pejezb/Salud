"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, Phone, HelpCircle, BookOpen } from "lucide-react";

const canales = [
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    titulo: "Correo de soporte",
    descripcion: "Escríbenos a soporte@mediconnect.com para cualquier duda o inconveniente.",
  },
  {
    icon: <Phone className="w-6 h-6 text-primary" />,
    titulo: "Atención telefónica",
    descripcion: "Llámanos al +51 987 654 321 de lunes a viernes de 9:00 a 18:00.",
  },
  {
    icon: <HelpCircle className="w-6 h-6 text-primary" />,
    titulo: "Centro de ayuda",
    descripcion: "Consulta artículos y guías paso a paso en nuestro centro de soporte en línea.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    titulo: "Guías rápidas",
    descripcion: "Tutoriales breves para resolver los problemas más comunes de la plataforma.",
  },
];

export default function SoportePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Centro de Soporte
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Estamos aquí para ayudarte en lo que necesites. Elige uno de nuestros canales de atención.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {canales.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.titulo}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{item.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

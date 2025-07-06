"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  {
    titulo: "Tendencias en tecnología médica 2025",
    descripcion:
      "Exploramos las herramientas digitales que están transformando la práctica médica en América Latina.",
    fecha: "15 de junio, 2025",
    slug: "#",
  },
  {
    titulo: "5 beneficios de digitalizar tu consulta",
    descripcion:
      "Reducir el papeleo, automatizar citas y mejorar la atención al paciente son solo el comienzo.",
    fecha: "7 de junio, 2025",
    slug: "#",
  },
  {
    titulo: "Ciberseguridad para profesionales de salud",
    descripcion:
      "Guía básica para proteger los datos de tus pacientes y cumplir con normativas locales.",
    fecha: "28 de mayo, 2025",
    slug: "#",
  },
];

export default function BlogPage() {
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
            Nuestro Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Noticias, guías y consejos para profesionales de la salud que quieren modernizar su práctica.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-muted-foreground mb-2">{post.fecha}</p>
              <h3 className="text-xl font-semibold mb-2">{post.titulo}</h3>
              <p className="text-muted-foreground text-sm mb-4">{post.descripcion}</p>
              <Link href={post.slug} className="text-primary text-sm font-medium hover:underline">
                Leer más →
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

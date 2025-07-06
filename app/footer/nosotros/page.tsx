// app/nosotros/page.tsx
"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            MediConnect nació con la misión de empoderar a los profesionales de la salud independientes, brindándoles una plataforma poderosa, simple y segura para transformar su práctica médica.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold">Nuestra historia</h2>
            <p className="text-muted-foreground">
              Fundada por un equipo de expertos en tecnología y salud, MediConnect se construyó para cerrar la brecha entre la atención médica tradicional y las herramientas digitales modernas.
              Nos enfocamos en las verdaderas necesidades de médicos, psicólogos, fisioterapeutas y otros especialistas que quieren más autonomía y menos complicaciones administrativas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold">Nuestra misión</h2>
            <p className="text-muted-foreground">
              Democratizar el acceso a herramientas digitales profesionales para todos los especialistas en salud. Queremos que puedas brindar una atención de calidad sin preocuparte por lo técnico.
              Nuestra misión es clara: que la tecnología esté al servicio de tu práctica, no al revés.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto mt-24 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            ¿Por qué elegir MediConnect?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Porque entendemos que tu tiempo vale. Te damos el control, la seguridad y la simplicidad que necesitas para concentrarte en lo que realmente importa: tus pacientes.
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

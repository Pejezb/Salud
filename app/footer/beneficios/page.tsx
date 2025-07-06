"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { HeartPulse, Clock3, ShieldCheck, ThumbsUp, Users, Zap } from "lucide-react";

const beneficios = [
  {
    icono: <HeartPulse className="h-6 w-6 text-primary" />,
    titulo: "Atención centrada en el paciente",
    descripcion: "Mejora la experiencia de tus pacientes con herramientas pensadas en su comodidad y seguimiento personalizado.",
  },
  {
    icono: <Clock3 className="h-6 w-6 text-primary" />,
    titulo: "Ahorro de tiempo",
    descripcion: "Automatiza tareas repetitivas como recordatorios, citas y registros clínicos. Más tiempo para lo que importa.",
  },
  {
    icono: <ShieldCheck className="h-6 w-6 text-primary" />,
    titulo: "Seguridad de la información",
    descripcion: "Cumplimiento con estándares de protección de datos. Toda la información está cifrada y respaldada.",
  },
  {
    icono: <Zap className="h-6 w-6 text-primary" />,
    titulo: "Agilidad en la gestión",
    descripcion: "Desde cualquier dispositivo, administra tu consulta médica sin complicaciones ni instalaciones.",
  },
  {
    icono: <Users className="h-6 w-6 text-primary" />,
    titulo: "Mejora la relación con tus pacientes",
    descripcion: "La plataforma facilita la comunicación directa, la fidelización y la profesionalidad del servicio.",
  },
  {
    icono: <ThumbsUp className="h-6 w-6 text-primary" />,
    titulo: "Imagen profesional",
    descripcion: "Proyecta una imagen moderna, organizada y confiable para tu consulta o práctica privada.",
  },
];

export default function BeneficiosPage() {
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
            Beneficios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Descubre cómo MediConnect transforma tu práctica médica y mejora la experiencia de tus pacientes.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
          {beneficios.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white border border-primary/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                {item.icono}
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


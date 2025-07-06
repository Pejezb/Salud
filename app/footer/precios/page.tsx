"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const planes = [
  {
    nombre: "Gratis",
    precio: "S/ 0",
    descripcion: "Ideal para comenzar y probar la plataforma.",
    beneficios: [
      "Hasta 5 pacientes registrados",
      "Gestión de citas básica",
      "Historiales clínicos simples",
    ],
  },
  {
    nombre: "Profesional",
    precio: "S/ 49 / mes",
    descripcion: "Perfecto para profesionales independientes.",
    beneficios: [
      "Pacientes ilimitados",
      "Gestión avanzada de citas",
      "Historiales clínicos completos",
      "Soporte prioritario",
    ],
    destacado: true,
  },
  {
    nombre: "Empresas",
    precio: "Desde S/ 99 / mes",
    descripcion: "Para centros médicos y grupos de profesionales.",
    beneficios: [
      "Múltiples usuarios",
      "Panel administrativo",
      "Reportes y estadísticas",
      "Atención personalizada",
    ],
  },
];

export default function PreciosPage() {
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
            Planes de precios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Elige el plan que se adapta a tu práctica profesional. Sin contratos ni complicaciones.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan, i) => (
            <motion.div
              key={plan.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-xl p-6 shadow-sm ${
                plan.destacado
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-white"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.nombre}</h2>
              <p className="text-3xl font-bold text-primary mb-2">{plan.precio}</p>
              <p className="text-muted-foreground mb-6">{plan.descripcion}</p>
              <ul className="space-y-3 mb-6">
                {plan.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="text-green-500 w-4 h-4" />
                    {beneficio}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-primary text-white py-2 font-medium hover:bg-primary/90 transition-colors">
                Seleccionar
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

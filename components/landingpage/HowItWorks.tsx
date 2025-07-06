"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Regístrate",
    description:
      "Crea tu cuenta como profesional de la salud y configura tu perfil con tus especialidades y horarios disponibles.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Personaliza",
    description:
      "Adapta la plataforma a tus necesidades específicas, configura tus plantillas de historiales y documentos.",
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: "Comienza a atender",
    description:
      "Recibe citas online, gestiona tus pacientes y mantén sus historiales clínicos actualizados y seguros.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 md:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Cómo funciona
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simplificamos tu práctica profesional
          </h2>
          <p className="text-xl text-muted-foreground">
            En solo tres pasos, transforma la manera en que gestionas tu
            consulta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="relative">
                <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-30px)] h-[2px] bg-primary/20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2 border-primary/20" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

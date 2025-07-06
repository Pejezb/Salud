"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    title: "Ahorro de tiempo",
    description: "Reduce el tiempo dedicado a tareas administrativas y optimiza la gestión de tu consulta.",
  },
  {
    title: "Mayor seguridad",
    description: "Protege la información sensible de tus pacientes con sistemas de seguridad avanzados.",
  },
  {
    title: "Mejor experiencia",
    description: "Ofrece a tus pacientes una experiencia moderna y eficiente para gestionar sus citas.",
  },
  {
    title: "Impacto ambiental",
    description: "Reduce el uso de papel y contribuye a la sostenibilidad ambiental con procesos digitales.",
  },
]

export default function Benefits() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Beneficios
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Transforma tu práctica profesional
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                <img
                  src="/placeholder.jpg?height=600&width=600"
                  alt="Beneficios de la plataforma"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

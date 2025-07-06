"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Lock } from "lucide-react"

const securityFeatures = [
  "Cifrado de extremo a extremo",
  "Autenticación de doble factor",
  "Cumplimiento con normativas de protección de datos",
  "Copias de seguridad automáticas",
  "Auditorías de seguridad periódicas",
]

export default function Security() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen / ícono de seguridad */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative rounded-2xl overflow-hidden border border-primary/10 shadow-xl">
                <div className="bg-muted aspect-square flex items-center justify-center">
                  <Lock className="h-32 w-32 text-primary opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Texto con lista de seguridad */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Seguridad
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Tu información en buenas manos
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              La seguridad y privacidad de los datos de tus pacientes es nuestra prioridad. Implementamos las mejores
              prácticas de seguridad para proteger toda la información.
            </p>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "MediConnect ha transformado completamente mi consulta. Ahora puedo dedicar más tiempo a mis pacientes y menos a la administración.",
    author: "Dra. María Rodríguez",
    role: "Cardióloga",
  },
  {
    quote:
      "La facilidad para gestionar citas y mantener historiales clínicos actualizados ha mejorado significativamente mi eficiencia.",
    author: "Dr. Carlos Méndez",
    role: "Pediatra",
  },
  {
    quote:
      "Mis pacientes valoran poder agendar citas en línea y tener acceso a su información médica de forma segura.",
    author: "Dra. Laura Sánchez",
    role: "Dermatóloga",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-20 md:py-32 bg-accent">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Testimonios
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-xl text-muted-foreground">
            Profesionales de la salud que ya han transformado su práctica con MediConnect
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-background border-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">{"★".repeat(5)}</div>
                  <p className="mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

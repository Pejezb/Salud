"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Calendar,
  ClipboardList,
  Shield,
  Laptop,
  FileText,
} from "lucide-react"

const features = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Doble perfil",
    description:
      "Sistema con roles diferenciados para profesionales y pacientes, cada uno con accesos y funcionalidades específicas.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Agenda de citas",
    description:
      "Gestiona tu calendario de consultas y permite a tus pacientes agendar citas en línea sin llamadas telefónicas.",
  },
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    title: "Historial clínico",
    description:
      "Crea, visualiza y actualiza historiales clínicos digitales con acceso restringido solo a usuarios autorizados.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Seguridad de datos",
    description:
      "Implementación de mecanismos de cifrado, autenticación y cumplimiento con normativas de ciberseguridad.",
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary" />,
    title: "Diseño responsive",
    description:
      "Interfaz intuitiva que funciona correctamente tanto en PC como en dispositivos móviles.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Documentación",
    description:
      "Genera y almacena documentos clínicos, recetas e informes de manera digital y segura.",
  },
]

export default function Features() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Funcionalidades principales
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-xl text-muted-foreground">
            Diseñado específicamente para profesionales independientes del sector salud
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="feature-card-hover"
            >
              <Card className="h-full border-primary/10 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

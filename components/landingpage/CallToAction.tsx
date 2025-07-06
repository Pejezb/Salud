"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Comienza a transformar tu práctica profesional hoy
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a la comunidad de profesionales de salud que ya están optimizando su trabajo con MediConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="rounded-full px-8">
                Registrarse ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Contactar con ventas
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Puedes mover el Footer a otro lugar si ya lo estás llamando en el layout o en page.tsx */}
        <div className="h-10 mt-16">
        </div>
      </div>
    </section>
  )
}

"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function TerminosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 px-6 md:px-10 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Términos de Servicio
          </h1>
          <p className="text-muted-foreground text-lg mb-6 text-center">
            Revisa los términos y condiciones que rigen el uso de MediConnect.
          </p>

          {/* Botón de descarga de PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <a
              href="/docs/terminos-servicio.pdf"
              download
              className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium shadow hover:bg-primary/90 transition-colors"
            >
              Descargar PDF
            </a>
          </motion.div>

          {/* Contenido de términos */}
          <div className="space-y-10 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Aceptación</h2>
              <p>
                Al usar MediConnect, aceptas estos Términos de Servicio. Si no estás de acuerdo, por favor no utilices la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Uso adecuado</h2>
              <p>
                No puedes usar MediConnect para actividades ilegales, suplantaciones de identidad ni para compartir información falsa o fraudulenta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Propiedad intelectual</h2>
              <p>
                Todo el contenido, marcas y diseño de MediConnect son propiedad intelectual de la empresa y están protegidos por ley.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Responsabilidad</h2>
              <p>
                MediConnect no se hace responsable de daños derivados del uso incorrecto de la plataforma o de decisiones tomadas con base en los datos disponibles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Cambios en los términos</h2>
              <p>
                Podemos actualizar estos términos en cualquier momento. Te recomendamos revisarlos periódicamente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Terminación</h2>
              <p>
                Podemos suspender tu cuenta si detectamos incumplimiento de estos términos o uso indebido del sistema.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Contacto</h2>
              <p>
                Para dudas o reclamos, contáctanos en{" "}
                <a href="mailto:legal@mediconnect.com" className="text-primary underline">
                  legal@mediconnect.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function PoliticaPrivacidad() {
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
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground text-lg mb-6 text-center">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos y usamos tu información personal.
          </p>

          {/* Botón de descarga de PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <a
              href="/docs/politica-privacidad.pdf"
              download
              className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium shadow hover:bg-primary/90 transition-colors"
            >
              Descargar PDF
            </a>
          </motion.div>

          {/* Contenido de la política */}
          <div className="space-y-10 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Información que recopilamos</h2>
              <p>
                Recopilamos datos como nombre, correo, historial médico y otra información necesaria para brindarte nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Cómo usamos tu información</h2>
              <p>
                Para facilitar la gestión médica, mejorar la plataforma, y cumplir con regulaciones legales aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Seguridad de tus datos</h2>
              <p>
                Utilizamos cifrado, firewalls y controles de acceso para proteger tus datos personales contra accesos no autorizados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Compartir datos</h2>
              <p>
                No compartimos tus datos con terceros salvo autorización expresa o requerimiento legal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Tus derechos</h2>
              <p>
                Puedes solicitar acceso, corrección o eliminación de tu información. También puedes oponerte al tratamiento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Cambios en esta política</h2>
              <p>
                Esta política puede actualizarse. Te notificaremos cualquier cambio importante.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Contacto</h2>
              <p>
                Si tienes dudas o solicitudes, escríbenos a{" "}
                <a href="mailto:soporte@mediconnect.com" className="text-primary underline">
                  soporte@mediconnect.com
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

"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function CookiesPage() {
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
            Política de Cookies
          </h1>
          <p className="text-muted-foreground text-lg mb-6 text-center">
            Aprende cómo usamos cookies para mejorar tu experiencia en MediConnect.
          </p>

          {/* Botón de descarga de PDF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-12"
          >
            <a
              href="/docs/politica-cookies.pdf"
              download
              className="inline-block rounded-full bg-primary px-6 py-3 text-white font-medium shadow hover:bg-primary/90 transition-colors"
            >
              Descargar PDF
            </a>
          </motion.div>

          {/* Contenido de la política */}
          <div className="space-y-10 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. ¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web colocan en tu dispositivo para
                almacenar información sobre tu visita y mejorar tu experiencia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. ¿Cómo usamos las cookies?</h2>
              <p>
                En MediConnect usamos cookies para recordar tus preferencias, entender cómo usas nuestro sitio,
                y personalizar tu experiencia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Tipos de cookies que utilizamos</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies de rendimiento:</strong> nos ayudan a entender cómo interactúan los usuarios.</li>
                <li><strong>Cookies de funcionalidad:</strong> permiten recordar tus configuraciones personalizadas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Control de cookies</h2>
              <p>
                Puedes controlar o eliminar cookies desde la configuración de tu navegador. Sin embargo, desactivar
                algunas cookies puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta política en cualquier momento. Publicaremos cualquier cambio importante en esta página.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Contacto</h2>
              <p>
                Si tienes dudas sobre nuestra política de cookies, puedes escribirnos a{" "}
                <a href="mailto:legal@mediconnect.com" className="text-primary underline">
                  legal@mediconnect.com
                </a>.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

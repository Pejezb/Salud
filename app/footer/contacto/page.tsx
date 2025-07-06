"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background py-20 px-6 md:px-10">
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-center">
            Contáctanos
          </h1>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            ¿Tienes preguntas o necesitas ayuda? Completa el formulario y nos pondremos en contacto contigo lo antes posible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                Nombre completo
              </label>
              <Input id="nombre" type="text" placeholder="Tu nombre" required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium mb-1">
                Mensaje
              </label>
              <Textarea id="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..." required />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Enviar mensaje
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

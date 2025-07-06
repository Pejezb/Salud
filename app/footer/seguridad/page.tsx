"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Database, FileLock2 } from "lucide-react";

const puntos = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    titulo: "Cumplimiento de normativas",
    descripcion:
      "Cumplimos con estándares de seguridad como GDPR y normativas locales para proteger la privacidad de tus pacientes.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    titulo: "Autenticación segura",
    descripcion:
      "Utilizamos protocolos de autenticación robustos y cifrado de contraseñas para garantizar accesos seguros.",
  },
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    titulo: "Base de datos encriptada",
    descripcion:
      "Toda la información médica se almacena en bases de datos encriptadas con acceso controlado.",
  },
  {
    icon: <FileLock2 className="w-6 h-6 text-primary" />,
    titulo: "Backups automáticos",
    descripcion:
      "Hacemos copias de seguridad periódicas para evitar la pérdida de datos ante cualquier eventualidad.",
  },
];

export default function SeguridadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-20 md:py-32 px-6 md:px-10 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Seguridad de tus datos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Tu información y la de tus pacientes está protegida con los más altos estándares de seguridad y privacidad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {puntos.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.titulo}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{item.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

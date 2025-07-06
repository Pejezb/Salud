"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo válido.")
      return
    }
    alert(`Te enviaremos un mensaje a tu correo: ${email}`)
    setEmail("")
  }

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="text-xl font-bold gradient-text">MediConnect</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Plataforma digital para profesionales independientes del sector salud. Gestiona citas, historiales clínicos y más, de manera eficiente y segura.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" aria-label="TikTok">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 3v12a3 3 0 1 0 3-3h3a6 6 0 1 1-6 6V3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Plataforma</h3>
            <ul className="space-y-3">
              <li><Link href="/footer/funcionalidades" className="text-sm text-muted-foreground hover:text-primary">Funcionalidades</Link></li>
              <li><Link href="/footer/beneficios" className="text-sm text-muted-foreground hover:text-primary">Beneficios</Link></li>
              <li><Link href="/footer/precios" className="text-sm text-muted-foreground hover:text-primary">Precios</Link></li>
              <li><Link href="/footer/seguridad" className="text-sm text-muted-foreground hover:text-primary">Seguridad</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="space-y-3">
              <li><Link href="/footer/nosotros" className="text-sm text-muted-foreground hover:text-primary">Sobre nosotros</Link></li>
              <li><Link href="/footer/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/footer/contacto" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
              <li><Link href="/footer/soporte" className="text-sm text-muted-foreground hover:text-primary">Soporte</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Suscríbete a nuestro newsletter</h3>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full"
                  required
                />
                <Button type="submit" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Legal</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/footer/legales/privacidad" className="text-xs text-muted-foreground hover:text-primary">Política de Privacidad</Link>
                <Link href="/footer/legales/terminos" className="text-xs text-muted-foreground hover:text-primary">Términos de Servicio</Link>
                <Link href="/footer/legales/cookies" className="text-xs text-muted-foreground hover:text-primary">Política de Cookies</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MediConnect. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground">Diseñado para profesionales de la salud independientes</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

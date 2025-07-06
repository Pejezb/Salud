"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

import Hero from "@/components/landingpage/Hero"
import Stats from "@/components/landingpage/Stats"
import Features from "@/components/landingpage/Features"
import HowItWorks from "@/components/landingpage/HowItWorks"
import Benefits from "@/components/landingpage/Benefits"
import Testimonials from "@/components/landingpage/Testimonials"
import Security from "@/components/landingpage/Security"
import CallToAction from "@/components/landingpage/CallToAction"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Security />
      <CallToAction />

      <Footer />
    </div>
  )
}



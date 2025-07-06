"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CounterProps {
  target: number
  title: string
  duration?: number
}

const Counter = ({ target, title, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(percentage * target))

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">{count}+</div>
      <p className="text-muted-foreground">{title}</p>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className="w-full py-16 bg-accent">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter target={1500} title="Profesionales" />
          <Counter target={25000} title="Pacientes" />
          <Counter target={98} title="% Satisfacción" />
          <Counter target={35} title="% Ahorro de tiempo" />
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Sparkles, Users, Lightbulb, GlassWater } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Insights Transformadores",
    description:
      "Sessoes individuais focadas em destravar os proximos passos da sua carreira ou negocio com clareza estrategica.",
  },
  {
    icon: Users,
    title: "Networking Premium",
    description:
      "Conecte-se com um mentor experiente em um ambiente exclusivo, criando lacos que vao alem do profissional.",
  },
  {
    icon: GlassWater,
    title: "Ambiente Sofisticado",
    description:
      "Cada detalhe e pensado para criar a atmosfera perfeita: cafe especial, ambiente reservado e total privacidade.",
  },
  {
    icon: Sparkles,
    title: "Experiencia Unica",
    description:
      "Nao e apenas uma reuniao. E uma experiencia imersiva desenhada para inspirar e acelerar resultados.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ExperienceSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-gold/80 text-sm tracking-[0.3em] uppercase font-sans">
            A Experiencia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 text-foreground tracking-tight text-balance">
            Mais que um cafe.
            <br />
            <span className="text-gold-gradient italic">Uma imersao estrategica.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group glass-gold rounded-xl p-8 md:p-10 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(184,149,106,0.08)]"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

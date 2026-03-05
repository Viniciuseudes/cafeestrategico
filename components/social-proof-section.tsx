"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Mariana S.",
    role: "CEO, Luminar Tech",
    text: "A sessao de mentoria foi um divisor de aguas. Em 90 minutos, ganhei clareza sobre decisoes que eu vinha adiando ha meses.",
  },
  {
    name: "Ricardo P.",
    role: "Fundador, Atlas Digital",
    text: "O ambiente, o cafe, a conversa... tudo foi impecavel. Saí de la com um plano de acao concreto e uma energia renovada.",
  },
  {
    name: "Camila L.",
    role: "Diretora de Produto",
    text: "Nao e apenas mentoria. E uma experiencia que te faz pensar diferente. Recomendo para qualquer lider que busca clareza.",
  },
  {
    name: "Fernando A.",
    role: "CTO, Nexus Labs",
    text: "O melhor investimento que fiz neste ano. O retorno veio em forma de decisoes melhores e mais rapidas.",
  },
]

const logos = [
  "LUMINAR",
  "ATLAS",
  "NEXUS",
  "ORION",
  "VERTEX",
  "PRISM",
  "AETHER",
  "ZENITH",
]

export function SocialProofSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Logo Marquee */}
      <div className="mb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
            Profissionais de empresas como
          </span>
        </motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="inline-flex items-center justify-center mx-10 md:mx-16"
              >
                <span className="text-muted-foreground/40 text-xl md:text-2xl font-serif tracking-[0.15em]">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/80 text-sm tracking-[0.3em] uppercase font-sans">
            Depoimentos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 text-foreground tracking-tight text-balance">
            O que dizem sobre a <span className="text-gold-gradient italic">experiencia</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-8 relative group hover:border-gold/20 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-gold/10 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 text-gold fill-gold"
                  />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 italic">
                {`"${testimonial.text}"`}
              </p>
              <div>
                <p className="text-foreground font-medium text-sm">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

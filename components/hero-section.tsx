"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollToBooking = () => {
    document
      .getElementById("agendamento")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-56 h-72 md:w-72 md:h-96 rounded-2xl overflow-hidden glow-gold">
              <Image
                src="/images/mlau-fontes.jpeg"
                alt="Mlau Fontes segurando uma xicara de cafe"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20 ring-inset" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-2 mb-5"
            >
              <Coffee className="w-4 h-4 text-gold" />
              <span className="text-gold/80 text-xs tracking-[0.3em] uppercase font-sans">
                Encontro Exclusivo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15] text-balance"
            >
              <span className="text-gold-gradient italic">
                Café Estratégico
              </span>
              <br />
              <span className="text-foreground">com Malu Fontes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 text-muted-foreground text-base md:text-lg max-w-md leading-relaxed text-pretty"
            >
              Uma conversa estratégica para transformar reflexão em decisões
              para os próximos 12 meses..
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            >
              <button
                onClick={scrollToBooking}
                className="shimmer-btn text-background font-semibold px-8 py-3.5 rounded-lg text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(184,149,106,0.3)]"
              >
                Escolher meu horário
              </button>
              <span className="text-gold font-serif text-2xl font-semibold">
                Investimento: R$ 500
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

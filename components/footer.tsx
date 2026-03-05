"use client"

import { Coffee } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Coffee className="w-5 h-5 text-gold" />
          <span className="font-serif text-lg text-foreground">
            Coffee Break Mentorship
          </span>
        </div>
        <p className="text-muted-foreground text-sm text-center md:text-right">
          Uma experiencia exclusiva de mentoria e networking premium.
        </p>
      </div>
    </footer>
  )
}

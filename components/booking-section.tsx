"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { format, isSameDay } from "date-fns"
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  CreditCard,
  QrCode,
  ArrowLeft,
} from "lucide-react"

// Datas e horarios disponiveis
const AVAILABLE_SCHEDULE: { date: Date; startHour: number; endHour: number }[] = [
  { date: new Date(2026, 2, 10), startHour: 11, endHour: 15 }, // 10 de marco: 11:00 as 15:00
  { date: new Date(2026, 2, 11), startHour: 11, endHour: 13 }, // 11 de marco: 11:00 as 13:00
  { date: new Date(2026, 2, 12), startHour: 16, endHour: 19 }, // 12 de marco: 16:00 as 19:00
  { date: new Date(2026, 2, 16), startHour: 12, endHour: 17 }, // 16 de marco: 12:00 as 17:00
]

function generateTimeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = []
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`)
  }
  return slots
}

function isAvailableDate(date: Date): boolean {
  return AVAILABLE_SCHEDULE.some((s) => isSameDay(s.date, date))
}

function getTimeSlotsForDate(date: Date): string[] {
  const schedule = AVAILABLE_SCHEDULE.find((s) => isSameDay(s.date, date))
  if (!schedule) return []
  return generateTimeSlots(schedule.startHour, schedule.endHour)
}

type Step = "date" | "time" | "checkout"

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>("date")
  const [isConfirmed, setIsConfirmed] = useState(false)

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []
    return getTimeSlotsForDate(selectedDate)
  }, [selectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setSelectedTime(null)
      setCurrentStep("time")
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setCurrentStep("checkout")
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  const handleReset = () => {
    setSelectedDate(undefined)
    setSelectedTime(null)
    setCurrentStep("date")
    setIsConfirmed(false)
  }

  const goBack = () => {
    if (currentStep === "checkout") {
      setSelectedTime(null)
      setCurrentStep("time")
    } else if (currentStep === "time") {
      setCurrentStep("date")
    }
  }

  const stepIndicator = (
    <div className="flex items-center justify-center gap-3 mb-10">
      {(["date", "time", "checkout"] as Step[]).map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              currentStep === step
                ? "bg-gold text-background"
                : i < ["date", "time", "checkout"].indexOf(currentStep)
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {i < ["date", "time", "checkout"].indexOf(currentStep) ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              i + 1
            )}
          </div>
          {i < 2 && (
            <div
              className={`w-12 h-px transition-all duration-300 ${
                i < ["date", "time", "checkout"].indexOf(currentStep)
                  ? "bg-gold/40"
                  : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  if (isConfirmed) {
    return (
      <section id="agendamento" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-gold rounded-2xl p-12 glow-gold"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-3xl text-foreground mb-4">
              Reserva Confirmada
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {"Sua sessao esta agendada para "}
              <span className="text-gold font-medium">
                {selectedDate && format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>{" "}
              {"as "}
              <span className="text-gold font-medium">{selectedTime}</span>.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Voce recebera um e-mail com todos os detalhes e instrucoes de pagamento.
            </p>
            <button
              onClick={handleReset}
              className="text-gold/70 hover:text-gold text-sm underline underline-offset-4 transition-colors"
            >
              Fazer nova reserva
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-16 md:py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight text-balance">
            Escolha sua <span className="text-gold-gradient italic">data</span>
          </h2>
        </motion.div>

        {stepIndicator}

        <AnimatePresence mode="wait">
          {currentStep === "date" && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="glass-gold rounded-2xl p-6 md:p-8 glow-gold">
                <div className="flex items-center gap-3 mb-6">
                  <CalendarDays className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-xl text-foreground">
                    Selecione a data
                  </h3>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  defaultMonth={new Date(2026, 2)}
                  disabled={(date) => !isAvailableDate(date)}
                  className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                  classNames={{
                    root: "w-fit bg-transparent",
                    month_caption: "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
                    weekday: "text-gold/60 rounded-md flex-1 font-normal text-[0.8rem] select-none",
                  }}
                />
                <p className="text-muted-foreground text-xs text-center mt-4">
                  Apenas datas com disponibilidade podem ser selecionadas
                </p>
              </div>
            </motion.div>
          )}

          {currentStep === "time" && (
            <motion.div
              key="time"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="glass-gold rounded-2xl p-6 md:p-8 glow-gold w-full max-w-lg">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-muted-foreground hover:text-gold text-sm mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Alterar data
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-xl text-foreground">
                    Selecione o horario
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  {selectedDate &&
                    format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`rounded-xl py-4 px-6 text-center font-medium transition-all duration-300 border ${
                        selectedTime === time
                          ? "bg-gold text-background border-gold"
                          : "border-gold/15 text-foreground hover:border-gold/40 hover:bg-gold/5"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="glass-gold rounded-2xl p-6 md:p-10 glow-gold w-full max-w-lg">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-muted-foreground hover:text-gold text-sm mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Alterar horario
                </button>

                <h3 className="font-serif text-2xl text-foreground mb-8">
                  Resumo da Reserva
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Data
                    </span>
                    <span className="text-foreground font-medium">
                      {selectedDate &&
                        format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horario
                    </span>
                    <span className="text-foreground font-medium">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-foreground text-lg font-serif">
                      Total
                    </span>
                    <span className="text-gold text-2xl font-serif font-semibold">
                      R$ 500,00
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleConfirm}
                    className="w-full shimmer-btn text-background font-semibold py-4 rounded-lg text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,149,106,0.3)] flex items-center justify-center gap-3"
                  >
                    <QrCode className="w-5 h-5" />
                    Finalizar via Pix
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="w-full border border-gold/30 text-gold font-semibold py-4 rounded-lg text-lg tracking-wide transition-all duration-300 hover:bg-gold/5 hover:border-gold/50 flex items-center justify-center gap-3"
                  >
                    <CreditCard className="w-5 h-5" />
                    Finalizar via Cartao
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

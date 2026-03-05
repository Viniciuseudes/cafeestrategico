"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, isSameDay } from "date-fns";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  QrCode,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Copy,
  Check,
} from "lucide-react";

// O seu código Pix Copia e Cola do Banco do Brasil
const PIX_PAYLOAD =
  "00020126720014br.gov.bcb.pix0114124749050001820232Cafe Estrategico com Malu Fontes5204000053039865406500.005802BR5918IDEALE CONSULTORIA6005NATAL62290525ciekYz7mCDZcI9VHLOZ4fxYY96304D698";

// Datas e horários disponíveis
const AVAILABLE_SCHEDULE: { date: Date; startHour: number; endHour: number }[] =
  [
    { date: new Date(2026, 2, 10), startHour: 11, endHour: 15 }, // 10 de março
    { date: new Date(2026, 2, 11), startHour: 11, endHour: 13 }, // 11 de março
    { date: new Date(2026, 2, 12), startHour: 16, endHour: 19 }, // 12 de março
    { date: new Date(2026, 2, 16), startHour: 12, endHour: 17 }, // 16 de março
  ];

function generateTimeSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

function isAvailableDate(date: Date): boolean {
  return AVAILABLE_SCHEDULE.some((s) => isSameDay(s.date, date));
}

function getTimeSlotsForDate(date: Date): string[] {
  const schedule = AVAILABLE_SCHEDULE.find((s) => isSameDay(s.date, date));
  if (!schedule) return [];
  return generateTimeSlots(schedule.startHour, schedule.endHour);
}

type Step = "date" | "time" | "checkout";

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("date");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para os dados do usuário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getTimeSlotsForDate(selectedDate);
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setSelectedTime(null);
      setCurrentStep("time");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("checkout");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!formData.name || !formData.email || !formData.whatsapp) {
      alert("Por favor, preencha todos os dados para continuar.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: format(selectedDate!, "dd/MM/yyyy"),
          time: selectedTime,
        }),
      });

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        alert("Ocorreu um erro ao enviar o agendamento. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão. Verifique sua internet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setSelectedTime(null);
    setFormData({ name: "", email: "", whatsapp: "" });
    setCurrentStep("date");
    setIsConfirmed(false);
  };

  const goBack = () => {
    if (currentStep === "checkout") {
      setCurrentStep("time");
    } else if (currentStep === "time") {
      setCurrentStep("date");
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_PAYLOAD);
    alert(
      "Código Pix copiado com sucesso! Abra o app do seu banco e escolha a opção 'Pix Copia e Cola'.",
    );
  };

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
  );

  if (isConfirmed) {
    return (
      <section id="agendamento" className="py-16 md:py-24 px-4 relative">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-gold rounded-2xl p-8 md:p-12 glow-gold"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-3xl text-foreground mb-4">
              Reserva Solicitada!
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Sua sessão para{" "}
              <strong className="text-gold">
                {selectedDate &&
                  format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}{" "}
                às {selectedTime}
              </strong>{" "}
              foi pré-agendada.
            </p>

            <div className="bg-secondary/50 p-6 rounded-xl border border-gold/20 mb-8">
              <p className="text-sm text-foreground mb-4 font-medium">
                Para confirmar definitivamente, realize o pagamento via Pix
                Copia e Cola:
              </p>

              <div className="flex flex-col gap-3">
                <code className="text-xs bg-background p-3 rounded-md border border-border break-all text-left text-muted-foreground select-all">
                  {PIX_PAYLOAD}
                </code>

                <button
                  onClick={handleCopyPix}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  Copiar Código Pix
                </button>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-8">
              Enviamos os detalhes para o seu e-mail:{" "}
              <strong className="text-foreground">{formData.email}</strong>.
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
    );
  }

  return (
    <section id="agendamento" className="py-16 md:py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Bloco de Posicionamento Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="glass-gold rounded-2xl p-8 border border-gold/20 shadow-[0_0_30px_rgba(184,149,106,0.05)]">
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 text-center">
              Para líderes que desejam:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "Inovar e reposicionar seus negócios com visão estratégica",
                "Alinhar carreira, vida e ambição com mais intencionalidade",
                "Tomar decisões estratégicas para os próximos 12 meses",
                "Ganhar clareza sobre dinheiro, ritmo de trabalho e prioridades",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="min-w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5 border border-gold/20">
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
                    month_caption:
                      "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
                    weekday:
                      "text-gold/60 rounded-md flex-1 font-normal text-[0.8rem] select-none",
                  }}
                />
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
                    Selecione o horário
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
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
                  Alterar horário
                </button>

                <h3 className="font-serif text-2xl text-foreground mb-6">
                  Seus Dados
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" /> Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-gold outline-none transition-colors"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" /> E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-gold outline-none transition-colors"
                      placeholder="joao@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" /> WhatsApp
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border rounded-lg p-3 text-foreground focus:border-gold outline-none transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-8">
                  <div className="flex items-center justify-between py-2 mb-2">
                    <span className="text-muted-foreground">Data/Hora</span>
                    <span className="text-foreground font-medium">
                      {selectedDate &&
                        format(selectedDate, "dd/MM", { locale: ptBR })}{" "}
                      às {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-foreground text-lg font-serif">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-gold text-2xl font-serif font-semibold block">
                        R$ 500,00
                      </span>
                    </div>
                  </div>

                  {/* Detalhes de Duração e Formato logo abaixo do valor */}
                  <div className="flex flex-col items-end gap-1 mt-1 text-sm text-muted-foreground">
                    <span>Duração: 1h</span>
                    <span>Formato: online ou presencial (café)</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full shimmer-btn text-background font-semibold py-4 rounded-lg text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,149,106,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <QrCode className="w-5 h-5" />
                  {isLoading ? "Processando..." : "Confirmar e Pagar via Pix"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

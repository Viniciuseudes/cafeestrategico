import { HeroSection } from "@/components/hero-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BookingSection />
      <Footer />
    </main>
  )
}

"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { GameCards } from "@/components/game-cards"
import { TournamentSection } from "@/components/tournament-section"
import { TokenSelectionModal } from "@/components/token-selection-modal"
import { PackageModal } from "@/components/package-modal"
import { PaymentModal } from "@/components/payment-modal"
import { Footer } from "@/components/footer"
import { PiNetworkProvider } from "@/components/pi-network-provider"

export default function HomePage() {
  return (
    <PiNetworkProvider>
      <div className="min-h-screen">
        <Header />

        <main className="pt-20">
          <HeroSection />
          <GameCards />
          <TournamentSection />
        </main>
        <Footer />

        {/* Modals */}
        <TokenSelectionModal />
        <PackageModal />
        <PaymentModal />
      </div>
    </PiNetworkProvider>
  )
}

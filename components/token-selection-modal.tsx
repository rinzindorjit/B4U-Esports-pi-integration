"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useModalStore } from "@/lib/modal-store"
import { usePiNetwork } from "@/components/pi-network-provider"

export function TokenSelectionModal() {
  const { isTokenSelectionOpen, closeTokenSelection, openPackageModal } = useModalStore()
  const { isAuthenticated } = usePiNetwork()

  const handleGameSelect = (gameType: "pubg" | "mlbb") => {
    if (!isAuthenticated) {
      alert("Please sign in with Pi Network first")
      return
    }
    openPackageModal(gameType)
  }

  return (
    <Dialog open={isTokenSelectionOpen} onOpenChange={closeTokenSelection}>
      <DialogContent className="bg-purple-900 border-purple-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Select Game Token</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 p-4">
          <Button
            onClick={() => handleGameSelect("pubg")}
            className="h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
          >
            🎮 PUBG Mobile UC
          </Button>

          <Button
            onClick={() => handleGameSelect("mlbb")}
            className="h-20 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg"
          >
            💎 Mobile Legends Diamonds
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

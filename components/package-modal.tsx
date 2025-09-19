"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useModalStore } from "@/lib/modal-store"
import { Coins } from "lucide-react"

const pubgPackages = [
  { uc: 60, price: 2, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
  { uc: 325, price: 8, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
  { uc: 660, price: 15, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
  { uc: 1800, price: 25, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
  { uc: 3850, price: 50, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
  { uc: 8100, price: 92, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077315-1.png" },
]

const mlbbPackages = [
  { dias: 55, price: 2, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
  { dias: 275, price: 8, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
  { dias: 565, price: 12, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
  { dias: 1155, price: 25, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
  { dias: 1765, price: 35, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
  { dias: 2975, price: 55, img: "https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png" },
]

const socialPackages = [
  { name: "Basic Boost", price: 5, description: "Basic social media engagement" },
  { name: "Premium Boost", price: 15, description: "Enhanced social media package" },
  { name: "Ultimate Boost", price: 30, description: "Maximum social media boost" },
]

export function PackageModal() {
  const { isPackageModalOpen, packageType, closePackageModal, openPaymentModal } = useModalStore()

  const getPackages = () => {
    switch (packageType) {
      case "pubg":
        return pubgPackages
      case "mlbb":
        return mlbbPackages
      case "social":
        return socialPackages
      default:
        return []
    }
  }

  const getTitle = () => {
    switch (packageType) {
      case "pubg":
        return "Select PUBG Mobile UC Package"
      case "mlbb":
        return "Select MLBB Diamonds Package"
      case "social":
        return "Select Social Media Package"
      default:
        return "Select Package"
    }
  }

  const handlePackageSelect = (pkg: any) => {
    let product = ""
    let quantity = null

    if (packageType === "pubg") {
      product = `${pkg.uc} UC`
      quantity = pkg.uc
    } else if (packageType === "mlbb") {
      product = `${pkg.dias} DIAS`
      quantity = pkg.dias
    } else if (packageType === "social") {
      product = pkg.name
    }

    openPaymentModal(product, pkg.price, packageType!, quantity)
  }

  return (
    <Dialog open={isPackageModalOpen} onOpenChange={closePackageModal}>
      <DialogContent className="bg-purple-900 border-purple-600 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{getTitle()}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {getPackages().map((pkg, index) => (
            <Card key={index} className="bg-purple-800/50 border-purple-600">
              <CardContent className="p-4 text-center">
                {(packageType === "pubg" || packageType === "mlbb") && (
                  <img
                    src={pkg.img || "/placeholder.svg"}
                    alt={packageType === "pubg" ? `${pkg.uc} UC` : `${pkg.dias} DIAS`}
                    className="w-full h-24 object-contain mb-3"
                  />
                )}
                <div className="font-bold text-lg mb-2">
                  {packageType === "pubg" && `${pkg.uc} UC`}
                  {packageType === "mlbb" && `${pkg.dias} DIAS`}
                  {packageType === "social" && pkg.name}
                </div>
                {packageType === "social" && <div className="text-sm text-gray-300 mb-2">{pkg.description}</div>}
                <div className="text-yellow-400 font-bold mb-3">{pkg.price} π</div>
                <Button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  <Coins className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

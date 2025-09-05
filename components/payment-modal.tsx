"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModalStore } from "@/lib/modal-store"
import { usePiNetwork } from "@/components/pi-network-provider"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export function PaymentModal() {
  const { isPaymentModalOpen, paymentData, closePaymentModal } = useModalStore()
  const { user, createPayment } = usePiNetwork()

  const [formData, setFormData] = useState({
    email: "",
    socialUrl: "",
    pubgId: "",
    mlbbUserId: "",
    mlbbZoneId: "",
  })

  const [paymentStatus, setPaymentStatus] = useState<{
    message: string
    type: "loading" | "success" | "error" | null
  }>({ message: "", type: null })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.email) {
      setPaymentStatus({ message: "Please enter a valid email address", type: "error" })
      return false
    }

    if (paymentData?.type === "social" && !formData.socialUrl) {
      setPaymentStatus({ message: "Please enter a valid social media URL", type: "error" })
      return false
    }

    if (paymentData?.type === "pubg" && (!formData.pubgId || isNaN(Number(formData.pubgId)))) {
      setPaymentStatus({ message: "Please enter a valid numeric PUBG Mobile Player ID", type: "error" })
      return false
    }

    if (paymentData?.type === "mlbb") {
      if (
        !formData.mlbbUserId ||
        isNaN(Number(formData.mlbbUserId)) ||
        !formData.mlbbZoneId ||
        isNaN(Number(formData.mlbbZoneId))
      ) {
        setPaymentStatus({ message: "Please enter valid numeric MLBB User ID and Zone ID", type: "error" })
        return false
      }
    }

    return true
  }

  const handlePayment = async () => {
    if (!paymentData || !user) return

    if (!validateForm()) return

    const piPaymentData = {
      amount: paymentData.amount,
      memo: `Payment for ${paymentData.product}`,
      metadata: {
        product: paymentData.product,
        piUsername: user.username,
        userEmail: formData.email,
        type: paymentData.type,
        timestamp: new Date().toISOString(),
        ...(paymentData.type === "social" && { socialUrl: formData.socialUrl }),
        ...(paymentData.type === "pubg" && {
          pubgId: Number.parseInt(formData.pubgId),
          ucAmount: paymentData.quantity,
        }),
        ...(paymentData.type === "mlbb" && {
          mlbbUserId: Number.parseInt(formData.mlbbUserId),
          mlbbZoneId: Number.parseInt(formData.mlbbZoneId),
          diasAmount: paymentData.quantity,
        }),
      },
    }

    const paymentCallbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval with paymentId:", paymentId)
        setPaymentStatus({ message: "Waiting for server approval...", type: "loading" })

        try {
          const response = await fetch("/api/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, paymentData: piPaymentData }),
          })

          if (!response.ok) {
            throw new Error(`Server approval failed with status ${response.status}`)
          }

          const result = await response.json()
          console.log("Payment approved:", result)
        } catch (error: any) {
          console.error("Server approval error:", error)
          setPaymentStatus({ message: `Server approval failed: ${error.message}`, type: "error" })
        }
      },

      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Ready for server completion with paymentId and txid:", paymentId, txid)
        setPaymentStatus({ message: "Completing payment...", type: "loading" })

        try {
          const response = await fetch("/api/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid, paymentData: piPaymentData }),
          })

          if (!response.ok) {
            throw new Error(`Server completion failed with status ${response.status}`)
          }

          const result = await response.json()
          console.log("Payment completed successfully:", result)
          setPaymentStatus({
            message:
              "Payment successful! Please send the transaction screenshot to info@b4uesports.com or WhatsApp: +97517875099.",
            type: "success",
          })

          setTimeout(() => {
            closePaymentModal()
            setPaymentStatus({ message: "", type: null })
          }, 5000)
        } catch (error: any) {
          console.error("Payment completion error:", error)
          setPaymentStatus({ message: `Payment completion failed: ${error.message}`, type: "error" })
        }
      },

      onCancel: (paymentId: string) => {
        console.log("Payment cancelled with paymentId:", paymentId)
        setPaymentStatus({ message: "Payment cancelled", type: "error" })
        setTimeout(() => {
          closePaymentModal()
          setPaymentStatus({ message: "", type: null })
        }, 3000)
      },

      onError: (error: any, payment?: any) => {
        console.error("Payment error:", error, payment)
        setPaymentStatus({ message: `Error: ${error.message}`, type: "error" })
      },
    }

    try {
      await createPayment(piPaymentData, paymentCallbacks)
      setPaymentStatus({ message: "Initiating payment...", type: "loading" })
    } catch (error: any) {
      console.error("Payment creation error:", error)
      setPaymentStatus({ message: `Payment creation failed: ${error.message}`, type: "error" })
    }
  }

  const handleClose = () => {
    closePaymentModal()
    setPaymentStatus({ message: "", type: null })
    setFormData({
      email: "",
      socialUrl: "",
      pubgId: "",
      mlbbUserId: "",
      mlbbZoneId: "",
    })
  }

  return (
    <Dialog open={isPaymentModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-purple-900 border-purple-600 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          <div>
            <Label>Product</Label>
            <Input value={paymentData?.product || ""} readOnly className="bg-purple-800 border-purple-600" />
          </div>

          <div>
            <Label>Amount (π)</Label>
            <Input value={paymentData?.amount || ""} readOnly className="bg-purple-800 border-purple-600" />
          </div>

          <div>
            <Label>Pi Username</Label>
            <Input value={user?.username || ""} readOnly className="bg-purple-800 border-purple-600" />
          </div>

          <div>
            <Label>Email Address *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-purple-800 border-purple-600"
              placeholder="your@email.com"
            />
          </div>

          {paymentData?.type === "social" && (
            <div>
              <Label>Social Media URL *</Label>
              <Input
                value={formData.socialUrl}
                onChange={(e) => handleInputChange("socialUrl", e.target.value)}
                className="bg-purple-800 border-purple-600"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
          )}

          {paymentData?.type === "pubg" && (
            <div>
              <Label>PUBG Mobile Player ID *</Label>
              <Input
                value={formData.pubgId}
                onChange={(e) => handleInputChange("pubgId", e.target.value)}
                className="bg-purple-800 border-purple-600"
                placeholder="123456789"
              />
            </div>
          )}

          {paymentData?.type === "mlbb" && (
            <>
              <div>
                <Label>MLBB User ID *</Label>
                <Input
                  value={formData.mlbbUserId}
                  onChange={(e) => handleInputChange("mlbbUserId", e.target.value)}
                  className="bg-purple-800 border-purple-600"
                  placeholder="123456789"
                />
              </div>
              <div>
                <Label>MLBB Zone ID *</Label>
                <Input
                  value={formData.mlbbZoneId}
                  onChange={(e) => handleInputChange("mlbbZoneId", e.target.value)}
                  className="bg-purple-800 border-purple-600"
                  placeholder="1234"
                />
              </div>
            </>
          )}

          {paymentStatus.type && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 ${
                paymentStatus.type === "success"
                  ? "bg-green-600/20 border border-green-500"
                  : paymentStatus.type === "error"
                    ? "bg-red-600/20 border border-red-500"
                    : "bg-blue-600/20 border border-blue-500"
              }`}
            >
              {paymentStatus.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {paymentStatus.type === "success" && <CheckCircle className="h-4 w-4" />}
              {paymentStatus.type === "error" && <AlertCircle className="h-4 w-4" />}
              <span className="text-sm">{paymentStatus.message}</span>
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={paymentStatus.type === "loading"}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            {paymentStatus.type === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay with Pi Network"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

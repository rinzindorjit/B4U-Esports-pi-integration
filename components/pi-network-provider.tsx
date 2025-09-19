"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

declare global {
  interface Window {
    Pi: any
  }
}

interface PiUser {
  uid: string
  username: string
}

interface PiAuthResult {
  accessToken: string
  user: PiUser
}

interface PiNetworkContextType {
  isInitialized: boolean
  isAuthenticated: boolean
  user: PiUser | null
  authenticate: () => Promise<void>
  createPayment: (paymentData: any, callbacks: any) => Promise<void>
  getWalletAddress: () => Promise<string>
  openShareDialog: (title: string, message: string) => void
}

const PiNetworkContext = createContext<PiNetworkContextType | null>(null)

export function usePiNetwork() {
  const context = useContext(PiNetworkContext)
  if (!context) {
    throw new Error("usePiNetwork must be used within a PiNetworkProvider")
  }
  return context
}

interface PiNetworkProviderProps {
  children: ReactNode
}

export function PiNetworkProvider({ children }: PiNetworkProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<PiUser | null>(null)

  useEffect(() => {
    const initializePiSDK = async () => {
      try {
        if (window.Pi) {
          console.log("[v0] Pi SDK already loaded, initializing...")
          await initializePi()
          return
        }

        // Load Pi SDK script
        const script = document.createElement("script")
        script.src = "https://sdk.minepi.com/pi-sdk.js"
        script.onload = async () => {
          console.log("[v0] Pi SDK script loaded")
          await initializePi()
        }
        script.onerror = (error) => {
          console.error("[v0] Failed to load Pi SDK:", error)
        }
        document.head.appendChild(script)
      } catch (error) {
        console.error("Error initializing Pi SDK:", error)
      }
    }

    const initializePi = async () => {
      try {
        if (window.Pi) {
          console.log("[v0] Initializing Pi SDK...")
          await window.Pi.init({
            version: "2.0",
            sandbox: process.env.NODE_ENV === "development",
          })
          console.log("[v0] Pi SDK initialized successfully")
          setIsInitialized(true)

          try {
            if (
              window.Pi.isAuthenticated &&
              typeof window.Pi.isAuthenticated === "function" &&
              window.Pi.isAuthenticated()
            ) {
              console.log("[v0] User already authenticated, getting user data...")
              const authResult = await window.Pi.authenticate(["username", "payments"], onIncompletePaymentFound)
              setUser(authResult.user)
              setIsAuthenticated(true)
              console.log("[v0] Auto-authentication successful")
            }
          } catch (authError) {
            console.log("[v0] Auto-authentication failed or not available:", authError)
            // This is not a critical error, user can still authenticate manually
          }
        }
      } catch (error) {
        console.error("[v0] Pi SDK initialization failed:", error)
      }
    }

    initializePiSDK()
  }, [])

  const onIncompletePaymentFound = (payment: any) => {
    console.log("Incomplete payment found:", payment)
    return confirm("You have an incomplete payment. Do you want to continue with this payment?")
  }

  const authenticate = async () => {
    if (!isInitialized) {
      throw new Error("Pi Network SDK is not initialized yet")
    }

    try {
      console.log("[v0] Starting authentication...")
      const scopes = ["username", "payments"]
      const authResult: PiAuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
      setUser(authResult.user)
      setIsAuthenticated(true)
      console.log("[v0] Authentication successful:", authResult.user.username)
    } catch (error) {
      console.error("Authentication error:", error)
      throw error
    }
  }

  const createPayment = async (paymentData: any, callbacks: any) => {
    if (!isInitialized || !isAuthenticated) {
      throw new Error("Pi Network not initialized or user not authenticated")
    }

    return await window.Pi.createPayment(paymentData, callbacks)
  }

  const getWalletAddress = async () => {
    if (!isInitialized || !isAuthenticated) {
      throw new Error("Pi Network not initialized or user not authenticated")
    }

    return await window.Pi.getWalletAddress()
  }

  const openShareDialog = (title: string, message: string) => {
    if (isInitialized) {
      window.Pi.openShareDialog(title, message)
    }
  }

  const value: PiNetworkContextType = {
    isInitialized,
    isAuthenticated,
    user,
    authenticate,
    createPayment,
    getWalletAddress,
    openShareDialog,
  }

  return <PiNetworkContext.Provider value={value}>{children}</PiNetworkContext.Provider>
}

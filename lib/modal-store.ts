import { create } from "zustand"

interface PaymentData {
  product: string
  amount: number
  type: "pubg" | "mlbb" | "social"
  quantity?: number
}

interface ModalStore {
  isTokenSelectionOpen: boolean
  isPackageModalOpen: boolean
  isPaymentModalOpen: boolean
  packageType: "pubg" | "mlbb" | "social" | null
  paymentData: PaymentData | null

  openTokenSelection: () => void
  closeTokenSelection: () => void
  openPackageModal: (type: "pubg" | "mlbb" | "social") => void
  closePackageModal: () => void
  openPaymentModal: (product: string, amount: number, type: "pubg" | "mlbb" | "social", quantity?: number) => void
  closePaymentModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isTokenSelectionOpen: false,
  isPackageModalOpen: false,
  isPaymentModalOpen: false,
  packageType: null,
  paymentData: null,

  openTokenSelection: () => set({ isTokenSelectionOpen: true }),
  closeTokenSelection: () => set({ isTokenSelectionOpen: false }),

  openPackageModal: (type) =>
    set({
      packageType: type,
      isPackageModalOpen: true,
      isTokenSelectionOpen: false,
    }),
  closePackageModal: () =>
    set({
      isPackageModalOpen: false,
      packageType: null,
    }),

  openPaymentModal: (product, amount, type, quantity) =>
    set({
      paymentData: { product, amount, type, quantity },
      isPaymentModalOpen: true,
      isPackageModalOpen: false,
    }),
  closePaymentModal: () =>
    set({
      isPaymentModalOpen: false,
      paymentData: null,
    }),
}))

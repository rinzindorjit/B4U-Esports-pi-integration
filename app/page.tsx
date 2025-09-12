"use client";

import { useState } from "react";
import { Payment } from "@/components/payment";
import { PiPayment } from "@/types";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [selectedProduct] = useState({
    name: "Premium Digital Product",
    price: 19.99
  });

  const handlePaymentComplete = (paymentData: PiPayment) => {
    console.log("Payment completed successfully:", paymentData);
    // Redirect to success page with payment data
    router.push(`/success?paymentId=${paymentData.identifier}&amount=${selectedProduct.price}&product=${encodeURIComponent(selectedProduct.name)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Welcome to Pi Network Store
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of decentralized commerce with Pi cryptocurrency payments. 
            Fast, secure, and borderless transactions for the digital age.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Your Order</h2>
            <p className="text-muted-foreground text-lg">
              {selectedProduct.name} - <strong>{selectedProduct.price} π</strong>
            </p>
          </div>
          
          <Payment
            amount={selectedProduct.price}
            productName={selectedProduct.name}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h3 className="text-lg font-semibold mb-6 text-foreground">Why Pay with Pi?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="w-10 h-10 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">⚡</span>
              </div>
              <h4 className="font-medium mb-2 text-foreground">Instant Transactions</h4>
              <p className="text-muted-foreground">No waiting for confirmations. Payments are processed instantly.</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="w-10 h-10 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h4 className="font-medium mb-2 text-foreground">Secure & Private</h4>
              <p className="text-muted-foreground">Your financial data remains private and secure on the blockchain.</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="w-10 h-10 bg-[#14b8a6] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🌍</span>
              </div>
              <h4 className="font-medium mb-2 text-foreground">Borderless</h4>
              <p className="text-muted-foreground">Pay anyone, anywhere in the world without currency conversions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

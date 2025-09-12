"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { PiAuthResult, PiPayment, PaymentProps } from "@/types";

export function Payment({ amount, productName, onPaymentComplete }: PaymentProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<PiUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Handle Pi Network authentication
  const handlePiAuth = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Check if Pi SDK is available
      if (typeof window !== "undefined" && (window as any).Pi) {
        const Pi = (window as any).Pi;
        
        // Initialize Pi SDK
        await Pi.init({ version: "2.0", sandbox: process.env.NODE_ENV === "development" });
        
        // Authenticate with Pi Network
        const authResult: PiAuthResult = await Pi.authenticate(["username", "payments"], (authResult: PiAuthResult) => {
          handleAuthSuccess(authResult);
        });
        
        handleAuthSuccess(authResult);
      } else {
        throw new Error("Pi SDK not loaded. Please check your internet connection and make sure you're using Pi Browser.");
      }
    } catch (error: any) {
      console.error("Pi authentication failed:", error);
      setAuthError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (authResult: PiAuthResult) => {
    setIsAuthenticated(true);
    setUser(authResult.user);
    setAuthError(null);
  };

  // Handle payment process
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      if (typeof window !== "undefined" && (window as any).Pi && user) {
        const Pi = (window as any).Pi;
        
        // Create payment
        const paymentData: PiPayment = await Pi.createPayment({
          amount: amount,
          memo: `Purchase: ${productName}`,
          metadata: { 
            productId: productName.toLowerCase().replace(/\s+/g, '-'),
            timestamp: new Date().toISOString(),
            userId: user.uid
          },
        });

        console.log("Payment created:", paymentData);

        // Set up payment completion handler
        Pi.onPaymentComplete(paymentData.identifier, (completedPayment: PiPayment) => {
          console.log("Payment completed:", completedPayment);
          onPaymentComplete(completedPayment);
        });

        // For development/testing without actual Pi payments
        if (process.env.NODE_ENV === "development") {
          // Simulate payment completion after 2 seconds
          setTimeout(() => {
            onPaymentComplete({
              ...paymentData,
              transaction: { txid: "simulated_tx_" + Date.now() }
            });
          }, 2000);
        }
      } else {
        throw new Error("Payment system not available");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      alert("Payment failed: " + (error.message || "Please try again."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-muted">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-foreground">
          Complete Payment
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Pay with Pi Network for <strong>{productName}</strong>
        </CardDescription>
        <div className="pt-2">
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-lg font-semibold text-primary">
              {amount.toFixed(2)} π
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isAuthenticated ? (
          // Authentication Section
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Sign in with your Pi Network account to complete your payment
              </p>
              
              {authError && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{authError}</p>
                </div>
              )}
            </div>
            
            <Button
              onClick={handlePiAuth}
              disabled={isLoading}
              className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-medium py-3 text-base"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting to Pi Network...
                </>
              ) : (
                <>
                  <span className="mr-2">π</span>
                  Sign in with Pi Network
                </>
              )}
            </Button>
            
            <div className="text-xs text-muted-foreground text-center">
              <p>Make sure you have the Pi Browser installed</p>
              <p>and are logged into your Pi account</p>
            </div>
          </div>
        ) : (
          // Payment Section
          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="product" className="text-sm font-medium">
                  Product
                </Label>
                <Input
                  id="product"
                  value={productName}
                  disabled
                  className="font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount (π)
                </Label>
                <Input
                  id="amount"
                  value={amount.toFixed(2)}
                  disabled
                  className="font-mono text-lg font-bold text-center"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user" className="text-sm font-medium">
                  Pi Username
                </Label>
                <Input
                  id="user"
                  value={user?.username || "Unknown"}
                  disabled
                />
              </div>
            </div>
            
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 text-lg"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Confirm Payment - ${amount.toFixed(2)} π`
              )}
            </Button>
            
            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAuthenticated(false);
                  setUser(null);
                }}
                className="text-xs"
              >
                Use different account
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const amount = searchParams.get('amount');
  const product = searchParams.get('product');

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center shadow-xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-base">
                Thank you for your purchase using Pi Network
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-0">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                {product && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Product:</span>
                    <span className="text-sm font-medium text-foreground">{decodeURIComponent(product)}</span>
                  </div>
                )}
                
                {amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="text-sm font-medium text-foreground">{amount} π</span>
                  </div>
                )}
                
                {paymentId && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transaction ID:</span>
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">
                      {paymentId}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Your payment has been processed successfully. You will receive a confirmation email shortly.</p>
              </div>
              
              <div className="flex flex-col space-y-3 pt-4">
                <Button asChild className="bg-[#14b8a6] hover:bg-[#0d9488] gap-2">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="#">
                      <Download className="h-4 w-4 mr-2" />
                      Receipt
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="#">
                      View Orders
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

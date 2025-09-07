"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modals from "@/components/Modals";
import TournamentSection from "@/components/TournamentSection";
import { useModalStore } from "@/lib/modal-store";

export default function Home() {
  const [isPiInitialized, setIsPiInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { openPaymentModal, openTokenSelectionModal } = useModalStore();

  useEffect(() => {
    // Initialize Pi SDK
    const initializePi = async () => {
      if (typeof window !== "undefined" && (window as any).Pi) {
        try {
          await (window as any).Pi.init({ version: "2.0", sandbox: true });
          setIsPiInitialized(true);
          console.log("Pi SDK initialized");
        } catch (error) {
          console.error("Pi SDK initialization failed:", error);
        }
      }
    };

    initializePi();
  }, []);

  const authenticatePiUser = async () => {
    if (!isPiInitialized) return;

    try {
      const scopes = ['username', 'payments'];
      const authResult = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound);
      setCurrentUser(authResult.user);
      console.log("Authenticated:", authResult.user);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    console.log("Incomplete payment found:", payment);
    return confirm("You have an incomplete payment. Do you want to continue with this payment?");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-purple-800 text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-10">
        {/* Hero Section */}
        <section className="hero-section text-center py-12 px-4 rounded-2xl mb-8 bg-gradient-to-r from-purple-800 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-yellow-400">KUZUZANGPOLA!</span> Welcome to B4U Esports
            </h1>
            
            {!currentUser ? (
              <button
                onClick={authenticatePiUser}
                className="pi-auth-btn bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto mb-4 hover:shadow-lg transition-all"
                disabled={!isPiInitialized}
              >
                {isPiInitialized ? (
                  <>
                    <span>Sign In with Pi Network</span>
                    <span>π</span>
                  </>
                ) : (
                  "Initializing Pi..."
                )}
              </button>
            ) : (
              <div className="mb-4">
                <p className="text-lg mb-2">Welcome, {currentUser.username}!</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <button className="pi-action-btn bg-purple-700 px-4 py-2 rounded-lg">
                    Wallet
                  </button>
                  <button className="pi-action-btn bg-purple-700 px-4 py-2 rounded-lg">
                    Share
                  </button>
                </div>
              </div>
            )}

            <div className="registration-note bg-purple-800 border-2 border-yellow-400 p-4 rounded-lg max-w-2xl mx-auto mb-6 animate-pulse">
              <p className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-yellow-400">⚠️</span>
                <span>Using Pi Testnet - No real Pi will be deducted</span>
              </p>
            </div>

            <p className="text-xl opacity-90">Your Ultimate Gaming Marketplace</p>
          </div>
        </section>

        {/* Marketplace Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Marketplace Card */}
          <div className="card bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <div className="h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-600">Marketplace Image</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>🛒</span> Marketplace
            </h2>
            <p className="mb-4">Buy and sell gaming accounts and items</p>
            <button 
              onClick={() => openPaymentModal('Marketplace Listing', 5, 'marketplace')}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
            >
              List Your Item
            </button>
          </div>

          {/* In-game Tokens Card */}
          <div className="card bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <div className="h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-600">Tokens Image</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>🪙</span> In-game Tokens
            </h2>
            <p className="mb-4">Purchase various game currencies instantly</p>
            <button 
              onClick={openTokenSelectionModal}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
            >
              GET TOKENS
            </button>
          </div>

          {/* Social Boosting Card */}
          <div className="card bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <div className="h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-600">Social Boost Image</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <span>🚀</span> Social Boosting
            </h2>
            <p className="mb-4">Boost your online presence</p>
            <button 
              onClick={() => openPaymentModal('Social Boost', 15, 'social')}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
            >
              BOOST NOW
            </button>
          </div>
        </div>

        {/* Tournament Section */}
        <TournamentSection />
      </main>

      <Footer />
      <Modals currentUser={currentUser} />
    </div>
  );
    }

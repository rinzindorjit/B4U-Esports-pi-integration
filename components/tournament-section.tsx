"use client"

import { useModalStore } from "@/lib/modal-store"

export function TournamentSection() {
  const { openPaymentModal } = useModalStore()

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      {/* Tournament Header */}
      <div className="text-center mb-12" id="tournaments">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          <i className="fas fa-trophy mr-3 text-yellow-400"></i>
          PUBG Mobile Tournaments
        </h1>
        <p className="text-xl text-gray-300">Compete in our professional tournaments and win amazing prizes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Classic Tournament */}
        <div className="bg-[rgba(0,0,0,0.4)] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border border-[rgba(255,255,255,0.2)]">
          <div
            className="h-[200px] bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.7)]"></div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
              <i className="fas fa-map-marked-alt mr-3 text-orange-400"></i>
              Classic Tournament
            </h2>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-center mb-6 shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
              <div className="text-sm font-semibold mb-1 animate-fade-in" style={{ color: "#ffffff" }}>
                Total Prize Pool
              </div>
              <div className="text-3xl font-bold animate-glow" style={{ color: "#ffffff" }}>
                π 500
              </div>
            </div>

            <div className="space-y-3 mb-6 text-gray-200">
              <p>
                <i className="fas fa-users mr-2 text-blue-400"></i> <strong>Squad Mode:</strong> 4-6 players per team
              </p>
              <p>
                <i className="fas fa-tag mr-2 text-green-400"></i> <strong>Team Tag:</strong> [B4U] required in team
                name
              </p>
              <span className="bg-black px-2 py-1 rounded text-yellow-300 text-sm font-mono">
                (e.g. [B4U]YourTeamName)
              </span>
              <p>
                <i className="fas fa-map mr-2 text-purple-400"></i> <strong>Maps:</strong> Erangel, Miramar, Sanhok
              </p>
              <p>
                <i className="fas fa-calendar-alt mr-2 text-pink-400"></i> <strong>Schedule:</strong> Weekly tournaments
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                <i className="fas fa-gamepad mr-2 text-cyan-400"></i>
                Tournament Format:
              </h3>
              <div className="bg-black p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-yellow-300 font-semibold mb-2 flex items-center">
                  <i className="fas fa-users mr-2"></i>
                  Squad Battle Royale
                </h4>
                <p className="text-white mb-2">Classic PUBG rules with TPP perspective</p>
                <span className="bg-gray-800 px-2 py-1 rounded text-yellow-300 text-sm font-mono">
                  Team Tag: [B4U]YourTeamName
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
              <i className="fas fa-gavel mr-2 text-red-400"></i>
              Rules & Regulations:
            </h3>
            <ul className="rules-list space-y-2 mb-6">
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Team name must include [B4U] tag (e.g. [B4U]Legends)
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                No hacking or cheating of any kind
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Players must use their real PUBG IDs
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Teams must register 30 minutes before match
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Disconnections will not pause the game
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Top 3 teams by kills and placement will qualify
              </li>
            </ul>

            <button
              onClick={() => openPaymentModal("Classic Tournament Entry", 5, "tournament")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Register Now
            </button>
          </div>
        </div>

        {/* TDM Tournament */}
        <div className="bg-[rgba(0,0,0,0.4)] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border border-[rgba(255,255,255,0.2)]">
          <div
            className="h-[200px] bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.7)]"></div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
              <i className="fas fa-crosshairs mr-3 text-purple-400"></i>
              TDM Tournament
            </h2>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg text-center mb-6 shadow-lg animate-pulse hover:animate-bounce transition-all duration-300">
              <div className="text-sm font-semibold mb-1 animate-fade-in" style={{ color: "#ffffff" }}>
                Total Prize Pool
              </div>
              <div className="text-3xl font-bold animate-glow" style={{ color: "#ffffff" }}>
                π 300
              </div>
            </div>

            <div className="space-y-3 mb-6 text-gray-200">
              <p>
                <i className="fas fa-user mr-2 text-blue-400"></i> <strong>Modes:</strong> 1v1 Duel & 4v4 Team Battle
              </p>
              <p>
                <i className="fas fa-map mr-2 text-purple-400"></i> <strong>Maps:</strong> Warehouse, Ruins, Town
              </p>
              <p>
                <i className="fas fa-calendar-alt mr-2 text-pink-400"></i> <strong>Schedule:</strong> Daily quick
                matches
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                <i className="fas fa-gamepad mr-2 text-cyan-400"></i>
                Tournament Modes:
              </h3>
              <div className="space-y-3">
                <div className="bg-black p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="text-yellow-300 font-semibold mb-2 flex items-center">
                    <i className="fas fa-user mr-2"></i>
                    1v1 Duel
                  </h4>
                  <p className="text-white">First player to reach 20 kills wins the match</p>
                </div>
                <div className="bg-black p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="text-yellow-300 font-semibold mb-2 flex items-center">
                    <i className="fas fa-users mr-2"></i>
                    4v4 Team Battle
                  </h4>
                  <p className="text-white">First team to reach 40 kills wins the match</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
              <i className="fas fa-gavel mr-2 text-red-400"></i>
              Rules & Regulations:
            </h3>
            <ul className="rules-list space-y-2 mb-6">
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                No holding position for more than 5 seconds
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                No camping in spawn areas
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Only designated weapons allowed
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Players must maintain sportsmanship
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                Disconnections result in automatic loss
              </li>
              <li className="text-gray-100 pl-6 relative">
                <span className="absolute left-0 text-green-300 font-bold">✓</span>
                No grenades or throwables in 1v1 mode
              </li>
            </ul>

            <button
              onClick={() => openPaymentModal("TDM Tournament Entry", 3, "tournament")}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

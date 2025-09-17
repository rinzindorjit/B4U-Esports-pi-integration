'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Us Section with B4U Esports Logo */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Image 
                src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png" 
                alt="B4U Esports Logo" 
                width={32} 
                height={32} 
                className="rounded-lg mr-2"
              />
              B4U Esports
            </h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center">
                <span className="mr-2">ℹ️</span>About Us
              </h4>
              <p className="text-gray-300 leading-relaxed mb-4">
                B4U Esports is a pioneering gaming marketplace that bridges the gap between traditional gaming 
                and blockchain technology. Founded with the vision of making gaming currencies more accessible, 
                we specialize in providing secure, instant, and affordable in-game currency purchases for 
                popular mobile games like PUBG Mobile and Mobile Legends: Bang Bang.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our platform offers gamers a seamless experience to enhance their gameplay with top-ups, 
                tournament entries, and social media boosting services. We're committed to providing the best 
                value and service to our community of players worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center">
                <span className="mr-2">📜</span>Our History
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Established in 2024, B4U Esports began as a small team of passionate gamers who recognized 
                the need for a more accessible and secure way to purchase in-game currencies. Our journey 
                started with PUBG Mobile and quickly expanded to include other popular titles.
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                In 2025, we integrated Pi Network's revolutionary payment system, becoming one of the first 
                gaming platforms to accept Pi cryptocurrency. This integration has allowed us to serve a 
                global community of gamers while providing secure, low-cost transactions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we continue to innovate and expand our services, with plans to support more games, 
                tournaments, and gaming services. Our mission remains the same: to empower gamers with the 
                tools and currencies they need to succeed in their favorite games.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">🎮</span>
                  <span className="group-hover:underline">Dashboard</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Access your gaming dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">ℹ️</span>
                  <span className="group-hover:underline">About Us</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Learn about our company</span>
                </Link>
              </li>
              <li>
                <Link href="/our-history" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">📜</span>
                  <span className="group-hover:underline">Our History</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Our journey and milestones</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">🔒</span>
                  <span className="group-hover:underline">Privacy Policy</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">How we protect your data</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">📜</span>
                  <span className="group-hover:underline">Terms of Service</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Our service agreements</span>
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">💰</span>
                  <span className="group-hover:underline">Refund Policy</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Refund terms and conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/data-protection" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">🛡️</span>
                  <span className="group-hover:underline">Data Protection</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Your data security measures</span>
                </Link>
              </li>
              <li>
                <Link href="/user-agreement" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="mr-2 text-lg">📝</span>
                  <span className="group-hover:underline">User Agreement</span>
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-yellow-500">Terms of using our platform</span>
                </Link>
              </li>
              {/* Contact Information - placed after main links */}
              <li className="pt-2 border-t border-gray-700 mt-2">
                <a 
                  href="mailto:info@b4uesports.com" 
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 underline hover:no-underline flex items-start group"
                >
                  <span className="mr-2 mt-1">📧</span>
                  <span>
                    info@b4uesports.com
                    <span className="block text-gray-400 text-xs mt-1 group-hover:text-gray-300">For general inquiries and support</span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+97517875099" 
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 underline hover:no-underline flex items-start group"
                >
                  <span className="mr-2 mt-1">📱</span>
                  <span>
                    +97517875099
                    <span className="block text-gray-400 text-xs mt-1 group-hover:text-gray-300">For urgent support and business inquiries</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support Us</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-yellow-400 flex items-center">
                  <span className="mr-2">🌐</span>Follow Our Social Media
                </h4>
                <p className="text-gray-300 text-sm mb-3">
                  Stay updated with the latest news, tournaments, and special offers
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a 
                    href="https://facebook.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-pink-500 transition-colors duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-red-500 transition-colors duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://discord.gg/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-500 transition-colors duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full"
                    aria-label="Discord"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.077.077 0 01-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 B4U Esports Marketplace. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Powered by</span>
              <Image 
                src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg" 
                alt="Pi Network" 
                width={16} 
                height={16} 
                className="rounded-full"
              />
              <span className="text-yellow-400 font-semibold">Pi Network</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
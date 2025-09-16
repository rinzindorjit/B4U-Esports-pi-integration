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
            <h4 className="text-lg font-semibold mb-3 text-yellow-400">About Us</h4>
            <p className="text-gray-300 leading-relaxed mb-4">
              B4U Esports is a pioneering gaming marketplace that bridges the gap between traditional gaming 
              and blockchain technology. Founded with the vision of making gaming currencies more accessible, 
              we specialize in providing secure, instant, and affordable in-game currency purchases for 
              popular mobile games like PUBG Mobile and Mobile Legends: Bang Bang.
            </p>
            <h4 className="text-lg font-semibold mb-3 text-yellow-400">Our History</h4>
            <p className="text-gray-300 leading-relaxed">
              Since our establishment, we've been at the forefront of integrating Pi Network's revolutionary 
              payment system with gaming. Our platform represents the future of gaming transactions, offering 
              players a seamless way to purchase UC and Diamonds using Pi cryptocurrency. We're committed to 
              building a trusted community where gamers can enhance their gaming experience with complete confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors">Dashboard</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-gray-300 hover:text-yellow-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/data-protection" className="text-gray-300 hover:text-yellow-400 transition-colors">Data Protection</Link></li>
              <li><Link href="/user-agreement" className="text-gray-300 hover:text-yellow-400 transition-colors">User Agreement</Link></li>
            </ul>
          </div>

          {/* Support & Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support Us</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">Contact</h4>
                <p className="text-gray-300 text-sm">📧 info@b4uesports.com</p>
                <p className="text-gray-300 text-sm">📱 +97517875099</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-yellow-400">Follow Us</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a 
                    href="https://facebook.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-500 transition-colors"
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
                    className="text-gray-300 hover:text-blue-400 transition-colors"
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
                    className="text-gray-300 hover:text-pink-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.74 16.988H2.262L4.97 14.28c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323L2.262 6.347h1.478l1.386 1.297c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297l1.386-1.297h1.478L12.93 7.634c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323l2.708 2.708h-1.478l-1.386-1.297c-.875.807-2.026 1.297-3.323 1.297z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://discord.gg/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-500 transition-colors"
                    aria-label="Discord"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
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
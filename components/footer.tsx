export function Footer() {
  return (
    <footer className="bg-purple-900/50 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">ABOUT US</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://b4uescasts.com/our-history/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Our History
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/privacy-policy/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/data-protection/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Data Protection
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/cookie-policy/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">TERMS & CONDITIONS</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://b4uesports.com/terms-of-service/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/user-agreement/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  User Agreement
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/refund_returns/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Refund & Returns
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">CONTACT US</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="https://b4uesports.com/support/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://b4uesports.com/faqs/"
                  target="_blank"
                  className="hover:text-yellow-400"
                  rel="noreferrer"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">FOLLOW US</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com/b4uesports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 text-2xl"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://youtube.com/@b4uesports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 text-2xl"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.tiktok.com/b4uesports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 text-2xl"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://www.instagram.com/b4uesports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-400 text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://discord.gg/m2EcGPx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-400 text-2xl"
              >
                <i className="fab fa-discord"></i>
              </a>
              <a
                href="https://t.me/b4uesport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-2xl"
              >
                <i className="fab fa-telegram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/b4uesports/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 text-2xl"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-600 mt-8 pt-8 text-center text-gray-200">
          <p>&copy; 2025 B4U Esports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

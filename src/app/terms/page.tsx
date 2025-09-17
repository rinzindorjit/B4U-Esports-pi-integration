'use client'
import { useState } from 'react'

export default function TermsOfServicePage() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6 text-center">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('acceptance')}
              >
                <span>1. Acceptance of Terms</span>
                <span>{openSection === 'acceptance' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'acceptance' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    By accessing and using B4U Esports ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('service')}
              >
                <span>2. Service Description</span>
                <span>{openSection === 'service' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'service' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    B4U Esports is a gaming marketplace platform that allows users to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Purchase in-game currencies using Pi Network cryptocurrency</li>
                    <li>Access PUBG Mobile UC and Mobile Legends Diamonds</li>
                    <li>Manage gaming profiles and transaction history</li>
                    <li>Connect Pi Network wallets for secure payments</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('accounts')}
              >
                <span>3. User Accounts and Registration</span>
                <span>{openSection === 'accounts' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'accounts' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Pi Network Authentication</h3>
                  <p className="text-gray-700 mb-4">
                    Users must authenticate through Pi Network to access our services. By connecting your Pi Network account, you authorize us to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Access your Pi Network username and wallet address</li>
                    <li>Process payments through Pi Network</li>
                    <li>Store transaction records for your account</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Account Responsibility</h3>
                  <p className="text-gray-700 mb-4">
                    You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Providing accurate gaming account information</li>
                    <li>Maintaining the security of your Pi Network account</li>
                    <li>All activities conducted through your account</li>
                    <li>Ensuring you have access to the gaming accounts you specify</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('purchases')}
              >
                <span>4. Purchases and Payments</span>
                <span>{openSection === 'purchases' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'purchases' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Pi Network Payments</h3>
                  <p className="text-gray-700 mb-4">
                    All payments are processed through Pi Network cryptocurrency. By making a purchase, you agree that:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>All sales are final and non-refundable</li>
                    <li>Prices are subject to real-time Pi/USD conversion rates</li>
                    <li>You have sufficient Pi balance for the transaction</li>
                    <li>Transaction fees may apply as determined by Pi Network</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Testnet Operations</h3>
                  <p className="text-gray-700 mb-4">
                    Our platform currently operates on Pi Network's testnet for secure testing. No real Pi coins from your mainnet wallet will be deducted during transactions. All payments are simulated for development purposes.
                  </p>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Delivery</h3>
                  <p className="text-gray-700 mb-4">
                    In-game currencies will be delivered to the gaming accounts you specify. Delivery typically occurs within 24-48 hours. We are not responsible for delivery delays caused by:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Incorrect gaming account information</li>
                    <li>Game publisher maintenance or technical issues</li>
                    <li>Network connectivity problems</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('prohibited')}
              >
                <span>5. Prohibited Activities</span>
                <span>{openSection === 'prohibited' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'prohibited' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to manipulate prices or exploit system vulnerabilities</li>
                    <li>Provide false or misleading gaming account information</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Use automated systems or bots to access the service</li>
                    <li>Resell or redistribute purchased in-game currencies</li>
                    <li>Attempt to reverse engineer or copy our platform</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('intellectual')}
              >
                <span>6. Intellectual Property</span>
                <span>{openSection === 'intellectual' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'intellectual' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    The service and its original content, features, and functionality are and will remain the exclusive property of B4U Esports and its licensors. The service is protected by copyright, trademark, and other laws.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('third-party')}
              >
                <span>7. Third-Party Services</span>
                <span>{openSection === 'third-party' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'third-party' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    Our service integrates with third-party platforms including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Pi Network:</strong> For cryptocurrency payments and authentication</li>
                    <li><strong>Game Publishers:</strong> For in-game currency delivery</li>
                    <li><strong>CoinGecko API:</strong> For real-time price data</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    We are not responsible for the availability, content, or practices of these third-party services.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('liability')}
              >
                <span>8. Limitation of Liability</span>
                <span>{openSection === 'liability' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'liability' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    In no event shall B4U Esports, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('disclaimer')}
              >
                <span>9. Disclaimer</span>
                <span>{openSection === 'disclaimer' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'disclaimer' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    The information on this service is provided on an "as is" basis. We disclaim all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('termination')}
              >
                <span>10. Termination</span>
                <span>{openSection === 'termination' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'termination' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('changes')}
              >
                <span>11. Changes to Terms</span>
                <span>{openSection === 'changes' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'changes' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('contact')}
              >
                <span>12. Contact Information</span>
                <span>{openSection === 'contact' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'contact' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:info@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">info@b4uesports.com</a></p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> <a href="tel:+97517875099" className="text-blue-600 hover:text-blue-800 underline">+97517875099</a></p>
                    <p className="text-gray-700"><strong>Address:</strong> B4U Esports Legal Team</p>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <a 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'

export default function PrivacyPolicyPage() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6 text-center">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('introduction')}
              >
                <span>1. Introduction</span>
                <span>{openSection === 'introduction' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'introduction' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    B4U Esports ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our gaming marketplace platform that integrates with Pi Network for cryptocurrency payments.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('information')}
              >
                <span>2. Information We Collect</span>
                <span>{openSection === 'information' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'information' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Pi Network Information</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Pi Network username</li>
                    <li>Pi Network wallet address</li>
                    <li>Pi Network user ID</li>
                    <li>Payment transaction data</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Personal Information</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Email address</li>
                    <li>Contact number (optional)</li>
                    <li>Country of residence</li>
                    <li>Language preference</li>
                    <li>Referral code (optional)</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Gaming Information</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>PUBG Mobile: In-Game Name (IGN) and User ID (UID)</li>
                    <li>Mobile Legends: User ID and Zone ID</li>
                    <li>Transaction history and purchase records</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('use')}
              >
                <span>3. How We Use Your Information</span>
                <span>{openSection === 'use' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'use' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Process Pi Network cryptocurrency payments</li>
                    <li>Deliver in-game currencies (UC, Diamonds) to your gaming accounts</li>
                    <li>Maintain transaction records and provide customer support</li>
                    <li>Communicate with you about your purchases and account</li>
                    <li>Improve our services and user experience</li>
                    <li>Comply with legal obligations and prevent fraud</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('sharing')}
              >
                <span>4. Information Sharing</span>
                <span>{openSection === 'sharing' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'sharing' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>With Pi Network for payment processing and authentication</li>
                    <li>With game publishers for in-game currency delivery (only game IDs, not personal data)</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('security')}
              >
                <span>5. Data Security</span>
                <span>{openSection === 'security' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'security' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Encrypted data transmission (HTTPS)</li>
                    <li>Secure database storage</li>
                    <li>Access controls and authentication</li>
                    <li>Regular security assessments</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('testnet')}
              >
                <span>6. Pi Network Testnet</span>
                <span>{openSection === 'testnet' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'testnet' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    Our platform currently operates on Pi Network's testnet for secure testing. No real Pi coins from your mainnet wallet will be deducted during transactions. All payments are simulated for development and testing purposes.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('rights')}
              >
                <span>7. Your Rights</span>
                <span>{openSection === 'rights' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'rights' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Request data portability</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('contact')}
              >
                <span>8. Contact Information</span>
                <span>{openSection === 'contact' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'contact' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:info@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">info@b4uesports.com</a></p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> <a href="tel:+97517875099" className="text-blue-600 hover:text-blue-800 underline">+97517875099</a></p>
                    <p className="text-gray-700"><strong>Address:</strong> B4U Esports Privacy Team</p>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('changes')}
              >
                <span>9. Changes to This Policy</span>
                <span>{openSection === 'changes' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'changes' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
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
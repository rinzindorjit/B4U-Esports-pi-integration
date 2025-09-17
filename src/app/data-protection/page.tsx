'use client'
import { useState } from 'react'

export default function DataProtectionPage() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Data Protection Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6 text-center">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('commitment')}
              >
                <span>1. Data Protection Commitment</span>
                <span>{openSection === 'commitment' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'commitment' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    B4U Esports is committed to protecting your personal data and respecting your privacy rights. This Data Protection Policy explains how we collect, process, store, and protect your personal information in compliance with applicable data protection laws.
                  </p>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('legal-basis')}
              >
                <span>2. Legal Basis for Processing</span>
                <span>{openSection === 'legal-basis' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'legal-basis' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">We process your personal data based on the following legal grounds:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Consent:</strong> When you explicitly agree to data processing (Pi Network integration)</li>
                    <li><strong>Contract Performance:</strong> To fulfill purchase agreements and deliver services</li>
                    <li><strong>Legitimate Interest:</strong> For fraud prevention and service improvement</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('data-categories')}
              >
                <span>3. Data Categories and Purposes</span>
                <span>{openSection === 'data-categories' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'data-categories' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Identity Data</h3>
                    <p className="text-gray-700 mb-2"><strong>Data:</strong> Pi Network username, email address, contact number</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> Account creation, communication, customer support</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 Financial Data</h3>
                    <p className="text-gray-700 mb-2"><strong>Data:</strong> Pi wallet address, transaction amounts, payment history</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> Payment processing, transaction records, fraud prevention</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3.3 Gaming Data</h3>
                    <p className="text-gray-700 mb-2"><strong>Data:</strong> PUBG IGN/UID, Mobile Legends User ID/Zone ID</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> In-game currency delivery, service fulfillment</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3.4 Technical Data</h3>
                    <p className="text-gray-700 mb-2"><strong>Data:</strong> IP address, browser type, device information, usage patterns</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> Service optimization, security, analytics</p>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('storage-security')}
              >
                <span>4. Data Storage and Security</span>
                <span>{openSection === 'storage-security' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'storage-security' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Storage Locations</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Primary data stored on secure cloud infrastructure</li>
                    <li>Backup data maintained in geographically separate locations</li>
                    <li>Data centers located in jurisdictions with strong data protection laws</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Security Measures</h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>End-to-end encryption for data transmission</li>
                    <li>Advanced encryption standards (AES-256) for data at rest</li>
                    <li>Multi-factor authentication for system access</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authorization protocols</li>
                    <li>Secure coding practices and penetration testing</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('retention')}
              >
                <span>5. Data Retention</span>
                <span>{openSection === 'retention' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'retention' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">We retain your personal data only as long as necessary for the purposes outlined in this policy:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Account Data:</strong> Until account deletion or 3 years of inactivity</li>
                    <li><strong>Transaction Records:</strong> 7 years for legal and audit purposes</li>
                    <li><strong>Support Communications:</strong> 2 years after issue resolution</li>
                    <li><strong>Marketing Consent:</strong> Until consent is withdrawn</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('rights')}
              >
                <span>6. Your Data Protection Rights</span>
                <span>{openSection === 'rights' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'rights' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">Under applicable data protection laws, you have the following rights:</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Right of Access</h4>
                      <p className="text-blue-800 text-sm">Request copies of your personal data</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Right to Rectification</h4>
                      <p className="text-green-800 text-sm">Correct inaccurate or incomplete data</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Right to Erasure</h4>
                      <p className="text-yellow-800 text-sm">Request deletion of your personal data</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Right to Data Portability</h4>
                      <p className="text-purple-800 text-sm">Transfer your data to another service</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('sharing')}
              >
                <span>7. Data Sharing and Transfers</span>
                <span>{openSection === 'sharing' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'sharing' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Third-Party Sharing</h3>
                  <p className="text-gray-700 mb-4">We may share your data with:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li><strong>Pi Network:</strong> For authentication and payment processing</li>
                    <li><strong>Game Publishers:</strong> Only gaming IDs for currency delivery</li>
                    <li><strong>Service Providers:</strong> Hosting, analytics, and support services</li>
                    <li><strong>Legal Authorities:</strong> When required by law</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 International Transfers</h3>
                  <p className="text-gray-700 mb-4">
                    When data is transferred internationally, we ensure adequate protection through:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Standard contractual clauses approved by data protection authorities</li>
                    <li>Adequacy decisions for transfers to approved countries</li>
                    <li>Binding corporate rules for intra-group transfers</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('exercising-rights')}
              >
                <span>8. Exercising Your Rights</span>
                <span>{openSection === 'exercising-rights' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'exercising-rights' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">To exercise your data protection rights, contact us:</p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 mb-2"><strong>Data Protection Officer:</strong> <a href="mailto:privacy@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">privacy@b4uesports.com</a></p>
                    <p className="text-gray-700 mb-2"><strong>General Contact:</strong> <a href="mailto:info@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">info@b4uesports.com</a></p>
                    <p className="text-gray-700 mb-2"><strong>Phone:</strong> <a href="tel:+97517875099" className="text-blue-600 hover:text-blue-800 underline">+97517875099</a></p>
                    <p className="text-gray-700"><strong>Response Time:</strong> 30 days maximum</p>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('breach-notification')}
              >
                <span>9. Data Breach Notification</span>
                <span>{openSection === 'breach-notification' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'breach-notification' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    In the event of a data breach that poses high risk to your rights and freedoms, we will:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Notify relevant supervisory authorities within 72 hours</li>
                    <li>Inform affected users without undue delay</li>
                    <li>Provide clear information about the breach and our response</li>
                    <li>Offer guidance on protective measures you can take</li>
                  </ul>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h2 
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center justify-between"
                onClick={() => toggleSection('complaints')}
              >
                <span>10. Complaints and Supervisory Authority</span>
                <span>{openSection === 'complaints' ? '▲' : '▼'}</span>
              </h2>
              {openSection === 'complaints' && (
                <div className="pl-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-4">
                    You have the right to lodge a complaint with your local data protection supervisory authority if you believe we have not adequately addressed your data protection concerns.
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
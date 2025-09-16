export default function UserAgreementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">User Agreement</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement Overview</h2>
              <p className="text-gray-700 mb-4">
                This User Agreement ("Agreement") governs your use of the B4U Esports gaming marketplace platform. By creating an account or using our services, you agree to be bound by this Agreement and our Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Pi Network Integration Consent</h2>
              <p className="text-gray-700 mb-4">
                By using B4U Esports, you explicitly consent to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Connecting your Pi Network account for authentication and payments</li>
                <li>Sharing your Pi Network username and wallet address with B4U Esports</li>
                <li>Processing cryptocurrency transactions through Pi Network</li>
                <li>Storing your Pi Network data for account management and transaction history</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Gaming Account Requirements</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Account Verification</h3>
              <p className="text-gray-700 mb-4">
                You agree to provide accurate gaming account information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>PUBG Mobile:</strong> Valid In-Game Name (IGN) and numeric User ID (UID)</li>
                <li><strong>Mobile Legends:</strong> Valid numeric User ID and Zone ID</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Account Ownership</h3>
              <p className="text-gray-700 mb-4">
                You warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>You own or have authorized access to the gaming accounts you specify</li>
                <li>The gaming accounts are in good standing with their respective game publishers</li>
                <li>You will not provide gaming account information belonging to others without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Purchase Agreement</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Final Sale Acknowledgment</h3>
              <p className="text-gray-700 mb-4">
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>All digital currency purchases are final and non-refundable</li>
                <li>You cannot return, exchange, or cancel completed transactions</li>
                <li>In-game currencies have no real-world monetary value</li>
                <li>You are purchasing virtual items for entertainment purposes only</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Price Agreement</h3>
              <p className="text-gray-700 mb-4">
                You agree that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Prices are displayed in both USDT and Pi cryptocurrency</li>
                <li>Pi amounts are calculated using real-time exchange rates</li>
                <li>Price fluctuations may occur between viewing and purchase completion</li>
                <li>The final Pi amount at transaction completion is binding</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Usage and Privacy Consent</h2>
              <p className="text-gray-700 mb-4">
                You consent to our collection, use, and storage of:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Pi Network authentication data</li>
                <li>Personal information provided during registration</li>
                <li>Gaming account information and transaction history</li>
                <li>Payment and cryptocurrency transaction data</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This data will be used in accordance with our Privacy Policy and applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Testnet Operations Agreement</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-blue-800">
                  <strong>Current Status:</strong> B4U Esports operates on Pi Network's testnet for secure testing and development.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                You understand and agree that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>No real Pi coins from your mainnet wallet will be deducted</li>
                <li>All transactions are simulated for testing purposes</li>
                <li>Testnet transactions have no real monetary value</li>
                <li>The platform may transition to mainnet in the future with proper notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Conduct Agreement</h2>
              <p className="text-gray-700 mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Use the platform only for legitimate gaming currency purchases</li>
                <li>Provide accurate and truthful information</li>
                <li>Respect intellectual property rights</li>
                <li>Not engage in fraudulent or deceptive practices</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to manipulate or exploit the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Risk Acknowledgment</h2>
              <p className="text-gray-700 mb-4">
                You acknowledge and accept the following risks:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Cryptocurrency value fluctuations may affect pricing</li>
                <li>Technical issues may cause delivery delays</li>
                <li>Game publishers may change their terms or suspend services</li>
                <li>Pi Network blockchain operations are beyond our control</li>
                <li>Your gaming accounts may be subject to game publisher policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Support and Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                For support or to report issues:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:info@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">info@b4uesports.com</a></p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> <a href="tel:+97517875099" className="text-blue-600 hover:text-blue-800 underline">+97517875099</a></p>
                <p className="text-gray-700"><strong>Response Time:</strong> 24-48 hours</p>
              </div>
              <p className="text-gray-700 mb-4">
                You agree to attempt resolution through our support channels before pursuing other remedies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Agreement Updates</h2>
              <p className="text-gray-700 mb-4">
                This Agreement may be updated periodically. Material changes will be communicated through:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our platform</li>
                <li>Updated "Last Updated" date on this page</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Continued use of the platform after updates constitutes acceptance of the modified Agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Acceptance and Electronic Signature</h2>
              <p className="text-gray-700 mb-4">
                By clicking "Accept" during account creation or making any purchase, you provide your electronic signature and agree to be bound by this User Agreement. This electronic acceptance has the same legal effect as a written signature.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
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
export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Return/Refund Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800 mb-2">Important Notice</h3>
                  <p className="text-red-700">
                    <strong>All sales of digital in-game currency are final and non-refundable.</strong>
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. No Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                B4U Esports operates a strict no-refund policy for all digital in-game currency purchases, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>PUBG Mobile UC (Unknown Cash)</li>
                <li>Mobile Legends: Bang Bang Diamonds</li>
                <li>Any other in-game currencies or digital items</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Once a transaction is completed and the digital currency is delivered to your gaming account, the sale is final and cannot be reversed, refunded, or exchanged.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Reasons for No Refund Policy</h2>
              <p className="text-gray-700 mb-4">
                This policy exists because:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Digital currencies are instantly delivered to your gaming account</li>
                <li>In-game currencies cannot be retrieved once delivered</li>
                <li>Digital products have no physical return mechanism</li>
                <li>Game publishers do not support currency reversals</li>
                <li>Blockchain transactions (Pi Network) are irreversible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pre-Purchase Verification</h2>
              <p className="text-gray-700 mb-4">
                Before completing any purchase, please ensure:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Correct Game IDs:</strong> Verify your PUBG UID, Mobile Legends User ID and Zone ID</li>
                <li><strong>Package Selection:</strong> Choose the correct currency amount and game</li>
                <li><strong>Payment Amount:</strong> Confirm the Pi amount and USD equivalent</li>
                <li><strong>Account Access:</strong> Ensure you have access to the target gaming account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Delivery Issues</h2>
              <p className="text-gray-700 mb-4">
                If you experience delivery issues, we will investigate and attempt to resolve them within 24-48 hours. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Currency not received in your gaming account</li>
                <li>Incorrect delivery amount</li>
                <li>Technical errors during delivery process</li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Note:</strong> Resolution efforts do not constitute a refund guarantee. We will work to deliver the purchased currency, not provide monetary refunds.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Exceptional Circumstances</h2>
              <p className="text-gray-700 mb-4">
                Refunds may be considered only in the following exceptional circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Proven system error resulting in duplicate charges</li>
                <li>Unauthorized transactions (with proper evidence)</li>
                <li>Technical failure preventing delivery for more than 7 days</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Even in these cases, refunds are at our sole discretion and must be requested within 7 days of the original transaction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Pi Network Testnet</h2>
              <p className="text-gray-700 mb-4">
                Our platform currently operates on Pi Network's testnet for secure testing. No real Pi coins from your mainnet wallet are deducted during transactions. All payments are simulated for development purposes.
              </p>
              <p className="text-gray-700 mb-4">
                When we transition to Pi Network mainnet, this refund policy will remain in effect for all real cryptocurrency transactions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. How to Report Issues</h2>
              <p className="text-gray-700 mb-4">
                If you experience any delivery issues or have concerns about a transaction, please contact our support team immediately:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> info@b4uesports.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +97517875099</p>
                <p className="text-gray-700"><strong>Subject Line:</strong> "Transaction Issue - [Your Transaction ID]"</p>
              </div>
              <p className="text-gray-700 mb-4">
                Please include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Transaction ID</li>
                <li>Pi payment ID</li>
                <li>Game account details</li>
                <li>Description of the issue</li>
                <li>Screenshots if applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Consumer Rights</h2>
              <p className="text-gray-700 mb-4">
                This policy does not affect your statutory consumer rights under applicable law. Some jurisdictions may provide additional consumer protections that supersede this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to update this refund policy at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after policy changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Acknowledgment</h2>
              <p className="text-gray-700 mb-4">
                By making a purchase on B4U Esports, you acknowledge that you have read, understood, and agree to this Return/Refund Policy. You confirm that all sales are final and non-refundable.
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
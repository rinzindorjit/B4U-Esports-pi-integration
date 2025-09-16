export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">
                B4U Esports uses cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Maintaining your login session with Pi Network</li>
                <li>Remembering your preferences and settings</li>
                <li>Analyzing website performance and user behavior</li>
                <li>Providing personalized content and recommendations</li>
                <li>Ensuring website security and preventing fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Essential Cookies</h3>
                  <p className="text-blue-800 mb-2">These cookies are necessary for the website to function properly.</p>
                  <ul className="text-sm text-blue-700 list-disc pl-4">
                    <li>Authentication tokens for Pi Network integration</li>
                    <li>Session management and security</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Functional Cookies</h3>
                  <p className="text-green-800 mb-2">These cookies enhance your experience by remembering your choices.</p>
                  <ul className="text-sm text-green-700 list-disc pl-4">
                    <li>Language preferences</li>
                    <li>User interface settings</li>
                    <li>Gaming profile information</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Analytics Cookies</h3>
                  <p className="text-yellow-800 mb-2">These cookies help us understand how visitors interact with our website.</p>
                  <ul className="text-sm text-yellow-700 list-disc pl-4">
                    <li>Page views and user journey tracking</li>
                    <li>Performance metrics and error reporting</li>
                    <li>Feature usage and adoption rates</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Marketing Cookies</h3>
                  <p className="text-purple-800 mb-2">These cookies may be used to show relevant advertisements.</p>
                  <ul className="text-sm text-purple-700 list-disc pl-4">
                    <li>User behavior for personalized offers</li>
                    <li>Referral tracking and attribution</li>
                    <li>Campaign effectiveness measurement</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                Our website may also use third-party cookies from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Pi Network:</strong> For authentication and payment processing</li>
                <li><strong>Analytics Services:</strong> To understand website usage and performance</li>
                <li><strong>Content Delivery Networks:</strong> To optimize loading speeds</li>
                <li><strong>Security Services:</strong> To protect against malicious activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Receive notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Browser-Specific Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Chrome</h4>
                  <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Firefox</h4>
                  <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Safari</h4>
                  <p className="text-sm text-gray-600">Preferences → Privacy → Cookies</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Edge</h4>
                  <p className="text-sm text-gray-600">Settings → Site Permissions → Cookies</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                <h3 className="text-orange-800 font-medium mb-2">Warning</h3>
                <p className="text-orange-700">
                  Disabling cookies may impact your experience on B4U Esports and may prevent certain features from working properly.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                If you disable cookies, you may experience:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Difficulty maintaining your Pi Network login session</li>
                <li>Loss of personalized settings and preferences</li>
                <li>Reduced website functionality and performance</li>
                <li>Inability to complete transactions</li>
                <li>Repeated requests for the same information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Pi Network Specific Cookies</h2>
              <p className="text-gray-700 mb-4">
                For Pi Network integration, we use specific cookies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Store your Pi Network access token securely</li>
                <li>Maintain your authentication state</li>
                <li>Remember your Pi wallet connection preferences</li>
                <li>Cache Pi Network user data for better performance</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These cookies are essential for the Pi Network payment and authentication features to work properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookie Retention</h2>
              <p className="text-gray-700 mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Authentication Cookies:</strong> Expire based on Pi Network session policies</li>
                <li><strong>Preference Cookies:</strong> Remain until manually deleted or expired</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Updates to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of any significant changes by:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Updating the "Last Updated" date on this page</li>
                <li>Displaying a prominent notice on our website</li>
                <li>Sending email notifications for material changes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:privacy@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">privacy@b4uesports.com</a></p>
                <p className="text-gray-700 mb-2"><strong>General Contact:</strong> <a href="mailto:info@b4uesports.com" className="text-blue-600 hover:text-blue-800 underline">info@b4uesports.com</a></p>
                <p className="text-gray-700"><strong>Phone:</strong> <a href="tel:+97517875099" className="text-blue-600 hover:text-blue-800 underline">+97517875099</a></p>
              </div>
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
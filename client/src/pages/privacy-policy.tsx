import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Back to home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-2 text-slate-900">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-700">
                We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="text-slate-700 mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information</li>
                <li><strong>Device Information:</strong> Browser type, IP address, and operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and links clicked</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Use of Your Information</h2>
              <p className="text-slate-700 mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>Process your transactions and send related information</li>
                <li>Email regarding your account or order</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
                <li>Generate a personal profile about you so that future visits to the Site will be personalized</li>
                <li>Increase the efficiency and operation of the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Disclosure of Your Information</h2>
              <p className="text-slate-700 mb-4">We may share or disclose your information in the following situations:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>By law or to protect our rights</li>
                <li>With our service providers who assist us in operating our website</li>
                <li>In connection with a merger, acquisition, or bankruptcy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Security of Your Information</h2>
              <p className="text-slate-700">
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Contact Us</h2>
              <p className="text-slate-700">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-700 mt-4">
                Email: management@excelessel.com<br/>
                Address: 12 Marina Boulevard, Marina Bay Financial Centre, Singapore 018982
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

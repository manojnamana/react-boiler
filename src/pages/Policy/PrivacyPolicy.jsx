import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-4">
          At AYS, your privacy is a top priority. This Privacy Policy outlines
          how we collect, use, and safeguard your information when you use our
          services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We may collect personal information from you, including:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Your name, email address, and contact details</li>
          <li>Login credentials (username and password)</li>
          <li>Usage data and cookies for improving user experience</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Provide and maintain our services</li>
          <li>Respond to customer service requests</li>
          <li>Send updates, newsletters, or promotional content</li>
          <li>Improve our website and services through analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Sharing of Information</h2>
        <p className="text-gray-600 mb-4">
          We do not sell or rent your personal information to third parties.
          However, we may share your information with:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Service providers who assist us in delivering our services</li>
          <li>Authorities if required by law or to protect our rights</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement industry-standard measures to protect your data from
          unauthorized access, alteration, or disclosure. However, no method of
          transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Access the personal data we hold about you</li>
          <li>Request corrections to inaccurate or incomplete data</li>
          <li>Request the deletion of your personal data</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and significant updates may be communicated
          via email or notifications.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
          <a href="mailto:privacy@ays.com" className="text-blue-500 underline ml-1">
            privacy@ays.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

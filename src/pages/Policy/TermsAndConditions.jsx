import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to AYS! These terms and conditions outline the rules and regulations for the use of our website and services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use AYS if you do not agree to all the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. License to Use</h2>
        <p className="text-gray-600 mb-4">
          Unless otherwise stated, AYS and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages for your personal use, subject to restrictions set in these terms.
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>You must not republish material from our website.</li>
          <li>You must not sell, rent, or sub-license material from our website.</li>
          <li>You must not reproduce, duplicate, or copy material from our website.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. User Content</h2>
        <p className="text-gray-600 mb-4">
          Certain areas of this website may allow users to post and exchange opinions, information, and other content. AYS does not filter, edit, or review comments prior to their presence on the website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          AYS will not be held responsible for any damages arising from the use of this website or any content provided. This includes, without limitation, direct, indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          AYS reserves the right to revise these terms at any time. By using this website, you are expected to review these terms regularly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Governing Law</h2>
        <p className="text-gray-600 mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction. Any disputes will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
        </p>

        <p className="text-gray-600 mt-6">
          If you have any questions or concerns about these terms, please contact us at <a href="mailto:support@ays.com" className="text-blue-500 underline">support@ays.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

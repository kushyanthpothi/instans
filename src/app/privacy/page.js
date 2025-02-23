'use client';
import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2024
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                At Instans, we take your privacy seriously and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform and services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
                Information Collection and Use
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We collect various types of information to provide and improve our services. This includes personal information such as your name, email address, and professional background. When you use our interview preparation platform, we also collect data about your interview sessions, including recordings and transcripts. This information helps us provide personalized feedback and improve your interview experience.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
                Data Processing and Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your data is processed using secure, industry-standard protocols. We implement robust security measures, including encryption and access controls, to protect your information from unauthorized access, disclosure, or modification. Our team regularly reviews and updates these security measures to ensure the highest level of data protection.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
                Your Privacy Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You maintain control over your personal information. You have the right to access, correct, or delete your data at any time. You can also request a copy of your data or object to its processing. We respect your choices regarding data privacy and will respond to your requests promptly.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
                Data Retention and Deletion
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We retain your information only for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you request account deletion, we will remove your personal information from our systems within a reasonable timeframe, except where we are legally required to maintain certain records.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
                Updates to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We may update this Privacy Policy periodically to reflect changes in our practices or for legal requirements. We will notify you of any material changes and obtain your consent where required by law.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              For any privacy-related questions, please contact us at{' '}
              <a
                href="mailto:privacy@instans.com"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                privacy@instans.com
              </a>
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
}

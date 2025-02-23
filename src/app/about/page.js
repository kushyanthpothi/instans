'use client';
import Layout from '../components/Layout';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Layout>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 pt-32 pb-20">
          {/* Abstract Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-orange-100/30 dark:from-orange-500/10" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Empowering Your
                <br className="hidden sm:block" />
                <span className="text-orange-500 mt-1 inline-block">Interview Success</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Transforming interview preparation through AI innovation and personalized coaching
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Our Story Section */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-gray-600 dark:text-gray-300">
                    Founded in 2025, Instans emerged from a simple observation: traditional interview preparation methods weren't keeping pace with modern hiring practices. Our team of AI experts and industry veterans came together to create a solution that combines cutting-edge technology with practical interview experience.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    Today, we're proud to help thousands of candidates ace their interviews through real-time AI feedback, personalized coaching, and innovative screen sharing capabilities.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 p-1">
                  <img
                    src="https://i.ibb.co/jx2r8QX/Team-Discussion.jpg"
                    alt="Team collaboration"
                    className="rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation First',
                  description: 'We constantly push the boundaries of AI technology to provide cutting-edge interview preparation solutions.',
                  icon: <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                },
                {
                  title: 'User Success',
                  description: 'Your success is our success. We\'re committed to providing the tools and support you need to excel.',
                  icon: <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                },
                {
                  title: 'Continuous Learning',
                  description: 'We believe in the power of continuous improvement and adapt our platform based on user feedback.',
                  icon: <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="mb-5">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div className="relative bg-orange-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Helping candidates succeed worldwide</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50K+', label: 'Active Users' },
                { number: '100K+', label: 'Interview Sessions' },
                { number: '95%', label: 'Success Rate' },
                { number: '24/7', label: 'AI Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

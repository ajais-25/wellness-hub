import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Welcome to Your Wellness Journey
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 leading-relaxed">
          Create, share, and discover mindfulness sessions that promote mental
          health and well-being. Build a community of wellness through guided
          experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg sm:max-w-none mx-auto">
          <Link
            to="/dashboard"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Explore Dashboard</span>
          </Link>
          <Link
            to="/session-editor"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Create Session</span>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <Link to="/dashboard" className="group">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 group-hover:transform group-hover:-translate-y-1 h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-200 transition duration-300">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Dashboard
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              View published wellness sessions from the community. Discover new
              mindfulness practices and guided experiences.
            </p>
            <div className="text-purple-600 font-semibold group-hover:text-purple-700 text-sm sm:text-base">
              Explore Sessions →
            </div>
          </div>
        </Link>

        <Link to="/my-sessions" className="group">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 group-hover:transform group-hover:-translate-y-1 h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-emerald-200 transition duration-300">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              My Sessions
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              View and edit your personal wellness sessions. Manage your drafts
              and published content in one place.
            </p>
            <div className="text-emerald-600 font-semibold group-hover:text-emerald-700 text-sm sm:text-base">
              Manage Sessions →
            </div>
          </div>
        </Link>

        <Link
          to="/session-editor"
          className="group sm:col-span-2 lg:col-span-1"
        >
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 group-hover:transform group-hover:-translate-y-1 h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-200 transition duration-300">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Session Editor
            </h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Create and edit wellness sessions with our intuitive form.
              Auto-save keeps your work safe as you create.
            </p>
            <div className="text-blue-600 font-semibold group-hover:text-blue-700 text-sm sm:text-base">
              Start Creating →
            </div>
          </div>
        </Link>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 lg:p-12 text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Why Choose WellnessHub?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
              Auto-Save
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Never lose your work with our automatic saving feature
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
              Community
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Share and discover sessions from wellness enthusiasts
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
              Easy Tagging
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Organize and discover content with smart tagging
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
              Fast & Intuitive
            </h4>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Clean, responsive interface that works on any device
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

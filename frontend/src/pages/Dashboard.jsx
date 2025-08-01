import { useState, useEffect } from "react";
import api from "../api";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Fetch published sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await api.get("/sessions");
        if (response.data.success) {
          setSessions(response.data.data);
        } else {
          setError("Failed to fetch sessions");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Get unique tags from all sessions
  const allTags = [
    ...new Set(sessions.flatMap((session) => session.tags || [])),
  ];

  // Filter sessions based on search term and selected tag
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesTag = !selectedTag || session.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Published Wellness Sessions
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore wellness sessions shared by our community
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Sessions
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
            />
          </div>
          <div className="sm:w-48 lg:w-64">
            <label
              htmlFor="tag-filter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by Tag
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sessions Grid */}
      {!loading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredSessions.length} of {sessions.length} sessions
          </div>

          {filteredSessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No sessions found
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedTag
                  ? "Try adjusting your search criteria"
                  : "No published sessions available yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredSessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">
                        {session.title}
                      </h3>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">
                        Created: {formatDate(session.createdAt)}
                      </p>
                    </div>

                    {session.tags && session.tags.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {session.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

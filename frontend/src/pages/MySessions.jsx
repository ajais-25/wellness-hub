import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const MySessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchMySessions();
  }, []);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(
        sessions.filter((session) => session.status === filterStatus)
      );
    }
  }, [sessions, filterStatus]);

  const fetchMySessions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/my-sessions");
      if (response.data.success) {
        setSessions(response.data.data);
        setError(""); // Clear any previous errors
      } else {
        setError("Failed to fetch sessions");
      }
    } catch (err) {
      setError(
        "Error fetching sessions: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (session) => {
    navigate(`/session-editor/${session._id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "published") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (status === "draft") {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
        <p className="text-gray-600">
          Manage your draft and published wellness sessions
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              filterStatus === "all"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Sessions ({sessions.length})
          </button>
          <button
            onClick={() => setFilterStatus("published")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              filterStatus === "published"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Published ({sessions.filter((s) => s.status === "published").length}
            )
          </button>
          <button
            onClick={() => setFilterStatus("draft")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
              filterStatus === "draft"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Drafts ({sessions.filter((s) => s.status === "draft").length})
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMessage}
          <button
            onClick={() => setSuccessMessage("")}
            className="float-right text-green-700 hover:text-green-900"
          >
            ×
          </button>
        </div>
      )}

      {filteredSessions.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filterStatus === "all"
              ? "No sessions yet"
              : `No ${filterStatus} sessions`}
          </h3>
          <p className="text-gray-500">
            {filterStatus === "all"
              ? "Create your first wellness session to get started."
              : `You don't have any ${filterStatus} sessions yet.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <div
              key={session._id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {session.title}
                  </h3>
                  <span className={getStatusBadge(session.status)}>
                    {session.status}
                  </span>
                </div>

                {session.tags && session.tags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {session.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 mb-4">
                  <p>Created: {formatDate(session.createdAt)}</p>
                  <p>Updated: {formatDate(session.updatedAt)}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      window.open(`${session.json_file_url}`, "_blank")
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(session)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;

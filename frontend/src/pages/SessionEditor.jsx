import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const SessionEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get session ID from URL params if editing
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    json_file_url: "",
    tagInput: "",
    status: "draft", // Default to draft status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchSession();
    } else {
      // Reset form when switching to create mode
      setFormData({
        title: "",
        tags: [],
        json_file_url: "",
        tagInput: "",
        status: "draft",
      });
      setError("");
      setSuccessMessage("");
    }
  }, [id, isEditing]);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/my-sessions/${id}`);
      if (response.data.success) {
        const session = response.data.data;
        setFormData({
          title: session.title,
          tags: session.tags || [],
          json_file_url: session.json_file_url,
          tagInput: (session.tags || []).join(", "),
          status: session.status || "draft",
        });
      } else {
        setError("Failed to fetch session details");
      }
    } catch (err) {
      setError(
        "Error fetching session: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagChange = (tagString) => {
    // Store the raw string and only process it for display/saving
    const tagsArray = tagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags: tagsArray, tagInput: tagString }));
  };

  const handleSave = async (isDraft = false) => {
    if (!formData.title.trim() || !formData.json_file_url.trim()) {
      setError("Title and JSON file URL are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const endpoint = isDraft
        ? "/my-sessions/save-draft"
        : "/my-sessions/publish";

      isDraft ? (formData.status = "draft") : (formData.status = "published");

      const payload = {
        title: formData.title.trim(),
        tags: formData.tags,
        json_file_url: formData.json_file_url.trim(),
        sessionId: isEditing ? id : undefined,
      };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        setSuccessMessage(
          `Session ${isDraft ? "saved as draft" : "published"} successfully!`
        );
        setTimeout(() => {
          navigate("/my-sessions");
        }, 1500);
      } else {
        setError("Failed to save session");
      }
    } catch (err) {
      setError(
        "Error saving session: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/my-sessions");
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEditing ? "Edit Session" : "Create New Session"}
        </h1>
        <p className="text-gray-600">
          {isEditing
            ? "Update your wellness session details"
            : "Create a new wellness session"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right text-red-700 hover:text-red-900 ml-4"
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Session Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter session title"
              required
            />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status
              </label>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    formData.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      formData.status === "published"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  ></span>
                  {formData.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {formData.status === "published"
                  ? "This session is live and visible to other users"
                  : "This session is saved as a draft and not visible to other users"}
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tagInput}
              onChange={(e) => handleTagChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="meditation, stress-relief, mindfulness (comma-separated)"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate tags with commas. These help users find your session.
            </p>
          </div>

          <div>
            <label
              htmlFor="json_file_url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              JSON File URL *
            </label>
            <input
              type="url"
              id="json_file_url"
              name="json_file_url"
              value={formData.json_file_url}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="https://example.com/session-data.json"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              URL pointing to the JSON file containing your session data.
            </p>
          </div>

          {formData.tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={loading}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white px-6 py-3 rounded-md text-sm font-medium transition duration-200 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-md text-sm font-medium transition duration-200 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Publishing..." : "Publish Session"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-200 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionEditor;

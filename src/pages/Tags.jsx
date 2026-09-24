import { useEffect, useState } from "react";
import {
  Tags as TagsIcon,
  ArrowLeft,
  Hash,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Tags() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("isLoggedIn");

          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate, token]);

  const isTrashed = (note) => {
    return (
      note.trashed === true ||
      note.trashed === "true"
    );
  };

  const activeNotes = notes.filter(
    (note) => !isTrashed(note)
  );

  const uniqueTags = [
    ...new Set(
      activeNotes
        .map((note) => (note.tag || "").trim())
        .filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex items-start gap-3 sm:gap-4 mb-8">

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition flex-shrink-0"
        >
          <ArrowLeft
            size={22}
            className="text-gray-700 dark:text-white"
          />
        </button>

        <div className="flex items-start gap-3">

          <div className="hidden sm:flex p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <TagsIcon
              size={26}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Tags
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Organize your notes by tags
            </p>
          </div>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <Hash
                size={22}
                className="text-indigo-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Tags
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {uniqueTags.length}
              </h2>
            </div>

          </div>

        </div>


        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <FileText
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tagged Notes
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  activeNotes.filter(
                    (note) =>
                      (note.tag || "").trim()
                  ).length
                }
              </h2>
            </div>

          </div>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <p className="text-gray-500 dark:text-gray-400">
          Loading tags...
        </p>
      )}


      {/* EMPTY */}

      {!loading && uniqueTags.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 sm:p-14 text-center border border-gray-200 dark:border-slate-800">

          <TagsIcon
            size={50}
            className="mx-auto mb-4 text-gray-400"
          />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            No Tags Yet
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create a note with a tag to see it here.
          </p>

        </div>
      )}


      {/* TAGS */}

      {!loading && uniqueTags.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {uniqueTags.map((tag) => {

            const tagNotes = activeNotes.filter(
              (note) =>
                (note.tag || "").trim().toLowerCase() ===
                tag.toLowerCase()
            );

            return (
              <div
                key={tag}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-center gap-4">

                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex-shrink-0">
                    <TagsIcon
                      size={23}
                      className="text-indigo-600"
                    />
                  </div>

                  <div className="min-w-0">

                    <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                      {tag}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {tagNotes.length}{" "}
                      {tagNotes.length === 1
                        ? "note"
                        : "notes"}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Tags;
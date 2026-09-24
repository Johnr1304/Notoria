import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  RotateCcw,
  FileX2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Trash() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTrash = async () => {
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

        const trashedNotes = (
          res.data.notes || []
        ).filter(
          (note) =>
            note.trashed === true ||
            note.trashed === "true"
        );

        setNotes(trashedNotes);
      } catch (error) {
        console.error(
          "Error fetching trash:",
          error
        );

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

    fetchTrash();
  }, [navigate, token]);

  const restoreNote = async (id) => {
    try {
      await api.put(
        `/notes/${id}`,
        { trashed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.error("Restore Error:", error);
    }
  };

  const deleteForever = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (error) {
      console.error(
        "Permanent Delete Error:",
        error
      );
    }
  };

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

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Trash
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Notes you have moved to trash
          </p>
        </div>

      </div>


      {/* SUMMARY */}

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800 mb-8">

        <div className="flex items-center gap-4">

          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <FileX2
              size={24}
              className="text-red-600"
            />
          </div>

          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Notes in Trash
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {notes.length}
            </h2>

          </div>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <p className="text-gray-500 dark:text-gray-400">
          Loading trash...
        </p>
      )}


      {/* EMPTY */}

      {!loading && notes.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 sm:p-14 text-center border border-gray-200 dark:border-slate-800">

          <Trash2
            size={55}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-2xl sm:text-3xl font-bold mt-5 text-gray-800 dark:text-white">
            Trash is Empty
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Notes you move to trash will appear here.
          </p>

        </div>
      )}


      {/* TRASHED NOTES */}

      {!loading && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {notes.map((note) => (

            <div
              key={note._id}
              className="rounded-2xl shadow-sm p-5 sm:p-6 border border-black/10"
              style={{
                backgroundColor:
                  note.color || "#E5E7EB",
              }}
            >

              <div className="flex items-start justify-between gap-3">

                <h2 className="text-xl font-bold text-gray-900 break-words">
                  {note.title}
                </h2>

                <Trash2
                  size={20}
                  className="text-gray-700 flex-shrink-0"
                />

              </div>

              <p className="text-gray-700 mt-4 whitespace-pre-wrap break-words">
                {note.content}
              </p>

              {note.tag && (
                <span className="inline-block mt-4 px-3 py-1 bg-white/60 rounded-full text-sm text-gray-700">
                  {note.tag}
                </span>
              )}

              {note.createdAt && (
                <p className="text-xs text-gray-600 mt-4">
                  Added{" "}
                  {new Date(
                    note.createdAt
                  ).toLocaleDateString()}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  type="button"
                  onClick={() =>
                    restoreNote(note._id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  <RotateCcw size={18} />
                  Restore
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteForever(note._id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  <Trash2 size={18} />
                  Delete Forever
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Trash;
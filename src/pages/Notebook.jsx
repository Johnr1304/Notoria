import { useEffect, useState } from "react";
import {
  Folder,
  ArrowLeft,
  BookOpen,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Notebooks() {
  const navigate = useNavigate();

  const books = [
    "Personal",
    "Work",
    "College",
    "Ideas",
  ];

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

  const getNotebookCount = (book) => {
    const notebookName = book.trim().toLowerCase();

    return notes.filter((note) => {
      const noteTag = (note.tag || "")
        .trim()
        .toLowerCase();

      return (
        noteTag === notebookName &&
        !isTrashed(note)
      );
    }).length;
  };

  const totalNotebookNotes = notes.filter(
    (note) => !isTrashed(note)
  ).length;

  const usedNotebooks = books.filter(
    (book) => getNotebookCount(book) > 0
  ).length;

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
            Notebooks
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Organize your notes into notebooks
          </p>
        </div>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
              <BookOpen
                size={22}
                className="text-indigo-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Notebooks
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {books.length}
              </h2>
            </div>
          </div>
        </div>


        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <FileText
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Notes
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalNotebookNotes}
              </h2>
            </div>
          </div>
        </div>


        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Folder
                size={22}
                className="text-purple-600"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Used Notebooks
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {usedNotebooks}
              </h2>
            </div>
          </div>
        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <p className="text-gray-500 dark:text-gray-400">
          Loading notebooks...
        </p>
      )}


      {/* NOTEBOOKS */}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {books.map((book) => {

            const count = getNotebookCount(book);

            return (
              <div
                key={book}
                onClick={() =>
                  navigate(
                    `/notebook/${book.toLowerCase()}`
                  )
                }
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 sm:p-7 border border-gray-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >

                <div className="flex items-center justify-between">

                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl w-fit">
                    <Folder
                      size={34}
                      className="text-indigo-600"
                    />
                  </div>

                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                    {count} {count === 1 ? "note" : "notes"}
                  </span>

                </div>

                <h2 className="text-xl sm:text-2xl font-bold mt-6 text-gray-900 dark:text-white">
                  {book}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {count === 0
                    ? "No notes yet"
                    : `${count} ${
                        count === 1 ? "note" : "notes"
                      } in this notebook`}
                </p>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Notebooks;
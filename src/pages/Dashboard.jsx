import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Plus } from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import Footer from "../components/Footer";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const handleAddNote = async (noteData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/notes", noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => [res.data.note, ...prev]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Update note
  const handleUpdateNote = async (noteData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/notes/${editingNote._id}`,
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((note) =>
          note._id === editingNote._id ? res.data.note : note
        )
      );

      setEditingNote(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note - move to trash
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/notes/${id}`,
        {
          trashed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );

      console.log("Note moved to trash:", res.data);
    } catch (error) {
      console.error("Error moving note to trash:", error);
    }
  };

  // Pin / Unpin
  const handlePin = async (note) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/notes/${note._id}`,
        {
          pinned: !note.pinned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((item) =>
          item._id === note._id ? res.data.note : item
        )
      );
    } catch (error) {
      console.error("Error pinning note:", error);
    }
  };

  // Archive / Unarchive
  const handleArchive = async (note) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/notes/${note._id}`,
        {
          archived: !note.archived,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) =>
        prev.map((item) =>
          item._id === note._id ? res.data.note : item
        )
      );
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  // Open edit modal
  const handleEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  // Open new note modal
  const handleNewNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  // Search
  const filteredNotes = notes.filter((note) => {
    if (note.trashed === true) {
      return false;
    }

    const searchText = search.toLowerCase();

    return (
      note.title?.toLowerCase().includes(searchText) ||
      note.content?.toLowerCase().includes(searchText) ||
      note.tag?.toLowerCase().includes(searchText)
    );
  });

  // Statistics
  const totalNotes = notes.filter(
    (note) => note.trashed !== true
  ).length;

  const pinnedNotes = notes.filter(
    (note) =>
      note.pinned === true &&
      note.trashed !== true
  ).length;

  const archivedNotes = notes.filter(
    (note) =>
      note.archived === true &&
      note.trashed !== true
  ).length;

  const activeNotes = notes.filter(
    (note) =>
      note.archived !== true &&
      note.trashed !== true
  ).length;

  // Masonry responsive columns
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-100 dark:bg-slate-900 transition-all duration-300">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onNewNote={handleNewNote}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col dark:bg-slate-900">

        {/* Navbar */}
        <Navbar
          search={search}
          setSearch={setSearch}
        />

        {/* Dashboard content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                All Notes
              </h1>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                Keep your thoughts organized and easy to find.
              </p>
            </div>

            <button
              type="button"
              onClick={handleNewNote}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
            >
              <Plus size={20} />
              <span>New Note</span>
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Notes
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalNotes}
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pinned
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {pinnedNotes}
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Archived
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {archivedNotes}
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {activeNotes}
              </h2>
            </div>

          </div>

          {/* Notes */}
          {filteredNotes.length === 0 ? (

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                No notes found
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Create a new note to get started.
              </p>

              <button
                type="button"
                onClick={handleNewNote}
                className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
              >
                <Plus size={20} />
                Create Note
              </button>
            </div>

          ) : (

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  className="mb-4"
                >
                  <NoteCard
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPin={handlePin}
                    onArchive={handleArchive}
                  />
                </div>
              ))}
            </Masonry>

          )}

        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Note Modal */}
      {showModal && (
        <NoteModal
          note={editingNote}
          onClose={() => {
            setShowModal(false);
            setEditingNote(null);
          }}
          onSave={
            editingNote
              ? handleUpdateNote
              : handleAddNote
          }
        />
      )}

    </div>
  );
}

export default Dashboard;
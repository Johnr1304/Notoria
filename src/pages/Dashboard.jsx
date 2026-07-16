import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get(
        `/notes?userId=${user.id}&archived=false&trashed=false`,
      );

      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const colors = [
    "#C7D2FE", // Indigo
    "#FBCFE8", // Pink
    "#BBF7D0", // Green
    "#FED7AA", // Orange
    "#FDE68A", // Yellow
    "#BFDBFE", // Blue
    "#DDD6FE", // Purple
    "#D1D5DB", // Gray
  ];

  const addNote = async (note) => {
    try {
      await api.post("/notes", {
        ...note,
        userId: user.id,
        trashed: false,
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      await fetchNotes();

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      await api.put(`/notes/${updatedNote.id}`, updatedNote);

      await fetchNotes();

      setEditingNote(null);

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const note = notes.find((n) => n.id === id);

      await api.put(`/notes/${id}`, {
        ...note,
        trashed: true,
      });

      await fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const togglePin = async (note) => {
    try {
      await api.put(`/notes/${note.id}`, {
        ...note,
        pinned: !note.pinned,
      });

      await fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const archiveNote = async (note) => {
    try {
      await api.put(`/notes/${note.id}`, {
        ...note,
        archived: !note.archived,
      });

      await fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const query = search.toLowerCase();

    return (
      (note.title || "").toLowerCase().includes(query) ||
      (note.content || "").toLowerCase().includes(query) ||
      (note.tag || "").toLowerCase().includes(query)
    );
  });

  const totalNotes = notes.length;

  const pinnedNotes = notes.filter((n) => n.pinned).length;

  const archivedNotes = notes.filter((n) => n.archived).length;

  const activeNotes = totalNotes - archivedNotes;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-all duration-300">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onNewNote={() => {
          setEditingNote(null);
          setShowModal(true);
        }}
      />

      <div className="flex-1 flex flex-col dark:bg-slate-900">
        <Navbar search={search} setSearch={setSearch} />

        <main className="p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome Back 👋
              </h1>

              <p className="text-gray-500 dark:text-gray-300 mt-2">
                Organize your ideas smarter with Notoria.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingNote(null);
                setShowModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
            >
              + New Note
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div
              className="
              bg-white
              dark:bg-slate-800
              rounded-2xl
              p-6
              border-l-4
              border-indigo-600
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer"
            >
              <h3 className="text-gray-500 dark:text-gray-300">Total Notes</h3>

              <h1 className="text-5xl font-bold mt-3 text-indigo-600">
                {totalNotes}
              </h1>
            </div>

            <div
              className="
bg-white
dark:bg-slate-800
rounded-2xl
p-6
border-l-4
border-yellow-500
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
cursor-pointer"
            >
              <h3 className="text-gray-500 dark:text-gray-300">Pinned Notes</h3>

              <h1 className="text-5xl font-bold mt-3 text-yellow-500">
                {pinnedNotes}
              </h1>
            </div>

            <div
              className="
bg-white
dark:bg-slate-800
rounded-2xl
p-6
border-l-4
border-gray-500
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
cursor-pointer"
            >
              <h3 className="text-gray-500 dark:text-gray-300">
                Archived Notes
              </h3>

              <h1 className="text-5xl font-bold mt-3 text-gray-600 dark:text-gray-300">
                {archivedNotes}
              </h1>
            </div>

            <div
              className="
bg-white
dark:bg-slate-800
rounded-2xl
p-6
border-l-4
border-green-500
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
cursor-pointer"
            >
              <h3 className="text-gray-500 dark:text-gray-300">Active Notes</h3>

              <h1 className="text-5xl font-bold mt-3 text-green-600">
                {activeNotes}
              </h1>
            </div>
          </div>

          <div className="mt-10">
            {filteredNotes.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-16 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  No Notes Found
                </h2>
              </div>
            ) : (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-6"
                columnClassName="space-y-6"
              >
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                    onPin={togglePin}
                    onArchive={archiveNote}
                    onEdit={() => {
                      setEditingNote(note);
                      setShowModal(true);
                    }}
                  />
                ))}
              </Masonry>
            )}
          </div>
        </main>

        {showModal && (
          <NoteModal
            note={editingNote}
            onClose={() => {
              setShowModal(false);
              setEditingNote(null);
            }}
            onSave={editingNote ? updateNote : addNote}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

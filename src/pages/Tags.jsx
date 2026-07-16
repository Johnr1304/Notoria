import { useEffect, useState } from "react";
import api from "../services/api";

function Tags() {
  const [notes, setNotes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await api.get(
      `/notes?userId=${user.id}&archived=false&trashed=false`
    );

    setNotes(res.data);
  };

  const tags = [...new Set(notes.map((note) => note.tag))];

  const filteredNotes =
    selectedTag === ""
      ? notes
      : notes.filter((note) => note.tag === selectedTag);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Tags
      </h1>

      <div className="flex flex-wrap gap-3 mb-8">

        <button
          onClick={() => setSelectedTag("")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className="bg-white shadow px-4 py-2 rounded-xl hover:bg-indigo-100"
          >
            {tag}
          </button>
        ))}

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredNotes.map((note) => (

          <div
            key={note.id}
            style={{ backgroundColor: note.color }}
            className="rounded-2xl p-5 shadow"
          >

            <h2 className="text-xl font-bold">
              {note.title}
            </h2>

            <p className="mt-3">
              {note.content}
            </p>

            <span className="mt-4 inline-block text-sm bg-white px-3 py-1 rounded-full">
              {note.tag}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Tags;
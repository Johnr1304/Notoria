import { useState } from "react";

function NoteModal({
  onClose,
  onSave,
  note,
}) {

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

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tag, setTag] = useState(note?.tag || "");

  const [selectedColor, setSelectedColor] = useState(
    note?.color || colors[0]
  );

  const handleSubmit = () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      ...note,
      title,
      content,
      tag,
      color: selectedColor,
      pinned: note?.pinned || false,
      archived: note?.archived || false,
      trashed: note?.trashed || false,
      updatedAt: new Date().toLocaleString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-800 rounded-3xl w-[620px] p-8 shadow-2xl">

        <h1 className="text-3xl font-bold mb-6">
          {note ? "Edit Note" : "Create New Note"}
        </h1>

        {/* Title */}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border dark:bg-slate-700 dark:text-white dark:border-slate-600
          rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Tag */}

        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full border dark:bg-slate-700 dark:text-white dark:border-slate-600 rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Content */}

        <textarea
          rows="6"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border dark:bg-slate-700 dark:text-white dark:border-slate-600 rounded-xl p-3 outline-none resize-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Color Picker */}

        <div className="mt-6">

          <p className="font-semibold mb-3">
            Choose Note Color
          </p>

          <div className="flex gap-4">

            {colors.map((color) => (

              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-4 transition ${
                  selectedColor === color
                    ? "border-indigo-600 scale-110"
                    : "border-white"
                }`}
                style={{ backgroundColor: color }}
              />

            ))}

          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-8">

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {note ? "Update Note" : "Save Note"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default NoteModal;
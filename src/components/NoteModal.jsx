import { useEffect, useState } from "react";

function NoteModal({
  onClose,
  onSave,
  note,
}) {
  const colors = [
    "#A5B4FC",
    "#F9A8D4",
    "#86EFAC",
    "#FDBA74",
    "#FACC15",
    "#93C5FD",
    "#C4B5FD",
    "#9CA3AF",
  ];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const [selectedColor, setSelectedColor] = useState(
    colors[0]
  );

  // =========================================
  // LOAD NOTE DATA WHEN EDITING
  // =========================================

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTag(note.tag || "");

      setSelectedColor(
        note.color || colors[0]
      );
    } else {
      // Clear form when creating a new note
      setTitle("");
      setContent("");
      setTag("");
      setSelectedColor(colors[0]);
    }
  }, [note]);

  // =========================================
  // SAVE / UPDATE NOTE
  // =========================================

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      ...note,

      title: title.trim(),
      content: content.trim(),
      tag: tag.trim(),

      color: selectedColor,

      pinned: note?.pinned || false,
      archived: note?.archived || false,
      trashed: note?.trashed || false,

      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-slate-800 rounded-3xl w-[620px] max-w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto p-8 shadow-2xl">

        {/* =========================================
            TITLE
        ========================================== */}

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          {note ? "Edit Note" : "Create New Note"}
        </h1>


        {/* =========================================
            NOTE TITLE
        ========================================== */}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
            rounded-xl
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />


        {/* =========================================
            TAG
        ========================================== */}

        <input
          type="text"
          placeholder="Tag e.g. Personal, Work, College"
          value={tag}
          onChange={(e) =>
            setTag(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
            rounded-xl
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />


        {/* =========================================
            CONTENT
        ========================================== */}

        <textarea
          rows="6"
          placeholder="Write your note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            dark:bg-slate-700
            dark:text-white
            dark:border-slate-600
            rounded-xl
            p-3
            outline-none
            resize-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />


        {/* =========================================
            NOTE COLOR
        ========================================== */}

        <div className="mt-6">

          <p className="font-semibold mb-3 dark:text-white">
            Choose Note Color
          </p>

          <div className="flex gap-4 flex-wrap">

            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setSelectedColor(color)
                }
                className={`
                  w-11
                  h-11
                  rounded-full
                  transition-all
                  duration-200

                  ${
                    selectedColor === color
                      ? "ring-4 ring-indigo-500 ring-offset-2 scale-110"
                      : "hover:scale-110"
                  }
                `}
                style={{
                  backgroundColor: color,
                }}
              >

                {selectedColor === color && (
                  <span className="text-white font-bold text-lg">
                    ✓
                  </span>
                )}

              </button>
            ))}

          </div>


          {/* SELECTED COLOR */}

          <div className="flex items-center gap-3 mt-5">

            <span className="text-sm text-gray-600 dark:text-gray-300">
              Selected color:
            </span>

            <div
              className="
                w-7
                h-7
                rounded-full
                border
                border-gray-300
              "
              style={{
                backgroundColor: selectedColor,
              }}
            />

          </div>

        </div>


        {/* =========================================
            BUTTONS
        ========================================== */}

        <div className="flex justify-end gap-4 mt-8">

          {/* CANCEL */}

          <button
            type="button"
            onClick={onClose}
            className="
              px-6
              py-3
              rounded-xl
              bg-gray-300
              hover:bg-gray-400
              transition
            "
          >
            Cancel
          </button>


          {/* SAVE / UPDATE */}

          <button
            type="button"
            onClick={handleSubmit}
            className="
              px-6
              py-3
              rounded-xl
              bg-indigo-600
              text-white
              hover:bg-indigo-700
              transition
            "
          >
            {note ? "Update Note" : "Save Note"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default NoteModal;
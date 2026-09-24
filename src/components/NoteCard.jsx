import {
  Pin,
  Pencil,
  Trash2,
  CalendarDays,
  Tag,
  Archive,
} from "lucide-react";

function NoteCard({
  note,
  onDelete,
  onEdit,
  onPin,
  onArchive,
}) {
  return (
    <div
      style={{ backgroundColor: note.color }}
      className="
        rounded-2xl
        p-6
        border
        border-gray-200
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        flex
        flex-col
        h-fit
      "
    >

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {note.title}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Tag size={15} />

            <span className="text-sm">
              {note.tag}
            </span>
          </div>
        </div>


        {/* Pin */}

        <button
          type="button"
          onClick={() => onPin(note)}
          className="
            p-2
            rounded-lg
            hover:bg-white/60
            transition
          "
          title={note.pinned ? "Unpin" : "Pin"}
        >
          <Pin
            size={18}
            className={
              note.pinned
                ? "text-indigo-600 fill-indigo-600"
                : "text-black"
            }
          />
        </button>

      </div>


      {/* Content */}

      <div className="mt-5">

        <p
          className="
            mt-4
            text-gray-700
            leading-7
            whitespace-pre-wrap
            break-words
          "
        >
          {note.content}
        </p>

      </div>


      {/* Footer */}

      <div
        className="
          mt-5
          pt-4
          border-t
          border-gray-200
          flex
          justify-between
          items-center
          gap-3
        "
      >

        {/* Date */}

        <div
          className="
            flex
            items-center
            gap-2
            text-gray-600
            min-w-0
          "
        >
          <CalendarDays
            size={16}
            className="flex-shrink-0"
          />

          <span className="text-sm">
            {note.createdAt
              ? new Date(note.createdAt).toLocaleString()
              : "No date"}
          </span>
        </div>


        {/* Actions */}

        <div className="flex gap-2 flex-shrink-0">

          {/* Archive */}

          <button
            type="button"
            onClick={() => onArchive(note)}
            className="
              bg-white
              p-2
              rounded-lg
              hover:bg-yellow-100
              transition
            "
            title={
              note.archived
                ? "Unarchive"
                : "Archive"
            }
          >
            <Archive
              size={18}
              className="text-yellow-600"
            />
          </button>


          {/* Edit */}

          <button
            type="button"
            onClick={() => onEdit(note)}
            className="
              bg-white
              p-2
              rounded-lg
              hover:bg-green-100
              transition
            "
            title="Edit"
          >
            <Pencil
              size={18}
              className="text-green-600"
            />
          </button>


          {/* Delete */}

          <button
            type="button"
            onClick={() => onDelete(note._id)}
            className="
              bg-white
              p-2
              rounded-lg
              hover:bg-red-100
              transition
            "
            title="Delete"
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </button>

        </div>

      </div>

    </div>
  );
}

export default NoteCard;
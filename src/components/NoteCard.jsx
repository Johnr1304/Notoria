import {
  Pin,
  Pencil,
  Trash2,
  CalendarDays,
  Tag,
} from "lucide-react";

import { motion } from "framer-motion";

function NoteCard({ 
     note,
     onDelete,
     onEdit,
     onPin
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

        <button
          type="button"
          onClick={() => onPin(note)}
          >
          <Pin
            size={18}
            className={
              note.pinned
               ? "text-indigo-600 fill-indigo-600"
               : "text-gray-400"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-5">
        <p  className="
               mt-4
               text-gray-700
               leading-7
               whitespace-pre-wrap
               break-words
        ">
          {note.content}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center">

        <div className="flex items-center gap-2 text-gray-600">

          <CalendarDays size={16} />

          <span className="text-sm">
            {note.updatedAt}
          </span>

        </div>

        <div className="flex gap-3">

          <button 
          type="button" 
          onClick={onEdit}
          className="bg-white p-2 rounded-lg hover:bg-green-100 transition">
            <Pencil
              size={18}
              className="text-green-600"
            />
          </button>

          <button 
          type="button"
          onClick={() => onDelete(note.id)}
          className="bg-white p-2 rounded-lg hover:bg-red-100 transition">
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
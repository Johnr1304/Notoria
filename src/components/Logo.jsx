import { NotebookPen } from "lucide-react";

function Logo({ collapsed }) {
  return (
    <div className="flex items-center gap-3">

      <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">

        <NotebookPen
          size={24}
          className="text-white"
        />

      </div>

      {!collapsed && (

        <div>

          <h1 className="text-3xl font-black text-indigo-600">
            Notoria
          </h1>

          <p className="text-xs text-gray-500">
            Organize Smarter
          </p>

        </div>

      )}

    </div>
  );
}

export default Logo;
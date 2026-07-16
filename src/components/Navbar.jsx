import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  UserCircle2,
} from "lucide-react";

function Navbar({
  search,
  setSearch,
}) {
  const [darkMode, setDarkMode] = useState( localStorage.getItem("theme") === "dark");
  const [showNotification, setShowNotification] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 h-20 px-8 flex items-center justify-between">

      {/* Search */}

      <div className="relative w-[450px]">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:bg-slate-800 dark:text-white dark:border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <div className="relative">

          <button
            onClick={() =>
              setShowNotification(!showNotification)
            }
          >
            <Bell
              size={22}
              className="text-gray-600 hover:text-indigo-600"
            />
          </button>

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

          {showNotification && (

            <div className="absolute right-0 mt-4 w-72 bg-white shadow-xl rounded-xl p-4 z-50">

              <h2 className="font-bold mb-3">
                Notifications
              </h2>

              <p className="text-sm text-gray-500">
                🎉 Welcome to Notoria.
              </p>

              <p className="text-sm text-gray-500 mt-2">
                📌 Pin important notes.
              </p>

              <p className="text-sm text-gray-500 mt-2">
                📝 Your notes are auto saved.
              </p>

            </div>

          )}

        </div>

        {/* Dark Mode */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode ? (

            <Sun
              size={22}
              className="text-yellow-500"
            />

          ) : (

            <Moon
              size={22}
              className="text-gray-600 hover:text-indigo-600"
            />

          )}
        </button>

        {/* User */}

        <div className="flex items-center gap-3">

          <UserCircle2
            size={42}
            className="text-indigo-600"
          />

          <div>

            <h3 className="font-semibold">
              {user.name || "User"}
            </h3>

            <p className="text-sm text-gray-500">
              Welcome Back
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  UserCircle2,
  Sparkles,
  Pin,
  FileText,
} from "lucide-react";

function Navbar({ search, setSearch }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
    <header
      className="
        w-full
        h-20
        px-4
        sm:px-6
        lg:px-8
        flex
        items-center
        gap-3
        bg-white
        dark:bg-slate-900
        border-b
        border-gray-200
        dark:border-slate-700
      "
    >
      {/* SEARCH */}

      <div className="relative flex-1 min-w-0 max-w-[450px]">
        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            dark:text-gray-500
            pointer-events-none
          "
        />

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            pl-12
            pr-3
            py-3
            rounded-xl
            border
            border-gray-300
            dark:border-slate-600
            bg-gray-50
            dark:bg-slate-800
            text-gray-900
            dark:text-white
            placeholder-gray-400
            dark:placeholder-gray-500
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-2 sm:gap-4 ml-auto flex-shrink-0">

        {/* NOTIFICATION */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setShowNotification((previous) => !previous)
            }
            className="
              relative
              p-2
              rounded-lg
              border
              border-gray-200
              dark:border-slate-700
              hover:bg-gray-100
              dark:hover:bg-slate-800
              transition
            "
          >
            <Bell
              size={21}
              className="
                text-gray-600
                dark:text-gray-300
              "
            />

            <span
              className="
                absolute
                -top-1
                -right-1
                w-2.5
                h-2.5
                bg-red-500
                rounded-full
                border-2
                border-white
                dark:border-slate-900
              "
            />
          </button>

          {/* NOTIFICATION BOX */}

          {showNotification && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-3
                w-[calc(100vw-32px)]
                max-w-[350px]
                bg-white
                dark:bg-slate-800
                border
                border-gray-200
                dark:border-slate-700
                shadow-2xl
                rounded-2xl
                overflow-hidden
                z-50
              "
            >

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-gray-200
                  dark:border-slate-700
                "
              >
                <h2
                  className="
                    font-bold
                    text-lg
                    text-gray-900
                    dark:text-white
                  "
                >
                  Notifications
                </h2>
              </div>

              <div className="p-2">

                {/* Welcome */}

                <div className="flex items-start gap-3 p-3 rounded-xl">

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-lg
                      bg-indigo-100
                      dark:bg-indigo-900/40
                      flex-shrink-0
                    "
                  >
                    <Sparkles
                      size={18}
                      className="
                        text-indigo-600
                        dark:text-indigo-400
                      "
                    />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-medium
                        text-gray-800
                        dark:text-white
                      "
                    >
                      Welcome to Notoria
                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Start organizing your ideas.
                    </p>

                  </div>

                </div>

                {/* Pin */}

                <div className="flex items-start gap-3 p-3 rounded-xl">

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-lg
                      bg-yellow-100
                      dark:bg-yellow-900/30
                      flex-shrink-0
                    "
                  >
                    <Pin
                      size={18}
                      className="
                        text-yellow-600
                        dark:text-yellow-400
                      "
                    />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-medium
                        text-gray-800
                        dark:text-white
                      "
                    >
                      Pin important notes
                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Keep important notes at the top.
                    </p>

                  </div>

                </div>

                {/* Auto Save */}

                <div className="flex items-start gap-3 p-3 rounded-xl">

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-lg
                      bg-green-100
                      dark:bg-green-900/30
                      flex-shrink-0
                    "
                  >
                    <FileText
                      size={18}
                      className="
                        text-green-600
                        dark:text-green-400
                      "
                    />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-medium
                        text-gray-800
                        dark:text-white
                      "
                    >
                      Your notes are auto saved
                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Your changes are saved securely.
                    </p>

                  </div>

                </div>

              </div>
            </div>
          )}
        </div>

        {/* THEME */}

        <button
          type="button"
          onClick={() =>
            setDarkMode((previous) => !previous)
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-slate-800
            transition
            flex-shrink-0
          "
        >
          {darkMode ? (
            <Sun
              size={21}
              className="text-yellow-500"
            />
          ) : (
            <Moon
              size={21}
              className="text-gray-600 dark:text-gray-300"
            />
          )}
        </button>

        {/* USER */}

        <div
          className="
            hidden
            sm:flex
            items-center
            gap-3
            flex-shrink-0
          "
        >
          <UserCircle2
            size={38}
            strokeWidth={1.8}
            className="
              text-indigo-600
              dark:text-indigo-400
            "
          />

          <div className="leading-tight">

            <h3
              className="
                text-base
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {user.name || "User"}
            </h3>

            <p
              className="
                text-xs
                mt-1
                text-gray-500
                dark:text-gray-400
              "
            >
              Welcome Back
            </p>

          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
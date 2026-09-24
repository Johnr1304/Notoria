import {
  Home,
  Folder,
  Tag,
  Archive,
  Trash2,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Sidebar({
  collapsed,
  setCollapsed,
  onNewNote,
}) {
  const navigate = useNavigate();

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    navigate("/login");
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavigation = (path) => {
    navigate(path);

    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {/* =========================================
          MOBILE BACKDROP
      ========================================== */}

      {!collapsed && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            md:hidden
          "
          onClick={() => setCollapsed(true)}
        />
      )}


      {/* =========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed
          md:sticky

          top-0
          left-0
          bottom-0

          md:self-stretch

          z-50

          ${
            collapsed
              ? "-translate-x-full md:translate-x-0 md:w-20"
              : "translate-x-0 w-64"
          }

          bg-white
          dark:bg-slate-900

          border-r
          border-gray-200
          dark:border-slate-700

          flex
          flex-col

          transition-all
          duration-300
          ease-in-out

          flex-shrink-0
        `}
      >

        {/* =========================================
            LOGO + TOGGLE
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            p-5
          "
        >

          {!collapsed && (
            <div
              className="cursor-pointer"
              onClick={() =>
                handleNavigation("/dashboard")
              }
            >

              <h1
                className="
                  text-2xl
                  font-bold
                  text-indigo-600
                "
              >
                Notoria
              </h1>

              <p
                className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Organize Smarter
              </p>

            </div>
          )}


          <button
            type="button"
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              dark:hover:bg-slate-800
              text-gray-600
              dark:text-gray-300
              transition
            "
          >
            {collapsed ? (
              <Menu size={22} />
            ) : (
              <X size={22} />
            )}
          </button>

        </div>


        {/* =========================================
            NEW NOTE
        ========================================== */}

        <div className="px-4 mt-4">

          <button
            type="button"
            onClick={onNewNote}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-3
              rounded-xl
              transition
            "
          >

            <Plus size={20} />

            {!collapsed && (
              <span className="font-semibold">
                New Note
              </span>
            )}

          </button>

        </div>


        {/* =========================================
            NAVIGATION
        ========================================== */}

        <nav
          className="
            flex-1
            px-4
            mt-6
            space-y-2
          "
        >

          {/* ALL NOTES */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/dashboard")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-indigo-50
              dark:hover:bg-slate-800
              hover:text-indigo-600
              transition
            "
          >

            <Home size={20} />

            {!collapsed && (
              <span>
                All Notes
              </span>
            )}

          </button>


          {/* NOTEBOOKS */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/notebooks")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-indigo-50
              dark:hover:bg-slate-800
              hover:text-indigo-600
              transition
            "
          >

            <Folder size={20} />

            {!collapsed && (
              <span>
                Notebooks
              </span>
            )}

          </button>


          {/* TAGS */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/tags")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-indigo-50
              dark:hover:bg-slate-800
              hover:text-indigo-600
              transition
            "
          >

            <Tag size={20} />

            {!collapsed && (
              <span>
                Tags
              </span>
            )}

          </button>


          {/* ARCHIVE */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/archive")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-indigo-50
              dark:hover:bg-slate-800
              hover:text-indigo-600
              transition
            "
          >

            <Archive size={20} />

            {!collapsed && (
              <span>
                Archive
              </span>
            )}

          </button>


          {/* TRASH */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/trash")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-red-50
              dark:hover:bg-slate-800
              hover:text-red-600
              transition
            "
          >

            <Trash2 size={20} />

            {!collapsed && (
              <span>
                Trash
              </span>
            )}

          </button>

        </nav>


        {/* =========================================
            BOTTOM MENU
        ========================================== */}

        <div
          className="
            px-4
            pb-5
            space-y-2
          "
        >

          {/* SETTINGS */}

          <button
            type="button"
            onClick={() =>
              handleNavigation("/settings")
            }
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-indigo-50
              dark:hover:bg-slate-800
              hover:text-indigo-600
              transition
            "
          >

            <Settings size={20} />

            {!collapsed && (
              <span>
                Settings
              </span>
            )}

          </button>


          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-700
              dark:text-gray-300
              hover:bg-red-50
              dark:hover:bg-slate-800
              hover:text-red-600
              transition
            "
          >

            <LogOut size={20} />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
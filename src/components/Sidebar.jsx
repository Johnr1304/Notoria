import {
  NotebookPen,
  Plus,
  BookOpen,
  Tags,
  Archive,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import Logo from "./Logo";

import { useNavigate } from "react-router-dom";

function Sidebar({
  onNewNote,
  collapsed,
  setCollapsed,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-24" : "w-72"
      } h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col justify-between duration-300`}
    >
      {/* Top */}

      <div>
        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-6">

          {!collapsed && (
            <div>

              <Logo collapsed={collapsed}/>

            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-lg"
          >
            {collapsed ? (
              <PanelLeftOpen size={22} />
            ) : (
              <PanelLeftClose size={22} />
            )}
          </button>

        </div>

        {/* New Note */}

        <div className="px-4">

          <button
            onClick={onNewNote}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >
            <Plus size={20} />

            {!collapsed && "New Note"}
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-10 space-y-2 px-4">

          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-indigo-50 text-indigo-600 font-semibold">

            <NotebookPen size={20} />

            {!collapsed && "All Notes"}

          </button>

          <button
            onClick={()=>navigate("/notebooks")}
             className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">

             <BookOpen size={20}/>

            {!collapsed && "Notebooks"}

            </button>

          <button
            onClick={()=>navigate("/tags")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">

             <Tags size={20}/>

              {!collapsed && "Tags"}
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">

            <Archive size={20} />

            {!collapsed && "Archive"}

          </button>

          <button
             onClick={()=>navigate("/settings")}
               className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100">

             <Settings size={20}/>

             {!collapsed && "Settings"}

          </button>

        </nav>
      </div>

      {/* Logout */}

      <div className="p-4">

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
        >
          <LogOut size={20} />

          {!collapsed && "Logout"}
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;
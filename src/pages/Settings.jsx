import {
  Moon,
  Sun,
  Download,
  Upload,
  User,
  Database,
  Info,
  LogOut,
  Settings as SettingsIcon,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Settings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const token = localStorage.getItem("token");

  // APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // TOGGLE THEME
  const toggleTheme = () => {
    setDarkMode((previousMode) => !previousMode);
  };

  // EXPORT NOTES
  const exportNotes = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const notes = res.data.notes || [];

      const data = JSON.stringify(notes, null, 2);

      const blob = new Blob([data], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "notoria-notes.json";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      alert("Notes exported successfully");
    } catch (error) {
      console.error("Export Notes Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLoggedIn");

        navigate("/login");
        return;
      }

      alert("Failed to export notes");
    }
  };

  // IMPORT NOTES
  const importNotes = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const notes = JSON.parse(event.target.result);

          if (!Array.isArray(notes)) {
            alert(
              "Invalid file. Please select a Notoria JSON file."
            );
            return;
          }

          let importedCount = 0;

          for (const note of notes) {
            await api.post(
              "/notes",
              {
                title: note.title || "Untitled Note",
                content: note.content || "",
                tag: note.tag || "Personal",
                color: note.color || "#EEF2FF",
                pinned: note.pinned || false,
                archived: note.archived || false,
                trashed: note.trashed || false,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            importedCount++;
          }

          alert(
            `${importedCount} note${
              importedCount === 1 ? "" : "s"
            } imported successfully`
          );
        } catch (error) {
          console.error("Import Notes Error:", error);

          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("isLoggedIn");

            navigate("/login");
            return;
          }

          alert(
            "Failed to import notes. Please check the JSON file."
          );
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error("File Import Error:", error);

      alert("Unable to read the selected file.");
    }

    // Allow selecting the same file again
    e.target.value = "";
  };

  // LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            {/* SETTINGS ICON */}

            <div className="p-3.5 bg-indigo-100 dark:bg-indigo-950/50 rounded-xl">

              <SettingsIcon
                size={28}
                className="text-indigo-600 dark:text-indigo-400"
              />

            </div>

            {/* TITLE */}

            <div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your Notoria preferences and data
              </p>

            </div>

          </div>

        </div>


        {/* APPEARANCE */}

        <section className="mb-6">

          <div className="flex items-center gap-2 mb-3">

            <SettingsIcon
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>

          </div>


          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-5 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div className="flex items-start gap-4">

                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50">

                    {darkMode ? (
                      <Moon
                        size={22}
                        className="text-indigo-600 dark:text-indigo-400"
                      />
                    ) : (
                      <Sun
                        size={22}
                        className="text-indigo-600"
                      />
                    )}

                  </div>


                  <div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Theme
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                      Currently using{" "}

                      <span className="font-medium">
                        {darkMode
                          ? "Dark Mode"
                          : "Light Mode"}
                      </span>

                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
                >

                  {darkMode ? (
                    <Sun size={19} />
                  ) : (
                    <Moon size={19} />
                  )}

                  {darkMode
                    ? "Switch to Light"
                    : "Switch to Dark"}

                </button>

              </div>

            </div>

          </div>

        </section>


        {/* DATA & BACKUP */}

        <section className="mb-6">

          <div className="flex items-center gap-2 mb-3">

            <Database
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data & Backup
            </h2>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* EXPORT */}

            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">

                  <Download
                    size={22}
                    className="text-emerald-600 dark:text-emerald-400"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Export Notes
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">
                    Download a backup of your Notoria notes as a JSON file.
                  </p>


                  <button
                    type="button"
                    onClick={exportNotes}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
                  >

                    <Download size={18} />

                    Export Notes

                  </button>

                </div>

              </div>

            </div>


            {/* IMPORT */}

            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40">

                  <Upload
                    size={22}
                    className="text-amber-600 dark:text-amber-400"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Import Notes
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5">
                    Restore notes from a previously exported Notoria JSON file.
                  </p>


                  <label className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium transition cursor-pointer">

                    <Upload size={18} />

                    Import Notes

                    <input
                      type="file"
                      hidden
                      accept=".json"
                      onChange={importNotes}
                    />

                  </label>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ACCOUNT */}

        <section className="mb-6">

          <div className="flex items-center gap-2 mb-3">

            <User
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Account
            </h2>

          </div>


          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm">

            <div className="p-5 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center">

                  <User
                    size={28}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                    {user.email || "No email available"}
                  </p>

                </div>


                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">

                  <ShieldCheck size={18} />

                  Account Active

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ABOUT NOTORIA */}

        <section className="mb-6">

          <div className="flex items-center gap-2 mb-3">

            <Info
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              About Notoria
            </h2>

          </div>


          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notoria
                </h3>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Organize Smarter
                </p>

                <p className="text-sm text-gray-400 dark:text-gray-500 mt-3 max-w-xl">
                  A simple and organized workspace for creating,
                  managing, and keeping track of your notes.
                </p>

              </div>


              <div className="text-left sm:text-right">

                <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Version
                </p>

                <p className="font-semibold text-gray-700 dark:text-gray-300 mt-1">
                  1.0.0
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* LOGOUT */}

        <section>

          <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-2xl p-5 sm:p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Sign out of Notoria
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  You can sign back in anytime using your account.
                </p>

              </div>


              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-5 py-2.5 rounded-xl font-medium transition"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;
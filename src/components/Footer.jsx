import { Link } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Tags,
  Archive,
  Settings,
  Upload,
  Download,
} from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand Section */}
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                <FileText size={20} className="text-white" />
              </div>

              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Notoria
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400 max-w-xs">
              Organize your thoughts, notes, and ideas in one simple workspace.
            </p>

            <p className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Organize smarter. Stay focused.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Explore
            </h3>

            <div className="space-y-3">

              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <FileText size={16} />
                Notes
              </Link>

              <Link
                to="/notebooks"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <BookOpen size={16} />
                Notebooks
              </Link>

              <Link
                to="/tags"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Tags size={16} />
                Tags
              </Link>

              <Link
                to="/archive"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Archive size={16} />
                Archive
              </Link>

            </div>
          </div>

          {/* Manage */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Manage
            </h3>

            <div className="space-y-3">

              <Link
                to="/settings"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Settings size={16} />
                Settings
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Upload size={16} />
                Import Notes
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                <Download size={16} />
                Export Notes
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-slate-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2026 Notoria. All rights reserved.
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built for better note-taking.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;


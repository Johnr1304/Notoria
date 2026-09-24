import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";
import Notebook from "./pages/Notebook";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Tags from "./pages/Tags";
import Trash from "./pages/Trash";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        {/* Signup */}

        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Archive */}

        <Route
          path="/archive"
          element={
            <ProtectedRoute>
              <Archive />
            </ProtectedRoute>
          }
        />

        {/* Notebooks */}

        <Route
          path="/notebooks"
          element={
            <ProtectedRoute>
              <Notebook />
            </ProtectedRoute>
          }
        />

        {/* Individual Notebook */}

        <Route
          path="/notebook/:id"
          element={
            <ProtectedRoute>
              <Notebook />
            </ProtectedRoute>
          }
        />

        {/* Tags */}

        <Route
          path="/tags"
          element={
            <ProtectedRoute>
              <Tags />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Not Found */}

        <Route path="*" element={<NotFound />} />

        <Route
         path="/trash"
         element={
         <ProtectedRoute>
         <Trash />
         </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
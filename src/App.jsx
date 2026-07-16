import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";
import Notebook from "./pages/Notebook";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Tags from "./pages/Tags";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/archive"
          element={
            <ProtectedRoute>
              <Archive />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notebook/:id"
          element={
            <ProtectedRoute>
              <Notebook />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route path="/settings"element={<Settings/>} />

        <Route path="/tags" element={<Tags />} />

        

      </Routes>

    </BrowserRouter>
  );
}

export default App;
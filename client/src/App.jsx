// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import AILab from "./pages/AILab";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";

// New pages
import ResumeUpload from "./pages/ResumeUpload";
import InterviewLab from "./pages/InterviewLab";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/ai-lab" element={<AILab />} />
              <Route path="/contact" element={<Contact />} />

              {/* Resume & Interview pages */}
              <Route path="/resume" element={<ResumeUpload />} />
              <Route path="/interview" element={<InterviewLab />} />

              {/* Protected */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

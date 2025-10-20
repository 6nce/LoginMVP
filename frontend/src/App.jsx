import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MfaPage from "./pages/MfaPage";
import UserDashboard from "./pages/UserDashboard.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/mfa" element={<MfaPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
      </BrowserRouter>

  )
}

export default App

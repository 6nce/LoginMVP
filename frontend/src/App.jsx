import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MfaPage from "./pages/MfaPage";
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/mfa" element={<MfaPage />} />
              <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
      </Router>

  )
}

export default App

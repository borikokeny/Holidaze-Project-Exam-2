import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/index.css";
import MainLayout from "../components/layout";
import { Home, ProfilePage } from "../pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profilePage" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
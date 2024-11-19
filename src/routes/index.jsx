import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/index.css";
import MainLayout from "../components/layout";
import { Home, Venue, ProfilePage, RegisterForm } from "../pages/index";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="venuePage/:venueId" element={<Venue />} />
          <Route path="profilePage" element={<ProfilePage />} />
          <Route path="myVenues" />
          <Route path="auth/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
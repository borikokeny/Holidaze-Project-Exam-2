import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/index.css";
import MainLayout from "../components/Layout";
import {
  Home,
  Venue,
  ProfilePage,
  RegisterForm,
  LoginForm,
  MyBookings,
  MyVenues,
  VenueForm
} from "../pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="VenuePage/:venueId" element={<Venue />} />
          <Route path="ProfilePage" element={<ProfilePage />} />
          <Route path="MyBookings" element={<MyBookings />} />
          <Route path="MyVenues" element={<MyVenues />} />
          <Route path="auth/Register" element={<RegisterForm />} />
          <Route path="auth/Login" element={<LoginForm />} />
          <Route path="VenueForm" element={<VenueForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

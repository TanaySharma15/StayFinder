import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/Admin";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/Search";
import Layout from "./components/Layout";
import ListingPage from "./pages/Listing";
import ProfilePage from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HostPage from "./pages/Host";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/listing/:listingId" element={<ListingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/result" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/host" element={<HostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

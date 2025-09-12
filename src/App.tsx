import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Index from "./pages/Index";
import MonasteryDetail from "./pages/MonasteryDetail";
import Profile from "./pages/Profile";
import PrayerWheel from "./pages/PrayerWheel";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (has logged in)
    const touristName = localStorage.getItem('tourist_name');
    setIsAuthenticated(!!touristName);
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/monastery/:monasteryId" element={<MonasteryDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/prayer-wheel" element={<PrayerWheel />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

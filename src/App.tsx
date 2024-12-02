import { useEffect, useState } from "react";
import Scan from "./pages/scan";
import Login from "./pages/login"; // Import Login component
import { ConfigProvider, theme } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const version = "0.0.1";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.reload();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('appVersion', version);
  };

  useEffect(() => {
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== version) handleLogout();
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="text-white min-w-full min-h-screen overflow-clip bg-black">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/scan" element={<Scan />} />
              <Route path="/" element={<Navigate to="/scan" />} />
            </>
          ) : (
            <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          )}
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;
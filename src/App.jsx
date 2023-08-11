import { Outlet, useNavigate } from "react-router-dom";
import ThemeProvider from "./context/theme.context";
import { HomepageLayout } from "./layout/homepage-layout/homepage-layout";
import "./styles/css/global.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/basic-contracts");
  }, []);

  return (
    <ThemeProvider>
      <HomepageLayout>
        <Outlet />
      </HomepageLayout>
    </ThemeProvider>
  );
}

export default App;

import { Outlet, useNavigate } from "react-router-dom";
import ThemeProvider from "./context/theme.context";
import { HomepageLayout } from "./layout/homepage-layout/homepage-layout";
import "./styles/css/global.css";
import { useEffect } from "react";
import { menuMock } from "./utils/mocks/index.js";
import { useQuery } from "react-query";

function App() {
  const navigate = useNavigate();
  const { data: userData } = useQuery({
    queryKey: ["user"],
  });

  const firstAccessibleLink = menuMock.filter((menu) =>
    menu.access.find((role) => role === userData.role)
  );

  useEffect(() => {
    const isUserOnHomePage = window.location.pathname === "/";
    if (isUserOnHomePage) {
      navigate(firstAccessibleLink[0].link);
    }
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

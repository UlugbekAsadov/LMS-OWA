import { Outlet } from 'react-router-dom';
import ThemeProvider from './context/theme.context';
import { HomepageLayout } from './layout/homepage-layout/homepage-layout';
import './styles/css/global.css';

function App() {
  return (
    <ThemeProvider>
      <HomepageLayout>
        <Outlet />
      </HomepageLayout>
    </ThemeProvider>
  );
}

export default App;

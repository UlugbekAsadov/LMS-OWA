import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Router } from './router/router.jsx';
import { BasicContractsProvider } from './context/basic-contract.context.jsx';

import './styles/scss/dashlite.scss';
import './styles/scss/style-email.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login.jsx';
import Error403Classic from './pages/error/403-classic.jsx';

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <BasicContractsProvider>
        {/* <Router /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/403" element={<Error403Classic />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </BasicContractsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

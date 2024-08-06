import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import AppLayout from './components/appLayout/appLayout';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </BrowserRouter>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { BrowserRouter } from 'react-router-dom'
import { PrintProvider } from './context/PrintContext.jsx';
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <PrintProvider>
    <App />
    </PrintProvider>
    </AuthProvider>
  </React.StrictMode>
);
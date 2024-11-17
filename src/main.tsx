import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/socketContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>
  </BrowserRouter>
);

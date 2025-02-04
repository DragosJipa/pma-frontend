// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';

// Create a root element using React 18's new createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  useGoogleAnalytics();
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

root.render(<Root />);
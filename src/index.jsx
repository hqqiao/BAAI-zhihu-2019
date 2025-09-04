import React from 'react';
import ReactDOM from 'react-dom/client';
import MyPageComponent from './pages';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <MyPageComponent />
  </React.StrictMode>
);

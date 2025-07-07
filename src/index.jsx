import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './App.less';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1db954',
          borderRadius: 4,
          colorBgContainer: '#121212',
          colorText: '#ffffff',
          colorTextSecondary: '#b3b3b3',
          colorBorder: '#282828'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

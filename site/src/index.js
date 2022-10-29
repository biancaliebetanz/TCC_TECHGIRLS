import React from 'react';
import ReactDOM from 'react-dom/client';
import  Routes  from '../src/routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Storage from 'local-storage'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <ToastContainer/>
    <Routes />
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksContextProvider } from "./context/ContextProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksContextProvider>
    <React.StrictMode>
        <App>
        </App>
    </React.StrictMode>
  </TasksContextProvider>
);

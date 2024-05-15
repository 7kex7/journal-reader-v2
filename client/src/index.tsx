import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from './modules/User/store/userStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context = React.createContext(null)

root.render(
  <React.StrictMode>
    <Context.Provider value={
      {
        user: new userStore(),
        journal: new journalStore()
      }
    }>
    </Context.Provider>
    <App />
  </React.StrictMode>
);
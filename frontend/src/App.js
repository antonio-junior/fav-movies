import React from 'react';
import { Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppStore from './helpers/AppStore';
import history from './helpers/History';
import Routes from './routes';

export default function App() {
  toast.configure();

  return (
    <Router history={history}>
      <AppStore>
        <Routes />
      </AppStore>
    </Router>
  );
}

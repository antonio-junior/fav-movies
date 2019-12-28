import React from 'react';
import { Router } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import history from './helpers/History';
import QueryStore from './helpers/QueryStore';
import Routes from './Routes';

export default function App() {
  toast.configure();

  return (
    <Router history={history}>
      <QueryStore>
        <Routes />
      </QueryStore>
    </Router>
  );
}

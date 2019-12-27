import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContentContainer from '../Layout/ContentContainer';
import Header from '../Layout/Header';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';
import Edit from '../pages/Edit';
import PrivateRoute from '../AuthVerify/PrivateRoute';

export default function App() {
  toast.configure();

  const [query, setQuery] = useState('');

  const onSubmit = text => {
    setQuery(text);
  };

  return (
    <>
      <PrivateRoute isPage={false}>
        <Header onSubmit={e => onSubmit(e)} />
      </PrivateRoute>
      <Switch>
        <Route exact path="/">
          <PrivateRoute>
            <ContentContainer query={query} isFavorite={false} />
          </PrivateRoute>
        </Route>
        <Route path="/favorites">
          <PrivateRoute>
            <ContentContainer isFavorite />
          </PrivateRoute>
        </Route>
        <Route path="/movie/:imdbid">
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        </Route>
        <Route path="/edit/:favoriteid">
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        </Route>
        <Route path="/dashboard">
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

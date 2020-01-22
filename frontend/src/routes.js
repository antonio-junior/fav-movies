import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Layout/Header';
import ContentContainer from './components/Movies/MoviesContainer';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Edit from './pages/Edit';

const Routes = () => {
  return (
    <>
      <PrivateRoute isPage={false}>
        <Header />
      </PrivateRoute>
      <Switch>
        <Route exact path="/">
          <PrivateRoute >
            <ContentContainer isFavorite={false} />
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
};

export default Routes;

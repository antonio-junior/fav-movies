import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContentContainer from '../Layout/ContentContainer';
import Header from '../Layout/Header';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';
import Edit from '../pages/Edit';

export default function App() {
  toast.configure();

  const [query, setQuery] = useState('');

  const onSubmit = text => {
    setQuery(text);
  };

  return (
    <>
      <Header onSubmit={e => onSubmit(e)} />
      <Switch>
        <Route exact path="/">
          <ContentContainer query={query} isFavorite={false} />
        </Route>
        <Route path="/favorites">
          <ContentContainer isFavorite />
        </Route>
        <Route path="/movie/:imdbid" component={Details} />
        <Route path="/edit/:favoriteid" component={Edit} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

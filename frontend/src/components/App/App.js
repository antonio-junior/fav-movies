import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import ContentContainer from '../Layout/ContentContainer';
import Header from '../Layout/Header';
import Dashboard from '../Movies/Dashboard';
import Details from '../Movies/Details';

export default function App() {
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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}

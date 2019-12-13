import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ContentContainer from '../Layout/ContentContainer';
import Header from '../Layout/Header';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';

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
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import ContentContainer from '../components/Layout/ContentContainer';
import Header from '../components/Layout/Header';
import Messages from '../components/UI/Messages/index';
import Dashboard from '../components/Movies/Dashboard';

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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      <Messages />
    </>
  );
}

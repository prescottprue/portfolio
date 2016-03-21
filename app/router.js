import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router } from 'react-router'
import {
    App,
    Home,
    About,
    NotFound
  } from './containers'
export default (history) => (
  <Router history={ history }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='about' component={ About } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>
)

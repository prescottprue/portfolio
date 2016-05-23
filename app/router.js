import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router } from 'react-router'
import {
    App,
    Home,
    Project,
    NotFound
  } from './containers'
export default (history) => (
  <Router history={ history }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='projects/:projectName' component={ Project }/>
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>
)

import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import ProjectRoute from './Project'
import NotFoundRoute from './NotFound'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    ProjectRoute,
    /* Place all Routes above here so NotFoundRoute can act as a 404 page */
    NotFoundRoute(store)
  ]
})

export default createRoutes

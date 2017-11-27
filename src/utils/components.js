import PropTypes from 'prop-types'
import { pick, some, filter } from 'lodash'
import LoadingSpinner from 'components/LoadingSpinner'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {
  compose,
  withContext,
  getContext,
  mapProps,
  branch,
  renderComponent
} from 'recompose'

/**
 * Show a loading spinner when a condition is truthy. Used within
 * spinnerWhileLoading. Accepts a test function and a higher-order component.
 * branch(
 *   test: (props: Object) => boolean,
 *   right: ?HigherOrderComponent
 * ): HigherOrderComponent
 * @param  {Function} condition -
 * @return {HigherOrderComponent}           [description]
 */
export const spinnerWhile = condition =>
  branch(condition, renderComponent(LoadingSpinner))

/**
 * Show a loading spinner while props are loading . Checks
 * for undefined, null, or a value (as well as handling `auth.isLoaded` and
 * `profile.isLoaded`). **NOTE:** Meant to be used with props which are passed
 * as props from state.firebase using connect (from react-redux), which means
 * it could have unexpected results for other props
 * @param  {Array} propNames [description]
 * @return {HigherOrderComponent}           [description]
 */
export const spinnerWhileLoading = propNames =>
  spinnerWhile(props => some(propNames, name => !isLoaded(props[name])))

export const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object })
)

export const withRouter = compose(
  withContext({ router: PropTypes.object }, () => {}),
  getContext({ router: PropTypes.object })
)

export const withStoreAndRouter = compose(
  withContext(
    {
      router: PropTypes.object,
      store: PropTypes.object
    },
    () => {}
  ),
  getContext({ router: PropTypes.object, store: PropTypes.object })
)

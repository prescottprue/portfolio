import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'

export default compose(
  firebaseConnect([
    {
      path: 'portfolio/projects',
      storeAs: 'projects'
    }
  ]),
  connect(({ firebase: { data: { projects } } }, { params }) => ({
    projects
  })),
  spinnerWhileLoading(['projects'])
)

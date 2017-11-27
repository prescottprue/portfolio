import { get } from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
  firebaseConnect([
    {
      path: 'portfolio/projects',
      storeAs: 'projects'
    }
  ]),
  connect(({ firebase: { data } }, { params }) => ({
    project: get(data, `projects.${params.projectId}`, null)
  }))
)

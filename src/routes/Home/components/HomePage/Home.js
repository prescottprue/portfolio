import React from 'react'
import PropTypes from 'prop-types'
import ProjectsTiles from '../ProjectsTiles'
import Paper from 'material-ui/Paper'
import classes from './Home.scss'

export const Home = ({ projects }) => (
  <div className={classes.container}>
    <Paper className={classes.intro}>
      <span>
        My name is Prescott Prue and I engineer systems that handle
        repetitive system tasks so that users can focus on what actually
        matters. Whether it involves a 3D modeling automation system, or a
        software development platform, I aim to bring customization for all
        regardless of personal/professional experience.
      </span>
      <br />
      <br />
      <span>
        Below are some of my recent projects. Click the icon in the lower
        right corner for more information.
      </span>
    </Paper>
    <ProjectsTiles projects={projects} />
  </div>
)

Home.propTypes = {
  projects: PropTypes.object
}

export default Home

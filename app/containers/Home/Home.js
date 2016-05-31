import React, { Component } from 'react'
import { Link } from 'react-router'
import ProjectsTiles from '../../components/ProjectsTiles/ProjectsTiles'
import Rebase from 're-base'
import Paper from 'material-ui/lib/paper'
import { fbUrl } from '../../config'
import './Home.scss'
console.log('fbUrl:', fbUrl)

let base = Rebase.createClass(fbUrl)

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount () {
    this.ref = base.bindToState('projects', {
      context: this,
      state: 'projects',
      asArray: true,
      queries: {
        orderByChild: 'importance'
      }
    })
  }
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }
  render () {
    return (
      <div className='Home'>
        <Paper className='Home-Intro'>
          <span>
            My name is Prescott Prue and I engineer systems that handle repetitive system tasks so that users can focus on what actually matters. Whether it involves a 3D modeling automation system, or a software development platform, I aim to bring customization for all regardless of personal/professional experience.
          </span>
          <br/>
          <br/>
          <span>
            Below are some of my recent projects. Click the icon in the lower right corner for more information.
          </span>
        </Paper>
        <ProjectsTiles projects={ this.state.projects }/>
      </div>
    )
  }
}

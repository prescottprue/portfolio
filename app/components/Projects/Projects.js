import React, { Component } from 'react'
import { Link } from 'react-router'
import Rebase from 're-base'
import Paper from 'material-ui/lib/paper'
import './Projects.scss'

let base = Rebase.createClass('https://prue.firebaseio.com/portfolio')

export default class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  componentDidMount () {
    base.bindToState('projects', {
      context: this,
      state: 'projects',
      asArray: true
    })
  }

  render () {
    console.log('projects:', this.state.projects)
    const projects = this.state.projects.map((project, i) =>
      (
        <Paper className='Projects-Project' key={`Project-${i}`}>
          <div className='Projects-Project-Img'>
            <img src={ project.pictures[0].image.url } style={{ maxWidth: '400px', maxHeight: '400px'}}/>
          </div>
          <div className='Projects-Project-Meta'>
            <span className='Projects-Project-Name'>{ project.name }</span>
            <span className='Projects-Project-Intro'>{ project.intro }</span>
          </div>
        </Paper>
      )
    )
    return (
      <div className='Projects'>
        { projects }
      </div>
    )
  }
}

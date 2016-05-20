import React, { Component } from 'react'
import { Link } from 'react-router'
import './Home.scss'
import Rebase from 're-base'
let base = Rebase.createClass('https://prue.firebaseio.com/portfolio')

export default class Home extends Component {
  constructor () {
    super()
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
    const projects = this.state.projects.map((project, i) =>
      (
        <div key={`Project-${i}`}>
          { project.name }
        </div>
      )
    )
    return (
      <div className='Home'>
        <div className=''>
          { projects }
        </div>
      </div>
    )
  }
}

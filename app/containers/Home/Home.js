import React, { Component } from 'react'
import { Link } from 'react-router'
import ProjectsTiles from '../../components/ProjectsTiles/ProjectsTiles'
import Rebase from 're-base'

import './Home.scss'
let base = Rebase.createClass('https://prue.firebaseio.com/portfolio')

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
      asArray: true
    })
  }
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }
  render () {
    return (
      <div className='Home'>
        <ProjectsTiles projects={ this.state.projects }/>
      </div>
    )
  }
}

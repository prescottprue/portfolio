import React, { Component } from 'react'
import { Link } from 'react-router'
import './Home.scss'

export default class Home extends Component {
  render () {
    const projects = [{ name: 'project1' }, { name: 'project2' }]
    const projectsList = projects.map(project => {
      return (
        <div>{ project.name }</div>
      )
    })
    return (
      <div className='Home'>
        <h2>Welcome to portfolio</h2>
        { projectsList }
      </div>
    )
  }
}

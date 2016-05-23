import React, { Component } from 'react'
import { Link } from 'react-router'
import Projects from '../../components/Projects/Projects'

import './Home.scss'

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='Home'>
        <Projects />
      </div>
    )
  }
}

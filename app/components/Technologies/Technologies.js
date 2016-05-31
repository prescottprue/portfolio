import React, { Component, PropTypes } from 'react'
import './Technologies.scss'

export default class Technologies extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render () {
    const technologies = this.props.list.map((technology, i) => (
      <a className='Technologies-Technology' key={`Technologies-Technology-${i}`} href={ technology.link } style={{textAlign: 'center'}}>
        {
          technology.icon
            ? <img
              className='Technologies-Technology-Icon'
              src={ technology.icon.url }
            />
            : null
        }
        <span className='Technologies-Technology-Name'>
          { technology.name }
        </span>
      </a>
    ))
    return (
      <div className='Technologies'>
        { technologies }
      </div>
    )
  }
}

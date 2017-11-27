import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/svg-icons/social/person'

import './Team.scss'

export default class Team extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    list: PropTypes.array.isRequired
  }

  render() {
    const teamList = this.props.list.map((person, i) => {
      const avatar =
        person.icon && person.icon.url ? (
          <Avatar src={person.icon.url} />
        ) : (
          <Avatar>{person.name.charAt(0).toUpperCase()}</Avatar>
        )
      return (
        <div className="Team-Member" key={`Team-Member-${i}`}>
          <a href={person.url}>{avatar}</a>
          <span className="Team-Member-Name">{person.name}</span>
          <span className="Team-Member-Role">{person.role}</span>
        </div>
      )
    })
    return <div className="Team">{teamList}</div>
  }
}

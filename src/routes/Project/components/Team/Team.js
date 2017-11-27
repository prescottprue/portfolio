import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/svg-icons/social/person'

import classes from './Team.scss'

export const Team = ({ list }) => (
  <div className={classes.container}>
    {list.map((person, i) => {
      const avatar =
        person.icon && person.icon.url ? (
          <Avatar src={person.icon.url} />
        ) : (
          <Avatar>{person.name.charAt(0).toUpperCase()}</Avatar>
        )
      return (
        <div className={classes.member} key={`Team-Member-${i}`}>
          <a href={person.url}>{avatar}</a>
          <span className={classes.memberName}>{person.name}</span>
          <span className={classes.memberRole}>{person.role}</span>
        </div>
      )
    })}
  </div>
)

Team.propTypes = {
  list: PropTypes.array.isRequired
}

export default Team

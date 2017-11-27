import React from 'react'
import PropTypes from 'prop-types'
import classes from './Technologies.scss'

export const Technologies = ({ list }) => (
  <div className={classes.container}>
    {list.map((technology, i) => (
      <a
        className={classes.technology}
        key={`Technologies-Technology-${i}`}
        href={technology.link}
        style={{ textAlign: 'center' }}>
        {technology.icon ? (
          <img className={classes.technologyIcon} src={technology.icon.url} />
        ) : null}
        <span className={classes.technologyName}>{technology.name}</span>
      </a>
    ))}
  </div>
)

Technologies.propTypes = {
  list: PropTypes.array.isRequired
}

export default Technologies

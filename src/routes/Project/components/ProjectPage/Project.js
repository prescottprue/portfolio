import React from 'react'
import { Link } from 'react-router'
import { find } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Technologies from '../Technologies'
import Team from '../Team'
import RaisedButton from 'material-ui/RaisedButton'
import ImageGallery from 'react-image-gallery'
import classes from './Project.scss'

export const Project = ({ project, name }) => {
  let pictures

  const { links, technologies, team } = project || {}
  if (project && project.pictures) {
    pictures = project.pictures.map(obj => {
      return {
        original: `/${obj.image.url}`,
        thumbnail: `/${obj.image.url}`,
        description: obj.caption
      }
    })
  }
  const linksList = links ? (
    project.links.map((link, i) => (
      <div className={classes['Links-Link']} key={`Project-Links-Link-${i}`}>
        <a href={link.path}>
          <RaisedButton primary label={link.name} style={{ margin: 12 }} />
        </a>
      </div>
    ))
  ) : (
    <div />
  )

  return (
    <Paper className={classes.container}>
      {project ? (
        <div>
          <div className={classes.Name}>
            <span>{project.name}</span>
          </div>
          <div className={classes.Intro}>
            <span>{project.intro}</span>
          </div>
          {project.role ? (
            <div className={classes.Role}>
              <span>Role: {project.role}</span>
            </div>
          ) : null}
          {links ? <div className={classes.Links}>{linksList}</div> : null}
          <div className={classes.Description}>{project.description}</div>
          {pictures ? (
            <ImageGallery items={pictures} slideOnThumbnailHover />
          ) : null}
          {team ? (
            <div>
              <div className={classes.Label}>
                <span>Team</span>
              </div>
              <Team list={team} />
            </div>
          ) : null}
          {technologies ? (
            <div>
              <div className={classes.Label}>
                <span>Technologies</span>
              </div>
              <Technologies list={technologies} />
            </div>
          ) : null}
        </div>
      ) : null}
    </Paper>
  )
}

export default Project

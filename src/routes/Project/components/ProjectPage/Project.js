import React from 'react'
import { Link } from 'react-router'
import { find } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Technologies from '../Technologies'
import Team from '../Team'
import RaisedButton from 'material-ui/RaisedButton'
import ImageGallery from 'react-image-gallery'
import './Project.scss'

export const Project = ({ projects }) => {
  let pictures
  const { name } = this.props
  const project = this.state.projects
    ? find(this.state.projects, { key: name })
    : {}
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
  console.log('pictures:', pictures)
  const linksList = links ? (
    project.links.map((link, i) => (
      <div className="Project-Links-Link" key={`Project-Links-Link-${i}`}>
        <a href={link.path}>
          <RaisedButton primary label={link.name} style={{ margin: 12 }} />
        </a>
      </div>
    ))
  ) : (
    <div />
  )

  return (
    <Paper className="Project">
      {project ? (
        <div>
          <div className="Project-Name">
            <span>{project.name}</span>
          </div>
          <div className="Project-Intro">
            <span>{project.intro}</span>
          </div>
          {project.role ? (
            <div className="Project-Role">
              <span>Role: {project.role}</span>
            </div>
          ) : null}
          {links ? <div className="Project-Links">{linksList}</div> : null}
          <div className="Project-Description">{project.description}</div>
          {pictures ? (
            <ImageGallery
              ref={i => (this._imageGallery = i)}
              items={pictures}
              slideOnThumbnailHover
            />
          ) : null}
          {team ? (
            <div>
              <div className="Project-Label">
                <span>Team</span>
              </div>
              <Team list={team} />
            </div>
          ) : null}
          {technologies ? (
            <div>
              <div className="Project-Label">
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

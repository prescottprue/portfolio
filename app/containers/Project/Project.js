import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Rebase from 're-base'
import { find } from 'lodash'
import IconButton from 'material-ui/lib/icon-button'
import Paper from 'material-ui/lib/paper'
import Technologies from '../../components/Technologies/Technologies'
import Team from '../../components/Team/Team'
import RaisedButton from 'material-ui/lib/raised-button'
import ImageGallery from 'react-image-gallery'
import './Project.scss'

let base = Rebase.createClass('https://prue.firebaseio.com/portfolio')

class Project extends Component {
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
    let pictures
    const { name } = this.props
    const project = this.state.projects ? find(this.state.projects, { key: name }) : {}
    const { links, technologies, team } = project || {}
    if (project && project.pictures) {
      pictures = project.pictures.map(obj => { return { original: `/${obj.image.url}`, thumbnail: `/${obj.image.url}`, description: obj.caption } })
    }
    console.log('pictures:', pictures)
    const linksList = links ? project.links.map((link, i) => (
      <div className='Project-Links-Link' key={ `Project-Links-Link-${i}`}>
        <a href={ link.path }>
          <RaisedButton
            primary={ true }
            label={ link.name }
            style={{margin: 12}}
          />
        </a>
      </div>
    )) : <div></div>

    return (
        <Paper className='Project'>
          { project ? (
            <div>
              <div className='Project-Name'>
                <span>{ project.name }</span>
              </div>
              <div className='Project-Intro'>
                <span>{ project.intro }</span>
              </div>
              { project.role
                ? <div className='Project-Role'>
                    <span>Role: { project.role }</span>
                  </div>
                : null
              }
              {
                links
                ? (
                  <div className='Project-Links'>
                    { linksList }
                  </div>
                )
                : null
              }
              <div className='Project-Description'>
                { project.description }
              </div>
              {
                pictures
                ? (
                  <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={ pictures }
                    slideOnThumbnailHover={ true }
                  />
                )
                : null
              }
              {
                team
                ? (
                  <div>
                    <div className='Project-Label'>
                      <span>Team</span>
                    </div>
                    <Team list={ team } />
                  </div>
                )
                : null
              }
              {
                technologies
                ? (
                  <div>
                    <div className='Project-Label'><span>Technologies</span></div>
                    <Technologies list={ technologies } />
                  </div>
                )
                : null
              }

            </div>
          ) : null }
        </Paper>
    )
  }
}

// Place state of redux store into props of component
const mapStateToProps = (state) => {
  const projectname = window.location.pathname.split('/')[2]
  return {
    name: projectname,
    account: state.account,
    router: state.router
  }
}

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Project)

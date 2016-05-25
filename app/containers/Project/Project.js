import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Avatar from 'material-ui/lib/avatar'
import Rebase from 're-base'
import { find } from 'lodash'
import IconButton from 'material-ui/lib/icon-button'
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
    const { name } = this.props
    const project = this.state.projects ? find(this.state.projects, { key: name }) : {}
    const { links, technologies, team } = project || {}

    const linksList = links ? project.links.map((link, i) => (
      <div className='Project-Links-Link' key={ `Project-Links-Link-${i}`}>
        <a href={ link.path }>{ link.name }</a>
      </div>
    )) : <div></div>

    const technologiesList = technologies ? technologies.map((technology, i) => (
      <div className='Project-Technology' key={`Project-Technology-${i}`}>
        <a href={ technology.link }>
          {
            technology.icon
              ? <img className='Project-Technology-Icon' src={ technology.icon.url } />
              : null
          }
          <div className='Project-Technology-Name'><span>{ technology.name }</span></div>
        </a>
      </div>
    )) : <div></div>

    const teamList = team ? team.map((person, i) => {
      const avatar = (person.icon && person.icon.url)
        ? <Avatar src={ person.icon.url } />
        : <Avatar>{ person.name.charAt(0).toUpperCase() }</Avatar>
      return (
        <div className='Project-Team-Member' key={`Team-Member-${i}`}>
          <a href={ person.url }>{ avatar }</a>
          <span className='Project-Team-Member-Name'>{ person.name }</span>
          <span className='Project-Team-Member-Role'>{ person.role }</span>
        </div>
      )
    }) : <div></div>

    return (
      <div className='Project'>
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
                team
                ? (
                  <div>
                    <div className='Project-Label'><span>Team</span></div>
                    <div className='Project-Team'>
                      { teamList }
                    </div>
                  </div>
                )
                : null
              }
              {
                technologies
                ? (
                  <div>
                    <div className='Project-Label'><span>Technologies</span></div>
                    <div className='Project-Technologies'>
                      { technologiesList }
                    </div>
                  </div>
                )
                : null
              }

            </div>
          ) : null }
      </div>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import CodeIcon from 'material-ui/svg-icons/action/code'

import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { LIST_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH } from 'constants'
import defaultUserImage from 'static/User.png'
import classes from './Navbar.scss'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: {
    marginRight: '.5rem',
    width: '30px',
    height: '64px',
    padding: '0'
  }
}
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import Octicon from 'react-octicon'

const avatarSize = 50

export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render() {
    return (
      <AppBar
        title={<Link className="Navbar-Brand" to='/' style={{ color: 'white'}}>Prescott Prue</Link>}
        showMenuIconButton={false}
        iconElementRight={
          <div className="Navbar-Buttons">
            <IconButton tooltip="personal github">
              <a href="https://github.com/prescottprue">
                <CodeIcon color="white" />
              </a>
            </IconButton>
          </div>
        }
        className={classes.appBar}
      />
    )
  }
}

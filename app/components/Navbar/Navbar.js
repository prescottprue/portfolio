import React, { Component, PropTypes } from 'react'
import './Navbar.scss'
import { Link } from 'react-router'

//Components
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Octicon from 'react-octicon'

const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'top' }
const avatarSize = 50

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    account: PropTypes.object,
    onMenuClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  }

  selectItem = (e, item) => {
    if (item === 'logout' && this.props.onLogoutClick) {
      return this.props.onLogoutClick()
    }
    if (this.props.onMenuClick) {
      this.props.onMenuClick(item)
    }
  }

  render() {
    const rightMenu = (
      <div className="Navbar-Main-Menu">
        <a href="https://github.com/prescottprue">
          <Octicon mega name="mark-github" style={{color: 'white'}}/>
        </a>
      </div>
    )
    return (
      <AppBar
        title={<Link className="Navbar-Brand" to='/'>Prescott Prue</Link>}
        className="Navbar"
        showMenuIconButton={ false }
        iconElementRight={ rightMenu }
      />
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './Navbar.scss'

export default class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    account: PropTypes.object,
    onLogoutClick: PropTypes.func
  }

  render() {
    const brandLinkLoc = (this.props.account && this.props.account.username) ? '/cars' : '/'
    return (
      <div className="Navbar">
        <div className="Navbar-Brand">
          <Link to={ brandLinkLoc }>Prescott Prue</Link>
        </div>
      </div>
    )
  }
}

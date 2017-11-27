import React from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import CodeIcon from 'material-ui/svg-icons/action/code'
import classes from './Navbar.scss'

export const Navbar = () => (
  <AppBar
    title={
      <Link className="Navbar-Brand" to="/" style={{ color: 'white' }}>
        Prescott Prue
      </Link>
    }
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

export default Navbar

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/lib/paper'
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import IconButton from 'material-ui/lib/icon-button'
import MoreButton from 'react-material-icons/icons/navigation/more-horiz'
import './ProjectsTiles.scss'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%'
  },
  gridList: {
    // width: 100%,
    // height: 500,
    overflowY: 'auto',
    marginTop: 20
  }
}

export default class ProjectsTiles extends Component {
  constructor (props) {
    super(props)
    this.state =  { windowWidth: window.innerWidth }
  }

  static propTypes = {
    projects: PropTypes.array.isRequired,
    onClick: PropTypes.func
  };


  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    return (
      <div className='ProjectsTiles'>
        <GridList cellHeight={300} padding={30} cols={ (this.state && this.state.windowWidth) >= 767 ? 2 : 1 } style={styles.gridList}>
          {this.props.projects.map((project, i) => (
              <Paper className='ProjectTiles-Tile' zDepth={1} key={`Project-${i}`} style={{ height: '300px' }} onClick={ this.props.onClick }>
                <GridTile
                  title={ project.name }
                  subtitle={<span>{ project.intro }</span>}
                  actionIcon={
                    <Link to={`/projects/${project.key}`}>
                      <IconButton>
                        <MoreButton color={'white'} />
                      </IconButton>
                    </Link>
                  }
                >
                  <img className='ProjectTiles-Tile-Img' src={project.pictures[1].image.url} />
                </GridTile>
            </Paper>
          ))}
        </GridList>
      </div>
    );
  }
}

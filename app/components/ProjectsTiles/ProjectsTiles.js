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
  }

  static propTypes = {
    projects: PropTypes.array.isRequired
  };

  render (){
    return (
      <div className='ProjectsTiles'>
        <GridList cellHeight={300} padding={40} style={styles.gridList}>
          {this.props.projects.map((project, i) => (
            <Paper zDepth={1} key={`Project-${i}`} style={{ height: '300px' }}>
              <GridTile
                title={ project.name }
                subtitle={<span><b>{ project.intro }</b></span>}
                actionIcon={
                  <Link to={`/projects/${project.name.toLowerCase()}`}>
                    <IconButton>
                      <MoreButton color={'white'} />
                    </IconButton>
                  </Link>
                }
              >
                <img src={project.pictures[1].image.url} style={{maxWidth: '80%', marginLeft: '10%', height: '300px'}} />
              </GridTile>
            </Paper>

          ))}
        </GridList>
      </div>
    );
  }
}

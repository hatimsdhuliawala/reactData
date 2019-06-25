import React from 'react'
import { object, string, func } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import { appBarStyles } from 'react-praxis-components/SecondaryNav'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class VideoHeader extends React.Component {
  componentWillMount () {
    var currentTab = 'Upload'
    if (!this.props.permission.videoUpload) {
      currentTab = 'Upload'
    } else {
      switch (this.props.match.path) {
        case '/v2/video/upload': {
          currentTab = 'Upload'
          break
        }
        case '/v2/video/history': {
          currentTab = 'History'
          break
        }
        case '/v2/video/review': {
          currentTab = 'Review'
          break
        }
        default: {
          currentTab = 'Upload'
          break
        }
      }
    }
    this.setState({ currentTab: currentTab })
  }
  routeToPage = (value) => {
    this.setState({ currentTab: value })
    switch (value) {
      case 'Upload': {
        this.props.history.push('/v2/video/upload')
        break
      }
      case 'History': {
        this.props.history.push('/v2/video/history')
        break
      }
      case 'Review': {
        this.props.history.push('/v2/video/review')
        break
      }
      default: {
        break
      }
    }
  }

  handleChange = (event, value) => {
    this.routeToPage(value)
  }

  render () {
    const { classes, menuAction, permission } = this.props
    const { currentTab } = this.state
    return (
      <div className={classes.header}>
        <AppBar className={classes.appBar}>
          { menuAction && (
            <div className={classes.headerTab}>
              <IconButton onClick={menuAction} classes={{ root: classes.button }} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <div className={classes.marginLeftMedium}>
                <img alt="Primary" src="" />
              </div>
              <div className={classes.marginLeftMedium}>
                <Typography variant="h6" gutterBottom className={classes.whiteColor}>
                  Videos - {currentTab}
                </Typography>
              </div>
            </div>
          ) }
          <Toolbar className={classes.toolbarTab}>
            <Tabs value={this.state.currentTab} onChange={this.handleChange}>
              { permission.videoUpload && <Tab value="Upload" label="Upload" /> }
              { permission.videoUpload && <Tab value="History" label="Upload History" /> }
              { permission.videoReview && !_.includes(permission.hostName, 'vendorpipeline') && <Tab value="Review" label="Review" /> }
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

VideoHeader.displayName = 'VideoHeader'

VideoHeader.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
}

VideoHeader.defaultProps = {
  classes: {},
}

const styles = theme => ({
  header: {
    height: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 48,
    },
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  marginLeftMedium: {
    marginLeft: theme.spacing.unit * 2,
  },
  toolbarTab: {
    marginLeft: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * -1,
  },
  headerTab: {
    display: 'flex',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * -4,
  },
  appBar: {
    ...appBarStyles,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
  whiteColor: {
    color: 'white',
  },
})

export default withRouter(withStyles(styles)(VideoHeader))

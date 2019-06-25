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
class LongCopyHeader extends React.Component {
  componentWillMount () {
    var currentTab = 'Search & Manage'
    if (!this.props.permission.longCopy && this.props.permission.copy) {
      currentTab = 'Narrative Science'
    } else {
      switch (this.props.match.path) {
        case '/v2/longcopy': {
          currentTab = 'Search & Manage'
          break
        }
        case '/v2/bulk-upload': {
          currentTab = 'Bulk Upload'
          break
        }
        case '/v2/bulk-upload-history': {
          currentTab = 'Bulk Upload History'
          break
        }
        case '/v2/narrative-science': {
          currentTab = 'Narrative Science'
          break
        }
        case '/v2/SpecMismatch': {
          currentTab = 'Sync Product Specs'
          break
        }
        default: {
          currentTab = 'Search & Manage'
          break
        }
      }
    }
    this.setState({ currentTab: currentTab })
  }
  routeToPage = (value) => {
    this.setState({ currentTab: value })
    switch (value) {
      case 'Search & Manage': {
        this.props.history.push('/v2/longcopy')
        break
      }
      case 'Bulk Upload': {
        this.props.history.push('/v2/bulk-upload')
        break
      }
      case 'Bulk Upload History': {
        this.props.history.push('/v2/bulk-upload-history')
        break
      }
      case 'Narrative Science': {
        this.props.history.push('/v2/narrative-science')
        break
      }
      case 'Sync Product Specs': {
        this.props.history.push('/v2/SpecMismatch')
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
                  Copy & Bullets - {currentTab}
                </Typography>
              </div>
            </div>
          ) }
          <Toolbar className={classes.toolbarTab}>
            <Tabs value={this.state.currentTab} onChange={this.handleChange}>
              { permission.longCopy && <Tab value="Search & Manage" label="Search & Manage" /> }
              { permission.longCopy && <Tab value="Bulk Upload" label="Bulk Upload" /> }
              { permission.longCopy && <Tab value="Bulk Upload History" label="Bulk Upload History" /> }
              { permission.copy && <Tab value="Narrative Science" label="Narrative Science" /> }
              { (permission.specMismatch && !_.includes(permission.hostName, 'vendorpipeline')) && <Tab value="Sync Product Specs" label="Sync Product Specs" /> }
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

LongCopyHeader.displayName = 'LongCopyHeader'

LongCopyHeader.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
}

LongCopyHeader.defaultProps = {
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

export default withRouter(withStyles(styles)(LongCopyHeader))

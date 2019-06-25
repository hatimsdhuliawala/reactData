import React from 'react'
import { object, string, func } from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import { TabData } from './Components/DashboardData'
import { appBarStyles } from 'react-praxis-components/SecondaryNav'
import { bindActionCreators } from 'redux'
import Typography from '@material-ui/core/Typography'
import {
  changeCurrentIndex,
} from '../../store/dashboard/actionCreator'

class DashboardHeader extends React.Component {
  handleChange = (event, value) => {
    this.props.changeCurrentIndex(value)
  }

  render () {
    const { classes, menuAction } = this.props
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
                  Team Tools - {TabData[this.props.currentTabIndex].display}
                </Typography>
              </div>
            </div>
          ) }
          <Toolbar className={classes.toolbarTab}>
            <Tabs value={this.props.currentTabIndex} onChange={this.handleChange}>
              {TabData.map(item => (
                <Tab key={item.id} label={item.display} />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

DashboardHeader.displayName = 'DashboardHeader'

DashboardHeader.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
}

DashboardHeader.defaultProps = {
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
  appBar: {
    ...appBarStyles,
  },
  marginLeftMedium: {
    marginLeft: theme.spacing.unit * 2,
  },
  toolbarTab: {
    marginLeft: theme.spacing.unit * 9,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * -1,
  },
  headerTab: {
    display: 'flex',
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * -4,
  },
  whiteColor: {
    color: 'white',
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeCurrentIndex,
  }, dispatch)

const mapStateToProps = state => {
  const { dashboard } = state
  const { currentTabIndex } = dashboard
  return {
    currentTabIndex: currentTabIndex,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardHeader))

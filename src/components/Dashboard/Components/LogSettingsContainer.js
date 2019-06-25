import React from 'react'
import LogSettings from './LogSettings'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  Grid,
  Paper,
} from '@material-ui/core'

import {
  requestUpdateLog,
  setLogLevel,
  setLogServerUrl,
} from '../../../store/dashboard/settingsActionCreator'
class LogSettingsContainer extends React.Component {
  changeLogLevel = () => {
    var body = {
      configuredLevel: this.props.selectedLogLevel,
    }
    this.props.requestUpdateLog(this.props.selectedLogServerUrl, body)
  }
  setLogLevel = (event) => {
    this.props.setLogLevel(event.target.value)
  }
  setLogServerUrl = (event) => {
    this.props.setLogServerUrl(event.target.value)
  }
  render () {
    return (
      <Grid item
        className={this.props.classes.jobDataContainer}
        xs={12} container>
        <Grid item xs={6}>
          <Paper elevation={12}>
            <LogSettings
              changeLogLevel={this.changeLogLevel}
              setLogLevel={this.setLogLevel}
              setLogServerUrl={this.setLogServerUrl}
              selectedLogServerUrl={this.props.selectedLogServerUrl}
              selectedLogLevel={this.props.selectedLogLevel}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = state => {
  const {
    dashboard,
  } = state
  const {
    isFetching,
    displayMessage,
    isMessageShown,
    selectedLogServerUrl,
    selectedLogLevel,
  } = dashboard
  return {
    isFetching,
    displayMessage,
    isMessageShown,
    selectedLogServerUrl,
    selectedLogLevel,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestUpdateLog,
    setLogLevel,
    setLogServerUrl,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LogSettingsContainer))

import React from 'react'
import SystemHealth from './SystemHealth'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  LinearProgress,
} from '@material-ui/core'
import {
  hidedisplayMessageEvent,
} from '../../../store/dashboard/actionCreator'
class SystemHealthContainer extends React.Component {
  handleClose = () => {
    this.props.hidedisplayMessageEvent()
  };
  render () {
    return (
      <div>
        <br />
        <SystemHealth
          isMessageShown={this.props.isMessageShown}
          displayMessage={this.props.displayMessage}
          handleClose={this.handleClose}
        />
        {this.props.isFetching && <LinearProgress />}
      </div>
    )
  }
}
const mapStateToProps = state => {
  const {
    dashboard,
  } = state
  const {
    isFetching,
    event,
    status,
    displayMessage,
    isMessageShown,
    jobData,
    selectedTcin,
  } = dashboard
  return {
    isFetching,
    event,
    status,
    displayMessage,
    isMessageShown,
    jobData,
    selectedTcin,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hidedisplayMessageEvent,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SystemHealthContainer))

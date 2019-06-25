import React from 'react'
import JobData from './JobData'
import { connect } from 'react-redux'
import {
  LinearProgress,
  IconButton,
  Snackbar,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  hidedisplayMessageEvent,
  handleRetryEvent,
} from '../../../store/dashboard/actionCreator'
class JobDataContainer extends React.Component {
  handleClose = () => {
    this.props.hidedisplayMessageEvent()
  }
  handleRetry = (retryContext) => {
    this.props.handleRetryEvent(retryContext)
  }
  render () {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.isMessageShown}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.props.displayMessage}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={this.props.classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        {this.props.isFetching && <LinearProgress />}
        {!this.props.isFetching &&
          <JobData
            data={this.props.jobData}
            event={this.props.event}
            handleRetry={this.handleRetry}
            status={this.props.status} />
        }
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
  } = dashboard
  return {
    isFetching,
    event,
    status,
    displayMessage,
    isMessageShown,
    jobData,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hidedisplayMessageEvent,
    handleRetryEvent,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobDataContainer))

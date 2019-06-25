import React from 'react'
import FileStatus from './FileStatus'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  Grid,
  Paper,
} from '@material-ui/core'

import {
  requestFileStatus,
  toggleFileInfo,
} from '../../../store/dashboard/sysHealthActionCreator'

import {
  handleSelectedItems,
} from '../../../store/dashboard/itemDebuggerActionCreator'

import {
  changeCurrentIndex,
} from '../../../store/dashboard/actionCreator'

class FileStatusContainer extends React.Component {
  componentDidMount () {
    this.props.requestFileStatus()
  }
  toggleFileInfo = (item) => {
    if (item.length > 0 && item[0] !== undefined) {
      this.props.toggleFileInfo(true, item)
    } else {
      this.props.toggleFileInfo(false, [])
    }
  }
  onClickToggleFileInfo = (toggle) => {
    this.props.toggleFileInfo(toggle, this.props.fileNames)
  }
  handleSelectedItems = (tcin) => {
    this.props.handleSelectedItems([tcin])
    this.props.changeCurrentIndex(3)
  }
  render () {
    return (
      <div>
        <Grid item xs={12}>
          <Paper elevation={12}>
            <FileStatus
              fileStatus={this.props.fileStatus}
              fileInfoToggle={this.props.fileInfoToggle}
              fileNames={this.props.fileNames}
              toggleFileInfo={this.toggleFileInfo}
              onClickToggleFileInfo={this.onClickToggleFileInfo}
              handleSelectedItems={this.handleSelectedItems}
            />
          </Paper>
        </Grid>
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
    displayMessage,
    isMessageShown,
    fileStatus,
    fileInfoToggle,
    fileNames,
  } = dashboard
  return {
    isFetching,
    displayMessage,
    isMessageShown,
    fileStatus,
    fileInfoToggle,
    fileNames,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestFileStatus,
    toggleFileInfo,
    handleSelectedItems,
    changeCurrentIndex,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FileStatusContainer))

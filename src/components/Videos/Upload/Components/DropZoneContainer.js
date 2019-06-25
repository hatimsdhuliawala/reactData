import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DropZone from './DropZone'
import styles from '../theme'
import {
  dropZoneActive,
  onDropLoading,
  editVttDialogBox,
  helpVttDialogBox,
} from '../../../../store/videos/actionCreator'

class DropZoneContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  ondragenter = (fileType) => {
    var data = {
      video: false,
      closedCaption: false,
      posterFrame: false,
      transcript: false,
    }
    if (fileType === 'Video') {
      data = {
        video: true,
        closedCaption: false,
        posterFrame: false,
        transcript: false,
      }
    }
    if (fileType === 'Closed Caption') {
      data = {
        video: false,
        closedCaption: true,
        posterFrame: false,
        transcript: false,
      }
    }
    if (fileType === 'Transcript') {
      data = {
        video: false,
        closedCaption: false,
        posterFrame: false,
        transcript: true,
      }
    }
    if (fileType === 'Poster Frame') {
      data = {
        video: false,
        closedCaption: false,
        posterFrame: true,
        transcript: false,
      }
    }
    this.props.onDropLoading(true)
    this.props.dropZoneActive(data)
  }

  ondragleave = (files) => {
    var data = {
      video: false,
      closedCaption: false,
      posterFrame: false,
      transcript: false,
    }
    this.props.onDropLoading(false)
    this.props.dropZoneActive(data)
  }

  editVttDialogBoxEmpty = () => {
    this.props.editVttDialogBox(true)
  }

  openHelpVtt = () => {
    this.props.helpVttDialogBox(true)
  }

  render () {
    return (
      <React.Fragment>
        <DropZone
          onDrop={this.props.onDrop}
          ondragenter={this.ondragenter}
          ondragleave={this.ondragleave}
          dropZoneEnter={this.props.dropZoneEnter}
          isFetchingOnDrop={this.props.isFetchingOnDrop}
          fileType={this.props.fileType}
          requiredType={this.props.requiredType}
          uploadInProgress={this.props.uploadInProgress}
          editVttDialogBoxEmpty={this.editVttDialogBoxEmpty}
          vttHelpUrl={this.props.vttHelpUrl}
          openHelpVtt={this.openHelpVtt}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    dropZoneActive,
    onDropLoading,
    editVttDialogBox,
    helpVttDialogBox,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    videos,
    upload,
  } = state
  const {
    files,
    vttHelpUrl,
  } = videos
  const {
    uploadInProgress,
  } = upload
  return {
    auth,
    files,
    uploadInProgress,
    vttHelpUrl,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropZoneContainer))

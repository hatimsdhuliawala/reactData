import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Uploader from './Uploader'
import styles from '../theme'
import {
  cancelUpload,
} from '../../../store/upload/actionCreator'

class UploaderContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  uploadCancel = () => {
    this.props.cancelUpload()
  }
  render () {
    return (
      <React.Fragment>
        <Uploader
          uploadCancel={this.uploadCancel}
          uploadInProgress={this.props.uploadInProgress}
          uploadData={this.props.uploadData}
          totalFiles={this.props.totalFiles}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    cancelUpload,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    upload,
  } = state
  const {
    uploadInProgress,
    mockData,
    uploadData,
    totalFiles,
  } = upload
  return {
    auth,
    mockData,
    uploadData,
    uploadInProgress,
    totalFiles,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploaderContainer))

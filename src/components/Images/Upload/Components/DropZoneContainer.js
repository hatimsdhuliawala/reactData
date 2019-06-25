import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DropZone from './DropZone'
import styles from '../theme'
import {
  uploadStart,
  addFilesToQueue,
} from '../../../../store/upload/actionCreator'
import {
  dropZoneActive,
  addedFiles,
  validNumberFiles,
  onDropLoading,
} from '../../../../store/images/actionCreator'
import envConfigs from '../../../../config/apiConfig'
import _ from 'lodash'

class DropZoneContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      validFiles: [],
      invalidFiles: [],
      invalidFileError: false,
    }
  }

  componentDidMount () {
    var uploadFilesList = []
    this.props.addFilesToQueue(uploadFilesList)
    this.props.addedFiles(uploadFilesList)
  }

  onDrop = (files) => {
    if (!this.props.uploadInProgress) {
      var vm = this
      this.props.onDropLoading(true)
      var uploadFilesList = []
      _.each(files, function (value) {
        if (vm.checkImage(value)) {
          vm.state.validFiles.push(value)
          uploadFilesList.push({
            fileName: value.name,
            percent: 0,
          })
        } else {
          vm.state.invalidFiles.push(value)
        }
      })

      this.props.validNumberFiles(this.state.validFiles.length)
      if (this.state.invalidFiles.length) {
        vm.setState({ invalidFileError: true })
      }

      // Adding the already existed files in the uploaded Files
      _.each(this.props.files, function (value) {
        uploadFilesList.push(value)
      })
      this.props.addFilesToQueue(uploadFilesList)
      this.props.addedFiles(uploadFilesList)
      this.props.onDropLoading(false)
      this.props.dropZoneActive(false)
    }
  }

  checkImage = (file) => {
    var fileParts = file.name.split('.')

    if (file.name.match(/(\..*){2,}/) || fileParts > 2) {
      file.errorMessage = this.props.ERR_DOUBLEPERIOD
      return false
    }

    if (!envConfigs.imageStandards.filenameRegex.test(fileParts[0])) {
      file.errorMessage = this.props.ERR_FILENAME
      return false
    }

    // ensure file name follows TCIN_(position) pattern
    if (!envConfigs.imageStandards.allowedExtensionsRegex.test(fileParts[1])) {
      file.errorMessage = this.props.ERR_FILEFORMAT
      return false
    }

    // ensure file is at least 10b
    if (file.size <= envConfigs.imageStandards.minFileSize) {
      file.errorMessage = this.props.ERR_FILESIZESMALL
      return false
    }

    // ensure file is not larger than 100mb
    if (file.size >= envConfigs.imageStandards.maxFileSize) {
      file.errorMessage = this.props.ERR_FILESIZEBIG
      return false
    }

    if (this.state.validFiles.length && _.findIndex(this.state.validFiles, ['name', file.name]) !== -1) {
      file.errorMessage = this.props.ERR_FILEDUPLICATE
      return false
    }

    return true
  }

  ondragenter = (files) => {
    if (!this.props.uploadInProgress) {
      this.props.onDropLoading(true)
      this.props.dropZoneActive(true)
    }
  }

  ondragleave = (files) => {
    if (!this.props.uploadInProgress) {
      this.props.onDropLoading(false)
      this.props.dropZoneActive(false)
    }
  }

  removeInvalidFile = () => {
    this.setState({ invalidFiles: [], invalidFileError: false })
  }

  clearData = () => {
    if (!this.props.uploadInProgress) {
      this.setState({ validFiles: [] })
      this.props.validNumberFiles(0)
      this.props.addedFiles([])
    }
  }

  sendToTarget = () => {
    if (!this.props.uploadInProgress) {
      let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
      this.props.uploadStart(userId, this.state.validFiles, 'images')
    }
  }

  render () {
    return (
      <React.Fragment>
        <DropZone
          onDrop={this.onDrop}
          ondragenter={this.ondragenter}
          ondragleave={this.ondragleave}
          dropZoneEnter={this.props.dropZoneEnter}
          invalidFileError={this.state.invalidFileError}
          invalidFiles={this.state.invalidFiles}
          removeInvalidFile={this.removeInvalidFile}
          numberValidFiles={this.props.numberValidFiles}
          clearData={this.clearData}
          sendToTarget={this.sendToTarget}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    dropZoneActive,
    addedFiles,
    validNumberFiles,
    onDropLoading,
    uploadStart,
    addFilesToQueue,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    images,
    errorMessages,
    upload,
  } = state
  const {
    dropZoneEnter,
    files,
    numberValidFiles,
  } = images
  const {
    ERR_FILENAME,
    ERR_FILEFORMAT,
    ERR_FILESIZESMALL,
    ERR_FILESIZEBIG,
    ERR_FILEDUPLICATE,
    ERR_DOUBLEPERIOD,
  } = errorMessages
  const {
    uploadInProgress,
  } = upload
  return {
    auth,
    dropZoneEnter,
    files,
    numberValidFiles,
    ERR_FILENAME,
    ERR_FILEFORMAT,
    ERR_FILESIZESMALL,
    ERR_FILESIZEBIG,
    ERR_FILEDUPLICATE,
    ERR_DOUBLEPERIOD,
    uploadInProgress,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropZoneContainer))

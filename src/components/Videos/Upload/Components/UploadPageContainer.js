import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import UploadPage from './UploadPage'
import styles from '../theme'
import _ from 'lodash'
import { WebVTTParser } from '../../../Shared/VttParser/WebVttParser'
import {
  dropZoneActive,
  onDropLoading,
  updateTcinList,
  addVideoFiles,
  addCCFiles,
  addPosterFrameFiles,
  addTranscriptFiles,
  removeFiles,
  updateCCError,
  addedFilesVideo,
  setExternalGroupId,
  addDeleteAsset,
  addVideoGroupStatus,
  updateUploadSuccessfull,
  editVttDialogBox,
} from '../../../../store/videos/actionCreator'
import {
  uploadStart,
  addFilesToQueue,
} from '../../../../store/upload/actionCreator'
import { withRouter } from 'react-router-dom'

class UploadPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      video: [],
      closedCaption: [],
      posterFrame: [],
      transcript: [],
      validFiles: [],
    }
  }
  componentDidMount () {
    if (this.props.location.state) {
      var historyData = this.props.location.state.historyData
      var item = historyData.map_child_assets
      // reset external group staus
      this.props.addVideoGroupStatus(historyData.approval_status)
      // setting the delete array empty
      this.props.addDeleteAsset([])
      // setting the external group id
      this.props.setExternalGroupId(historyData.external_group_job_id)
      // check for item data
      if (item.video) {
        var videoData = {
          rejected: item.video[0].approval_status === 'Rejected',
        }
        Object.keys(item.video[0]).map(function (key, index) {
          videoData[key] = item.video[0][key]
        })
        this.state.video.push(videoData)
        this.props.addVideoFiles(true)
      }
      // If closed Caption is present
      if (item.closedcaption) {
        var ccData = {
          fileContents: '',
          rejected: item.closedcaption[0].approval_status === 'Rejected',
        }
        var xmlhttp
        /* eslint-disable */
        xmlhttp = new XMLHttpRequest()
          /* eslint-enable */
        xmlhttp.open('GET', item.closedcaption[0].asset_url, false)
        xmlhttp.send()
        ccData.fileContents = xmlhttp.responseText
        Object.keys(item.closedcaption[0]).map(function (key, index) {
          ccData[key] = item.closedcaption[0][key]
        })
        this.state.closedCaption.push(ccData)
        this.props.addCCFiles(true)
      }

      if (item.posterframe) {
        var posterFrameData = {
          rejected: item.posterframe[0].approval_status === 'Rejected',
        }
        Object.keys(item.posterframe[0]).map(function (key, index) {
          posterFrameData[key] = item.posterframe[0][key]
        })
        this.state.posterFrame.push(posterFrameData)
        this.props.addPosterFrameFiles(true)
      }
      if (item.transcript) {
        var transcriptData = {
          rejected: item.transcript[0].approval_status === 'Rejected',
        }
        Object.keys(item.transcript[0]).map(function (key, index) {
          transcriptData[key] = item.transcript[0][key]
        })
        this.state.transcript.push(transcriptData)
        this.props.addTranscriptFiles(true)
      }
    } else {
      this.props.setExternalGroupId(null)
      this.props.addDeleteAsset([])
      this.props.addVideoGroupStatus(null)
    }
    var uploadFilesList = []
    this.props.addFilesToQueue(uploadFilesList)
    this.props.addedFilesVideo(uploadFilesList)
    this.props.updateUploadSuccessfull(false)
  }

  handleVttFile = (result, file, uploadFilesList) => {
    var check = new WebVTTParser()
    var vttErrorList = check.parse(result)
    var fileErrorLineNumber = []
    if (vttErrorList.errors.length) {
      _.forEach(vttErrorList.errors, function (value) {
        fileErrorLineNumber.push(value.line)
      })
      this.props.updateCCError({
        fileName: file.name,
        fileContents: vttErrorList.vttText,
        errors: vttErrorList.errors,
        fileErrorLineNumber: fileErrorLineNumber,
      }, true)
    } else {
      let objectURL = URL.createObjectURL(file)
      file.blobUrl = objectURL
      file.fileContents = result
      file.assetType = 'closedcaption'
      this.state.closedCaption.push(file)
      this.state.validFiles.push(file)
      this.props.addCCFiles(true)
      uploadFilesList.push({
        fileName: file.name,
        percent: 0,
      })
      this.props.addFilesToQueue(uploadFilesList)
      this.props.addedFilesVideo(uploadFilesList)
      this.props.updateCCError({
        fileName: file.name,
        fileContents: this.createVttData(result),
        errors: '',
        fileErrorLineNumber: '',
      }, false)
    }
  }

  onDrop = (fileType, files) => {
    var vm = this
    var uploadFilesList = []
    _.each(this.props.uploadData, function (value) {
      uploadFilesList.push(value)
    })
    if (fileType === 'Video') {
      if (_.endsWith(files[0].name, '.mp4')) {
        uploadFilesList.push({
          fileName: files[0].name,
          percent: 0,
        })
        let objectURL = URL.createObjectURL(files[0])
        files[0].blobUrl = objectURL
        files[0].assetType = 'video'
        vm.state.video.push(files[0])
        vm.state.validFiles.push(files[0])
        vm.props.addVideoFiles(true)
        this.props.addFilesToQueue(uploadFilesList)
        this.props.addedFilesVideo(uploadFilesList)
      } else {
        window.alert('Video must be in MP4 format.')
      }
    }
    if (fileType === 'Closed Caption') {
      if (_.endsWith(files[0].name.toLowerCase(), '.vtt')) {
        /* eslint-disable */
        let reader = new FileReader()
        reader.onload = function (event) {
          let result = reader.result
          // check if common Bom exists and remove if so (for the UTF-8 BOM in ISO-8859-1)
          if (result.charCodeAt(0) === 0x00EF && result.charCodeAt(1) === 0x00BB && result.charCodeAt(2) === 0x00BF) {
            result = result.slice(3)
            files[0] = new File([result],files[0].name)
          }
          vm.handleVttFile(result, files[0], uploadFilesList)
        }
        reader.readAsBinaryString(files[0])
        /* eslint-enable */
      } else {
        window.alert('Closed captions must be in VTT format.')
      }
    }

    if (fileType === 'Poster Frame') {
      if (_.endsWith(files[0].name.toLowerCase(), '.jpg') || _.endsWith(files[0].name.toLowerCase(), '.jpeg')) {
        let objectURL = URL.createObjectURL(files[0])
        files[0].blobUrl = objectURL
        files[0].assetType = 'posterframe'
        vm.state.posterFrame.push(files[0])
        vm.state.validFiles.push(files[0])
        vm.props.addPosterFrameFiles(true)
        uploadFilesList.push({
          fileName: files[0].name,
          percent: 0,
        })
        this.props.addFilesToQueue(uploadFilesList)
        this.props.addedFilesVideo(uploadFilesList)
      } else {
        window.alert('Posterframe image must be in JPEG format.')
      }
    }
    if (fileType === 'Transcript') {
      if (_.endsWith(files[0].name.toLowerCase(), '.pdf')) {
        let objectURL = URL.createObjectURL(files[0])
        files[0].blobUrl = objectURL
        files[0].assetType = 'transcript'
        vm.state.transcript.push(files[0])
        vm.state.validFiles.push(files[0])
        vm.props.addTranscriptFiles(true)
        uploadFilesList.push({
          fileName: files[0].name,
          percent: 0,
        })
        this.props.addFilesToQueue(uploadFilesList)
        this.props.addedFilesVideo(uploadFilesList)
      } else {
        window.alert('Transcript must be in PDF format.')
      }
    }

    var data = {
      video: false,
      closedCaption: false,
      posterFrame: false,
      transcript: false,
    }

    this.props.dropZoneActive(data)
  }

  sendToTarget = () => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    let externalGroupJobId = this.props.externalGroupJobId === null ? null : this.props.externalGroupJobId
    let saveRequestBody = {
      type: 'Video',
      provided_tcin_sequences: [],
      title: this.props.uploadPageForm.values.tcinTitle,
      source: 'vendor',
      user_info: {
        email_id: userId,
        vendor_name: userId.split('@')[1].split('.')[0],
      },
      external_job_requests: [],
    }
    _.each(this.props.tcinList, function (tcin) {
      saveRequestBody.provided_tcin_sequences.push({
        tcin: tcin,
        sequence: '1',
      })
    })

    this.props.uploadStart(userId, this.state.validFiles, 'video', saveRequestBody, externalGroupJobId, this.props.deleteAsset)
  }

  removeFilesFromQueue = (file) => {
    var uploadFilesList = []
    _.each(this.props.uploadData, function (value) {
      if (value.fileName !== file.name) {
        uploadFilesList.push(value)
      }
    })
    this.props.addFilesToQueue(uploadFilesList)
    this.props.addedFilesVideo(uploadFilesList)

    var updatedValidFileList = []
    _.each(this.state.validFiles, function (values) {
      if (!_.isEqual(values, file)) {
        updatedValidFileList.push(values)
      }
    })
    this.setState({ validFiles: updatedValidFileList })
  }

  removeFile = (type) => {
    switch (type) {
      case 'Video':
        this.removeFilesFromQueue(this.state.video[0])
        this.setState({ video: [] })
        this.props.addVideoFiles(false)
        break
      case 'Closed Caption':
        this.removeFilesFromQueue(this.state.closedCaption[0])
        this.setState({ closedCaption: [] })
        this.props.addCCFiles(false)
        break
      case 'Transcript':
        this.removeFilesFromQueue(this.state.transcript[0])
        this.setState({ transcript: [] })
        this.props.addTranscriptFiles(false)
        break
      case 'Poster Frame':
        this.removeFilesFromQueue(this.state.posterFrame[0])
        this.setState({ posterFrame: [] })
        this.props.addPosterFrameFiles(false)
        break
      default:
    }
  }

  deleteAssetJob = (type, id) => {
    switch (type) {
      case 'Video':
        this.setState({ video: [] })
        this.props.addVideoFiles(false)
        break
      case 'Closed Caption':
        this.setState({ closedCaption: [] })
        this.props.addCCFiles(false)
        this.props.updateCCError(null, false)
        break
      case 'Transcript':
        this.setState({ transcript: [] })
        this.props.addTranscriptFiles(false)
        break
      case 'Poster Frame':
        this.setState({ posterFrame: [] })
        this.props.addPosterFrameFiles(false)
        break
      default:
    }
    var data = []
    this.props.deleteAsset.map(function (value) {
      data.push(value)
    })
    data.push(id)
    this.props.addDeleteAsset(data)
  }

  editVttDialogBox = () => {
    this.props.editVttDialogBox(true, this.props.errorCC.fileContents, this.props.errorCC.fileName)
    this.props.updateCCError(null, false)
    this.removeFilesFromQueue(this.state.closedCaption[0])
    this.setState({ closedCaption: [] })
    this.props.addCCFiles(false)
  }

  createVttData = (data) => {
    var NEWLINE = /\r\n|\r|\n/
    var lines = data.split(NEWLINE)
    return lines
  }
  render () {
    if (this.props.uploadComplete) {
      this.props.history.push('/v2/video/history')
    }
    return (
      <UploadPage
        isFetchingOnDrop={this.props.isFetchingOnDrop}
        dropZoneEnter={this.props.dropZoneEnter}
        onDrop={this.onDrop}
        posterFrame={this.state.posterFrame}
        transcript={this.state.transcript}
        closedCaption={this.state.closedCaption}
        video={this.state.video}
        removeFile={this.removeFile}
        tcinList={this.props.tcinList}
        addTcin={this.addTcin}
        deleteTcin={this.deleteTcin}
        uploadPageForm={this.props.uploadPageForm}
        videoFileAdded={this.props.videoFileAdded}
        ccFileAdded={this.props.ccFileAdded}
        posterFrameFileAdded={this.props.posterFrameFileAdded}
        transcriptFileAdded={this.props.transcriptFileAdded}
        errorCCDialog={this.props.errorCCDialog}
        sendToTarget={this.sendToTarget}
        editMode={this.props.editMode}
        videoGroupStatus={this.props.videoGroupStatus}
        deleteAssetJob={this.deleteAssetJob}
        editModeTitle={this.props.editModeTitle}
        vttEditBoxOpen={this.props.vttEditBoxOpen}
        editVttDialogBox={this.editVttDialogBox}
        vttHelpDialog={this.props.vttHelpDialog}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    onDropLoading,
    dropZoneActive,
    updateTcinList,
    addVideoFiles,
    addCCFiles,
    addPosterFrameFiles,
    addTranscriptFiles,
    removeFiles,
    updateCCError,
    uploadStart,
    addFilesToQueue,
    addedFilesVideo,
    setExternalGroupId,
    addDeleteAsset,
    addVideoGroupStatus,
    updateUploadSuccessfull,
    editVttDialogBox,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    videos,
    form,
    upload,
  } = state
  const {
    uploadPageForm,
  } = form
  const {
    uploadData,
  } = upload
  const {
    dropZoneEnter,
    isFetchingOnDrop,
    tcinList,
    videoFileAdded,
    ccFileAdded,
    posterFrameFileAdded,
    transcriptFileAdded,
    errorCCDialog,
    externalGroupJobId,
    deleteAsset,
    editMode,
    videoGroupStatus,
    uploadComplete,
    editModeTitle,
    vttEditBoxOpen,
    errorCC,
    vttHelpDialog,
  } = videos
  return {
    uploadPageForm,
    auth,
    isFetchingOnDrop,
    dropZoneEnter,
    tcinList,
    videoFileAdded,
    ccFileAdded,
    posterFrameFileAdded,
    transcriptFileAdded,
    errorCCDialog,
    uploadData,
    externalGroupJobId,
    deleteAsset,
    editMode,
    videoGroupStatus,
    uploadComplete,
    editModeTitle,
    vttEditBoxOpen,
    errorCC,
    vttHelpDialog,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(UploadPageContainer)))

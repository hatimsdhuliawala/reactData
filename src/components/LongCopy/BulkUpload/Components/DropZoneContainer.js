import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DropZone from './DropZone'
import styles from '../theme'
import {
  getBulkUploadData,
  dropZoneActive,
  wrongFileType,
} from '../../../../store/bulkUpload/actionCreator'
import _ from 'lodash'
import harbinger from 'harbinger'

class DropZoneContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  onDrop = (files) => {
    harbinger.trackEvent('knqx6m')
    if (files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && _.endsWith(files[0].name.toLowerCase(), '.xlsx')) {
      this.props.dropZoneActive(false)
      var requestBody = {
        files: files,
        processed_by: this.props.auth.email ? this.props.auth.email : this.props.auth.lanId,
      }
      this.props.getBulkUploadData(requestBody, files[0].name)
    } else {
      harbinger.trackEvent('nbyyhy', [{ key: 'Error', value: 'Not an excel file' }])
      var errorTitle = 'is not valid for bulk copy upload'
      var errorMessage = 'Please submit an excel document (.xlsx)'
      this.props.wrongFileType(files[0].name, errorTitle, errorMessage)
      this.props.dropZoneActive(false)
    }
  }

  ondragenter = (files) => {
    this.props.dropZoneActive(true)
  }

  ondragleave = (files) => {
    this.props.dropZoneActive(false)
  }

  render () {
    return (
      <DropZone
        onDrop={this.onDrop}
        ondragenter={this.ondragenter}
        ondragleave={this.ondragleave}
        dropZoneEnter={this.props.dropZoneEnter}
      />

    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getBulkUploadData,
    dropZoneActive,
    wrongFileType,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    bulkUpload,
  } = state
  const {
    dropZoneEnter,
  } = bulkUpload
  return {
    auth,
    dropZoneEnter,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropZoneContainer))

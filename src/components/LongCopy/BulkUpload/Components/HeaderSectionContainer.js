import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import HeaderSection from './HeaderSection'
import styles from '../theme'
import {
  clearUploadData,
  publishData,
} from '../../../../store/bulkUpload/actionCreator'

class HeaderSectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  clearData = () => {
    this.props.clearUploadData()
  }

  publishData = () => {
    var invalidFiles = []
    var validFiles = []
    this.props.selectedData.forEach((item) => {
      if (item.valid) {
        var data = {}
        data.tcin = item.tcin
        data.long_copy = item.longCopy
        data.feature_bullets = item.featureBullets
        validFiles.push(data)
      } else {
        invalidFiles.push(item)
      }
    })
    var requestBody = {
      data: validFiles,
      uploaded_by: this.props.auth.email ? this.props.auth.email : this.props.auth.lanId,
    }

    this.props.publishData(requestBody, invalidFiles)
  }
  render () {
    return (
      <HeaderSection
        clearData={this.clearData}
        uploadDataLength={this.props.uploadData.length}
        selectedDataLength={this.props.selectedData.length}
        publishData={this.publishData}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    clearUploadData,
    publishData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
    auth,
  } = state
  const {
    uploadData,
    selectedData,
  } = bulkUpload
  return {
    uploadData,
    selectedData,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderSectionContainer))

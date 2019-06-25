import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxDelete from './DialogBoxDelete'
import styles from '../theme'
import {
  deleteDataEvent,
  cancelDeleteEvent,
} from '../../../../store/bulkUpload/tableActionCreator'
import _ from 'lodash'

class DialogBoxDeleteContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleDelete = (event, data) => {
    let updateData = []
    let selectedData = []
    let defaultUploadData = []
    updateData = this.props.uploadData.map((item) => item)
    _.remove(updateData, function (item) {
      return _.isEqual(item, data)
    })
    selectedData = this.props.selectedData.map((item) => item)
    _.remove(selectedData, function (item) {
      return _.isEqual(item.tcin, data.tcin)
    })
    defaultUploadData = this.props.defaultUploadData.map((item) => item)
    _.remove(defaultUploadData, function (item) {
      return _.isEqual(item.tcin, data.tcin)
    })
    this.props.deleteDataEvent({ uploadData: updateData, selectedData: selectedData, defaultUploadData: defaultUploadData })
  }

  cancelDeleteConfirmation = (tcin) => {
    this.props.cancelDeleteEvent(tcin)
  }

  render () {
    return (
      <DialogBoxDelete
        data={this.props.data}
        handleDelete={this.handleDelete}
        cancelDeleteConfirmation={this.cancelDeleteConfirmation}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    deleteDataEvent,
    cancelDeleteEvent,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
  } = state
  const {
    uploadData,
    selectedData,
    defaultUploadData,
  } = bulkUpload
  return {
    uploadData,
    selectedData,
    defaultUploadData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxDeleteContainer))

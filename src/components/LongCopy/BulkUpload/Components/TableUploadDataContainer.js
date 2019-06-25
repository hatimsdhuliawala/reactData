import React from 'react'
import TableUploadData from './TableUploadData'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  handleSelectData,
  deleteDataEvent,
  revertBackFeatureBullets,
  revertBackLongCopy,
  handleDeleteConfirmation,
  updateSelectedFeatureBullets,
  updateSelectedLongCopy,
  checkProfanity,
} from '../../../../store/bulkUpload/tableActionCreator'

class TableUploadDataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleSelectAllClick = (event, checked) => {
    let newSelected = []
    if (checked) {
      newSelected = this.props.uploadData.map((item) => {
        var data = {}
        data.tcin = item.tcin
        data.longCopy = item.longCopy
        data.featureBullets = item.featureBullets
        return data
      })
    }
    this.props.handleSelectData({
      selectedData: newSelected,
    })
  };

  handleClick = (event, data) => {
    const { selectedData } = this.props
    var item = {}
    item.tcin = data.tcin
    item.longCopy = data.longCopy
    item.featureBullets = data.featureBullets
    const selectedIndex = this.indexOfObject(selectedData, item)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedData, data)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedData.slice(1))
    } else if (selectedIndex === selectedData.length - 1) {
      newSelected = newSelected.concat(selectedData.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1),
      )
    }
    var updatedNewSelected = newSelected.map(item => {
      var data = {}
      data.tcin = item.tcin
      data.longCopy = item.longCopy
      data.featureBullets = item.featureBullets
      return data
    })
    this.props.handleSelectData({
      selectedData: updatedNewSelected,
    })
  };

  indexOfObject = (selecteData, data) => {
    var ok
    for (var i = 0; i < selecteData.length; i++) {
      ok = true
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          if (selecteData[i][k] !== data[k]) {
            ok = false
            break
          }
        }
      }
      if (ok) return i
    }
    return -1 // no match
  };

  isSelected = item => {
    var data = {}
    data.tcin = item.tcin
    data.longCopy = item.longCopy
    data.featureBullets = item.featureBullets
    return this.indexOfObject(this.props.selectedData, data) !== -1
  }

  revertBackFeatureBullets = (tcin) => {
    var oldData = this.props.defaultUploadData.filter(data => data.tcin === tcin)
    var currentData = this.props.uploadData.filter(data => data.tcin === tcin)
    // this.props.revertBackFeatureBullets(tcin, oldData[0].featureBullets, oldData[0].valid)
    // this.props.updateSelectedFeatureBullets(tcin, oldData[0].featureBullets, oldData[0].valid)
    this.props.checkProfanity(tcin, currentData[0].longCopy, oldData[0].featureBullets, 'revertFeatureBullet')
  }

  revertBackLongCopy = (tcin) => {
    var oldData = this.props.defaultUploadData.filter(data => data.tcin === tcin)
    var currentData = this.props.uploadData.filter(data => data.tcin === tcin)
    // this.props.revertBackLongCopy(tcin, oldData[0].longCopy, oldData[0].valid)
    // this.props.updateSelectedLongCopy(tcin, oldData[0].longCopy, oldData[0].valid)
    this.props.checkProfanity(tcin, oldData[0].longCopy, currentData[0].featureBullets, 'revertLongCopy')
  }

  handleDeleteConfirmation = (tcin) => {
    this.props.handleDeleteConfirmation(tcin)
  }

  render () {
    const { uploadData, selectedData } = this.props
    return (
      <TableUploadData
        uploadData={uploadData}
        selected={selectedData}
        handleSelectAllClick={this.handleSelectAllClick}
        isSelected={this.isSelected}
        handleClick={this.handleClick}
        handleDelete={this.handleDelete}
        revertBackFeatureBullets={this.revertBackFeatureBullets}
        revertBackLongCopy={this.revertBackLongCopy}
        handleDeleteConfirmation={this.handleDeleteConfirmation}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handleSelectData,
    deleteDataEvent,
    revertBackFeatureBullets,
    revertBackLongCopy,
    handleDeleteConfirmation,
    updateSelectedFeatureBullets,
    updateSelectedLongCopy,
    checkProfanity,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
    auth,
    form,
  } = state
  const {
    bulkUploadData,
  } = form
  const {
    selectedData,
    uploadData,
    defaultUploadData,
  } = bulkUpload
  return {
    selectedData,
    uploadData,
    auth,
    bulkUploadData,
    defaultUploadData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableUploadDataContainer))

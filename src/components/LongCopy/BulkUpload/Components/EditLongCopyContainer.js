import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import EditLongCopy from './EditLongCopy'
import styles from '../theme'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateLongCopy,
  changeToEditStateLongCopy,
  updateSelectedLongCopy,
  checkProfanity,
} from '../../../../store/bulkUpload/tableActionCreator'

class EditLongCopyContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  updateLongCopy = (event, tcin) => {
    if (event.target.value === this.props.data.longCopy.replace(/(<br\s*\/?>)|(<BR\s*\/?>)|(<Br\s*\/?>)|(<bR\s*\/?>)/g, '\n').replace(/<\/?span[^>]*>/g, '')) {
      this.props.changeToEditStateLongCopy(tcin, false)
    } else {
      var longCopyString = ''
      longCopyString = event.target.value.replace(/(\n)/g, '<br />')
      this.props.checkProfanity(tcin, longCopyString, this.props.data.featureBullets, 'longCopy')
      this.props.updateSelectedLongCopy(tcin, longCopyString)
    }
  }

  convertLongCopy = (value) => {
    if (value !== null && value !== undefined) {
      let temp = value
      var res = temp.replace(/(<br\s*\/?>)|(<BR\s*\/?>)|(<Br\s*\/?>)|(<bR\s*\/?>)/g, '\n')
      return res
    }
    return value
  }
  convertLongCopyTextField = (value) => {
    if (value !== null && value !== undefined) {
      let temp = value
      var res = temp.replace(/(<br\s*\/?>)|(<BR\s*\/?>)|(<Br\s*\/?>)|(<bR\s*\/?>)/g, '\n').replace(/<\/?span[^>]*>/g, '')
      return res
    }
    return value
  }

  changeToEditState = (tcin) => {
    this.props.changeToEditStateLongCopy(tcin, true)
  }

  render () {
    return (
      <EditLongCopy
        tcin={this.props.data.tcin}
        updateLongCopy={this.updateLongCopy}
        longCopy={this.props.data.longCopy}
        isLongCopyEditable={this.props.data.isLongCopyEditable}
        changeToEditState={this.changeToEditState}
        convertLongCopy={this.convertLongCopy}
        convertLongCopyTextField={this.convertLongCopyTextField}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateLongCopy,
    changeToEditStateLongCopy,
    updateSelectedLongCopy,
    checkProfanity,
  }, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(styles)(EditLongCopyContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxVttError from './DialogBoxVttError'
import styles from '../theme'
import {
  updateCCError,
  editVttDialogBox,
} from '../../../../store/videos/actionCreator'
import _ from 'lodash'

class DialogBoxVttErrorContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleDismiss = () => {
    this.props.updateCCError(null, false)
  }

  handleDownloadReport = () => {
    var element = document.createElement('a')
    var fileContents = 'Error List\n----------'

    _.each(this.props.errorCC.errors, function (error) {
      fileContents += '\n'
      fileContents += 'Line ' + error.line + ': ' + error.message
    })

    fileContents += '\n\n\nVTT File Contents\n-----------------'
    _.each(this.props.errorCC.fileContents, function (lineContent, i) {
      fileContents += '\n'
      fileContents += '' + ++i + '  '
      fileContents += lineContent
    })

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents))
    element.setAttribute('download', 'VTT_Error_Summary')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  editVttDialogBox = () => {
    this.props.editVttDialogBox(true, this.props.errorCC.fileContents, this.props.errorCC.fileName)
    this.props.updateCCError(null, false)
  }

  render () {
    return (
      <DialogBoxVttError
        errorCC={this.props.errorCC.errors}
        fileContents={this.props.errorCC.fileContents}
        fileName={this.props.errorCC.fileName}
        fileErrorLineNumber={this.props.errorCC.fileErrorLineNumber}
        errorCCDialog={this.props.errorCCDialog}
        handleDismiss={this.handleDismiss}
        handleDownloadReport={this.handleDownloadReport}
        editVttDialogBox={this.editVttDialogBox}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCCError,
    editVttDialogBox,
  }, dispatch)

const mapStateToProps = state => {
  const {
    videos,
  } = state
  const {
    errorCC,
    errorCCDialog,
  } = videos
  return {
    errorCC,
    errorCCDialog,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxVttErrorContainer))

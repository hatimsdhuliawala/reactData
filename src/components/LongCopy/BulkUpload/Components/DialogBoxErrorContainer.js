import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxError from './DialogBoxError'
import styles from '../theme'
import {
  confirmWrongFile,
} from '../../../../store/bulkUpload/actionCreator'

class DialogBoxErrorContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  confirmWrongFile = () => {
    this.props.confirmWrongFile()
  }

  render () {
    const { fileName, dropZoneErrorMessage, dropZoneErrorTitle, validFile } = this.props
    return (
      <DialogBoxError
        fileName={fileName}
        dropZoneErrorMessage={dropZoneErrorMessage}
        dropZoneErrorTitle={dropZoneErrorTitle}
        confirmWrongFile={this.confirmWrongFile}
        validFile={validFile}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    confirmWrongFile,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
  } = state
  const {
    fileName,
    dropZoneErrorMessage,
    dropZoneErrorTitle,
    validFile,
  } = bulkUpload
  return {
    fileName,
    dropZoneErrorMessage,
    dropZoneErrorTitle,
    validFile,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxErrorContainer))

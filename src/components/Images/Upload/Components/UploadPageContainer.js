import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import UploadPage from './UploadPage'
import styles from '../theme'

class UploadPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return (
      <UploadPage
        files={this.props.files}
        numberValidFiles={this.props.numberValidFiles}
        isFetchingOnDrop={this.props.isFetchingOnDrop}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    images,
  } = state
  const {
    dropZoneEnter,
    files,
    isFetchingOnDrop,
    numberValidFiles,
  } = images
  return {
    auth,
    files,
    isFetchingOnDrop,
    numberValidFiles,
    dropZoneEnter,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadPageContainer))

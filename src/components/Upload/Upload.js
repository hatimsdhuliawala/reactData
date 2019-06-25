import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/UploadData'
import UploaderContainer from './Components/UploaderContainer'
import styles from './theme'

class Upload extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  render () {
    return (
      <React.Fragment>
        <UploaderContainer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {
    upload,
  } = state
  const {
    uploadData,
  } = upload
  return {
    uploadData,
  }
}
export default connect(mapStateToProps, null)(withStyles(styles)(Upload))

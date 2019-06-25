import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/UploadData'
import DropZoneContainer from './Components/DropZoneContainer'
import UploadedDataContainer from './Components/UploadedDataContainer'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Snackbar, IconButton, Grid } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  hideErrorEvent,
} from '../../../store/bulkUpload/actionCreator'

class BulkUpload extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  render () {
    const { uploadData, isFetching, isErrorMessageShown, errorMessage } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Bulk Upload" />
        <Helmet title="Bulk Upload" />
        {!uploadData.length > 0 && <Grid item xs={12}><DropZoneContainer /></Grid>}
        {uploadData.length > 0 && <UploadedDataContainer />}
        {isFetching &&
          <div>
            <CircularProgress className={this.props.classes.progressBar} />
          </div>
        }
        {isErrorMessageShown &&
          <div>
            <Snackbar
              open={isErrorMessageShown}
              onClose={() => this.handleErrorClose()}
              autoHideDuration={this.props.durationSnackBar}
              message={<span id="message-id">{errorMessage}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.handleErrorClose()}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hideErrorEvent,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
  } = state
  const {
    uploadData,
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  } = bulkUpload
  return {
    uploadData,
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BulkUpload))

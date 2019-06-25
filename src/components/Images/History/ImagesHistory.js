import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from '../Upload/Components/ImagesData'
import HistoryPageContainer from './Components/HistoryPageContainer'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  hideErrorEvent,
} from '../../../store/bulkUpload/actionCreator'

class ImageHistory extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  render () {
    const { isErrorMessageShown, errorMessage } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Image History" />
        <Helmet title="Image History" />
        <HistoryPageContainer />
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
    images,
  } = state
  const {
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  } = images
  return {
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImageHistory))

import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from '../Upload/Components/VideosData'
import HistoryPageContainer from './Components/HistoryPageContainer'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  hideErrorEvent,
} from '../../../store/videos/historyActionCreator'

class VideoHistory extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  render () {
    const { isErrorMessageShownVideo, errorMessage } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Video History" />
        <Helmet title="Video History" />
        <HistoryPageContainer />
        {isErrorMessageShownVideo &&
          <div>
            <Snackbar
              open={isErrorMessageShownVideo}
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
    videos,
  } = state
  const {
    isFetching,
    isErrorMessageShownVideo,
    errorMessage,
    durationSnackBar,
  } = videos
  return {
    isFetching,
    isErrorMessageShownVideo,
    errorMessage,
    durationSnackBar,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VideoHistory))

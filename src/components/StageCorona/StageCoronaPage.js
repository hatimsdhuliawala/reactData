import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/StageCoronaData'
import StageCoronaContainer from './Components/StageCoronaContainer'
import styles from './theme'
import HeaderTitle from '../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {
  hideErrorEventCorona,
} from '../../store/stageCorona/actionCreator'

class StageCoronaPage extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorCloseCorona = () => {
    this.props.hideErrorEventCorona()
  };
  render () {
    const { isErrorMessageShownCorona, coronaImageErrorMessage } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Send Image Data to Corona Stage" />
        <Helmet title="Send Image Data to Corona Stage" />
        {isErrorMessageShownCorona &&
          <div>
            <Snackbar
              open={isErrorMessageShownCorona}
              onClose={() => this.handleErrorCloseCorona()}
              autoHideDuration={this.props.durationSnackBarCorona}
              message={<span id="message-id">{coronaImageErrorMessage}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.handleErrorCloseCorona()}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </div>
        }
        <StageCoronaContainer />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hideErrorEventCorona,
  }, dispatch)

const mapStateToProps = state => {
  const {
    stageCorona,
  } = state
  const {
    imageDataCorona,
    coronaImageErrorMessage,
    isErrorMessageShownCorona,
    durationSnackBarCorona,
  } = stageCorona
  return {
    durationSnackBarCorona,
    imageDataCorona,
    coronaImageErrorMessage,
    isErrorMessageShownCorona,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StageCoronaPage))

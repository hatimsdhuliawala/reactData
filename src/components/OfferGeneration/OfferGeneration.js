import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/OfferGenerationData'
import OfferGenerationPageContainer from './Components/OfferGenerationPageContainer'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  hideErrorEventOfferGeneration,
} from '../../store/offerGeneration/actionCreator'

class OfferGeneration extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEventOfferGeneration()
  };
  render () {
    const { isErrorMessageShownOfferGeneration, errorMessageOfferGeneration, durationSnackBarOfferGeneration } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Offer Generator" />
        <Helmet title="Offer Generator" />
        <OfferGenerationPageContainer />
        {isErrorMessageShownOfferGeneration &&
          <div>
            <Snackbar
              open={isErrorMessageShownOfferGeneration}
              onClose={() => this.handleErrorClose()}
              autoHideDuration={durationSnackBarOfferGeneration}
              message={<span id="message-id">{errorMessageOfferGeneration}</span>}
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
    hideErrorEventOfferGeneration,
  }, dispatch)

const mapStateToProps = state => {
  const {
    offerGeneration,
  } = state
  const {
    isErrorMessageShownOfferGeneration,
    errorMessageOfferGeneration,
    durationSnackBarOfferGeneration,
  } = offerGeneration
  return {
    isErrorMessageShownOfferGeneration,
    errorMessageOfferGeneration,
    durationSnackBarOfferGeneration,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfferGeneration))

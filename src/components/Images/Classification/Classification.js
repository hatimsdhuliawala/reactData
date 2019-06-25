import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/ClassificationData'
import ClassificationPageContainer from './Components/ClassificationPageContainer'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  hideErrorEventClassification,
} from '../../../store/images/classification/actionCreator'

class Classification extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.hideErrorEventClassification()
  };
  render () {
    const { isErrorMessageShownClassification, errorMessageClassification, durationSnackBarClassification } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Classification" />
        <Helmet title="Classification" />
        <ClassificationPageContainer />
        {isErrorMessageShownClassification &&
          <div>
            <Snackbar
              open={isErrorMessageShownClassification}
              onClose={() => this.handleErrorClose()}
              autoHideDuration={durationSnackBarClassification}
              message={<span id="message-id">{errorMessageClassification}</span>}
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
    hideErrorEventClassification,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
  } = state
  const {
    isErrorMessageShownClassification,
    errorMessageClassification,
    durationSnackBarClassification,
  } = classification
  return {
    isErrorMessageShownClassification,
    errorMessageClassification,
    durationSnackBarClassification,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Classification))

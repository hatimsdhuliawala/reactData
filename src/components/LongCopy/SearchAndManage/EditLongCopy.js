import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import '../../../styles/longCopy.css'
import CopyDetailContainer from './Components/CopyDetailContainer'
import CloseIcon from '@material-ui/icons/Close'
import {
  Grid,
  CircularProgress,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import { DefaultState } from './Components/FilterData'
import styles from './theme'
import { withStyles } from '@material-ui/core/styles'
import {
  hideErrorEvent,
  viewCopyDetailEvent,
} from '../../../store/longCopy/actionCreator'

class EditLongCopy extends React.Component {
  constructor (props) {
    super(props)
    this.state = DefaultState
  }
  componentWillMount = () => {
    this.props.viewCopyDetailEvent(this.props.match.params.id)
  }
  onNewFilterClickHandler = () => {
    this.props.newFilterAction(true)
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  render () {
    return (
      <div>
        <HeaderTitle title="Long Copy" />
        <Helmet title="Edit Long Copy" />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Grid item xs={12} sm={12}>
              {this.props.isItemDataAvailable && this.props.isEditCopyDataAvailable &&
                <div> <CopyDetailContainer /> </div>
              }
              {(!this.props.isItemDataAvailable || !this.props.isEditCopyDataAvailable) &&
                <div className="center">
                  <CircularProgress />
                </div>
              }
            </Grid>
          </Grid>
        </Grid>
        {this.props.isErrorMessageShown &&
          <div>
            <Snackbar
              open={this.props.isErrorMessageShown}
              onClose={() => this.handleErrorClose()}
              autoHideDuration={this.props.durationSnackBar}
              message={<span id="message-id">{this.props.errorMessage}</span>}
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hideErrorEvent,
    viewCopyDetailEvent,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    isItemDataAvailable,
    isEditCopyDataAvailable,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  } = longCopy
  return {
    isItemDataAvailable,
    isEditCopyDataAvailable,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditLongCopy))

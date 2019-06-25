import React from 'react'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import TagTrainingPageContainer from './Components/TagTrainingPageContainer'
import { withStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  hideNotificationTraining,
} from '../../../store/images/tagTraining/actionCreator'

class TagTraining extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleErrorClose = () => {
    this.props.hideNotificationTraining()
  };

  render () {
    const { isNotificationMessageShownTraining, notificationMessageTraining, durationSnackBarTraining } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="TagTraining" />
        <Helmet title="TagTraining" />
        <TagTrainingPageContainer />
        {isNotificationMessageShownTraining &&
          <div>
            <Snackbar
              open={isNotificationMessageShownTraining}
              onClose={() => this.handleErrorClose()}
              autoHideDuration={durationSnackBarTraining}
              message={<span id="message-id">{notificationMessageTraining}</span>}
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
    hideNotificationTraining,
  }, dispatch)

const mapStateToProps = state => {
  const {
    tagTraining,
  } = state
  const {
    isNotificationMessageShownTraining,
    notificationMessageTraining,
    durationSnackBarTraining,
  } = tagTraining
  return {
    isNotificationMessageShownTraining,
    notificationMessageTraining,
    durationSnackBarTraining,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagTraining))

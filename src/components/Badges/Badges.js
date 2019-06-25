import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../Header/HeaderTitle'
import BadgesListContainer from './Components/BadgesListContainer'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/BadgesData'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styles from './theme'
import {
  handleBadgesErrorEvent,
} from '../../store/badges/actionCreator'

class Badges extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  handleErrorClose = () => {
    this.props.handleBadgesErrorEvent('')
  };
  render () {
    const { isErrorMessageShownBadge, errorMessage } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Badges" />
        <Helmet title="Badges" />
        <BadgesListContainer />
        {isErrorMessageShownBadge &&
          <div>
            <Snackbar
              open={isErrorMessageShownBadge}
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
    handleBadgesErrorEvent,
  }, dispatch)

const mapStateToProps = state => {
  const {
    badges,
  } = state
  const {
    isErrorMessageShownBadge,
    badgesList,
  } = badges
  return {
    isErrorMessageShownBadge,
    badgesList,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Badges))

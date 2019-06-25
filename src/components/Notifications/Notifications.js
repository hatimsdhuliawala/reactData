import React from 'react'
import { shape, bool, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Snackbar from '@material-ui/core/Snackbar'
import { showNotification } from '../../store/notification/actionCreator'

export class Notifications extends React.Component {
  static propTypes = {
    notificationActions: shape({
      showNotification: func,
    }),
    notificationIsShown: bool,
    notificationMessage: string,
  }

  constructor (props) {
    super(props)
    this.state = {
      message: undefined, // Store message in state so text doesn't disappear during animation
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.notificationMessage) {
      this.setState({
        message: nextProps.notificationMessage,
      })
    }
  }

  render () {
    const { notificationIsShown } = this.props
    const { message } = this.state
    return (
      <Snackbar
        open={notificationIsShown}
        message={message}
        onClose={this.handleRequestClose}
        autoHideDuration={4000}
      />
    )
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.props.showNotification(false)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showNotification }, dispatch)

const mapStateToProps = state => {
  const { notification } = state
  const { isShown, message } = notification
  return {
    notificationIsShown: isShown,
    notificationMessage: message,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)

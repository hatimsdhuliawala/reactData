import { declineSignIn, signIn } from '../../store/auth'
import PraxisAuthModal from 'react-praxis-components/AuthModal'
import { connect } from 'react-redux'
import React from 'react'

export class AuthModal extends React.Component {
  render () {
    return <PraxisAuthModal
      open={this.props.open}
      handleSignIn={this.props.signIn}
      handleRequestClose={this.props.declineSignIn}
    />
  }
}

const mapStateToProps = state => ({
  open: state.auth.authModalIsShown,
})

const mapDispatchToProps = {
  declineSignIn,
  signIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal)

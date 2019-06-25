import React from 'react'
import { shape, func } from 'prop-types'
import { Helmet } from 'react-helmet'
import HeaderTitle from '../Header/HeaderTitle'
import { signIn } from '../../store/auth'
import { connect } from 'react-redux'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import styles from './theme'
import { withStyles } from '@material-ui/core/styles'
import pipelineLogo from '../../images/pipelineLogo.png'
import { DefaultState } from './SignInPromptData'
import { openstateHandler } from '../../store/signInPrompt/actionCreator'

class SignInPrompt extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = DefaultState
  }
  static propTypes = {
    layoutActions: shape({
      setHeaderTitle: func,
    }),
  }

  componentDidMount () {
    this.props.openstateHandler(true)
  }

  render () {
    return (
      <div className={this.props.classes.singInBG}>
        <HeaderTitle title="Sign in Prompt" />
        <Helmet title="Sign In" />
        {/* <div style={{ textAlign: 'center' }}><span role="presentation" style={{ cursor: 'pointer ' }} onClick={this.props.signIn}>Sorry for the inconvenience, please click
          <span style={{ color: 'blue' }}> here </span>
        to log in again</span></div> */}
        <Dialog
          open={this.props.openState}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bolder' }}><img src={pipelineLogo} alt="Pipeline" style={{ width: '230px', height: '75px' }} /></span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{ textAlign: 'center' }}>
              <Button variant="raised"
                className={this.props.classes.signInButton}
                onClick={this.props.signIn} >
                SIGN IN
              </Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signIn,
  openstateHandler,
}
const mapStateToProps = state => {
  const {
    signInPrompt,
  } = state
  const {
    openState,
  } = signInPrompt
  return {
    openState,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInPrompt))

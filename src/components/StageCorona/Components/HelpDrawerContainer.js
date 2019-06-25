import React from 'react'
import HelpDrawer from './HelpDrawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  helpActionDrawer,
} from '../../../store/stageCorona/actionCreator'

class HelpDrawerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  helpActionDrawer = (isActionDrawerOpen) => {
    this.props.helpActionDrawer(isActionDrawerOpen)
  };
  closeEscapeKey = (event, keyPressed) => {
    if (event.keyCode === 27) {
      this.helpActionDrawer(false)
    }
  }

  render () {
    const { helpTextContainerOpen,
    } = this.props
    return (
      <HelpDrawer
        helpTextContainerOpen={helpTextContainerOpen}
        closeEscapeKey={this.closeEscapeKey}
        helpActionDrawer={this.helpActionDrawer}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    helpActionDrawer,
  }, dispatch)

const mapStateToProps = state => {
  const {
    stageCorona,
  } = state
  const {
    helpTextContainerOpen,
  } = stageCorona
  return {
    helpTextContainerOpen,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HelpDrawerContainer))

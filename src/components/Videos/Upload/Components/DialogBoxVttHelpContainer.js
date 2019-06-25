import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxVttHelp from './DialogBoxVttHelp'
import styles from '../theme'
import {
  helpVttDialogBox,
} from '../../../../store/videos/actionCreator'

class DialogBoxVttHelpContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  closeHelpVtt = () => {
    this.props.helpVttDialogBox(false)
  }

  render () {
    const { vttHelpUrl, vttHelpDialog } = this.props
    return (
      <DialogBoxVttHelp
        closeHelpVtt={this.closeHelpVtt}
        vttHelpUrl={vttHelpUrl}
        vttHelpDialog={vttHelpDialog}
        classes={this.props.classes}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    helpVttDialogBox,
  }, dispatch)

const mapStateToProps = state => {
  const {
    videos,
  } = state
  const {
    vttHelpUrl,
    vttHelpDialog,
  } = videos
  return {
    vttHelpUrl,
    vttHelpDialog,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxVttHelpContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxEditVtt from './DialogBoxEditVtt'
import styles from '../theme'
import {
  editVttDialogBox,
  vttErrorHandler,
} from '../../../../store/videos/actionCreator'
import _ from 'lodash'

class DialogBoxEditVttContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  closeEditVtt = () => {
    this.props.editVttDialogBox(false)
  }

  onSave = () => {
    if (_.endsWith(this.props.editVtt.values.vttTitle.trim().toLowerCase(), '.vtt')) {
      /* eslint-disable */
      var files = []
      files[0] = new File([this.props.editVtt.values.vttData], this.props.editVtt.values.vttTitle.trim())
      /* eslint-enable */
      this.props.onDrop('Closed Caption', files)
      this.props.editVttDialogBox(false)
    } else {
      this.props.vttErrorHandler('Enter a extension (.vtt) after the filename')
    }
  }
  render () {
    const { vttEditBoxOpen, vttEditData, vttEditBoxTitle } = this.props
    return (
      <DialogBoxEditVtt
        closeEditVtt={this.closeEditVtt}
        vttEditBoxOpen={vttEditBoxOpen}
        vttEditData={vttEditData}
        vttEditBoxTitle={vttEditBoxTitle}
        onSave={this.onSave}
        editVtt={this.props.editVtt}
        classes={this.props.classes}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    editVttDialogBox,
    vttErrorHandler,
  }, dispatch)

const mapStateToProps = state => {
  const {
    videos,
    form,
  } = state
  const {
    editVtt,
  } = form
  const {
    vttEditBoxOpen,
    vttEditData,
    vttEditBoxTitle,
  } = videos
  return {
    vttEditBoxOpen,
    vttEditData,
    vttEditBoxTitle,
    editVtt,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxEditVttContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxQuickPublish from './DialogBoxQuickPublish'
import styles from '../theme'
import {
  quickEditPublishDataEvent,
  cancelQuickPublish,
} from '../../../../store/longCopy/actionCreator'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class DialogBoxQuickPublishContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  quickEditPublishEventHandler = () => {
    var data = this.props.editCopy.values.featureBullet.replace('Highlights / Features \n\n', '').split('\n')
    var removeEmpty = data.filter(function (word) { return word !== '' })
    var newArray = removeEmpty.map(item => { return _.trim(item, '• ') })
    var requestBody = {
      long_copy: this.props.editCopy.values.longCopy.replace(/(\n)/g, '<br />'),
      feature_bullets: newArray,
      version: this.props.selectedCopyData.current_copy ? this.props.selectedCopyData.current_copy.version ? this.props.selectedCopyData.current_copy.version + 1 : 1 : 1,
      created_by: this.props.auth.email ? this.props.auth.email : this.props.auth.lanId,
    }
    _.remove(requestBody.feature_bullets, function (bullets) {
      bullets.trim()
      return bullets.length === 0
    })
    this.props.quickEditPublishDataEvent(this.props.selectedCopyData.id, requestBody)
    this.props.history.push('/v2/longcopy')
  }

  cancelQuickPublish = () => {
    this.props.cancelQuickPublish()
  }

  render () {
    const { quickEditConfirm } = this.props
    return (
      <DialogBoxQuickPublish
        quickEditConfirm={quickEditConfirm}
        quickEditPublishEventHandler={this.quickEditPublishEventHandler}
        cancelQuickPublish={this.cancelQuickPublish}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    quickEditPublishDataEvent,
    cancelQuickPublish,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    form,
    auth,
  } = state
  const {
    editCopy,
  } = form
  const {
    quickEditConfirm,
    selectedCopyData,
  } = longCopy
  return {
    quickEditConfirm,
    selectedCopyData,
    editCopy,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(DialogBoxQuickPublishContainer)))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import {
  draftDataEvent,
  draftDataEventNoSnacbar,
  firstDraftDataEvent,
  viewCopyDetailEvent,
  saveDataEvent,
  publishDataEvent,
  enterEvent,
  deleteBulletAndCopy,
  quickEditPublishConfirm,
} from '../../../../store/longCopy/actionCreator'
import {
  editFeatureBulletState,
  updateFeatureBullets,
  updatelongCopy,
  changeHistoryIndex,
  changeTabEdit,
} from '../../../../store/longCopy/editLongCopyActionCreator'
import EditCopy from './EditCopy'
import { CopyWritingStatus } from './FilterData'
import _ from 'lodash'
import harbinger from 'harbinger'
class EditCopyContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      featureEdit: '',
      firstDraft: true,
    }
  }
  componentDidMount () {
    this.props.enterEvent(this.props.selectedCopyData.current_event.event_type)
    this.props.changeHistoryIndex(0)
    this.props.changeTabEdit(0)
    if (this.props.selectedCopyData.current_event.event_type === 'NewWriteRequest' || this.props.selectedCopyData.current_event.event_type === 'WritingStarted') {
      harbinger.trackEvent('m8z70k', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.selectedCopyData.current_event.event_type }])
    }
    if (this.props.selectedCopyData.current_event.event_type === 'ReadyForQA') {
      harbinger.trackEvent('twpgq7', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.selectedCopyData.current_event.event_type }])
    }

    // autofocus the Copy on mount
  }
  draftDataEventHandler = () => {
    if (this.props.enteredEvent === 'NewWriteRequest' || this.props.enteredEvent === 'WritingStarted') {
      harbinger.trackEvent('j8wxam', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.enteredEvent }, { key: 'ButtonClicked', value: 'Save and Finish Later' }])
    }
    var data = this.props.editCopy.values.featureBullet.replace('Highlights / Features \n\n', '').split('\n')
    var removeEmpty = data.filter(function (word) { return word !== '' })
    var newArray = removeEmpty.map(item => { return _.trim(item, '• ') })
    var requestBody = {
      long_copy: this.props.editCopy.values.longCopy.replace(/(\n)/g, '<br />'),
      feature_bullets: newArray,
      version: this.props.selectedCopyData.current_copy ? this.props.selectedCopyData.current_copy.version ? this.props.selectedCopyData.current_copy.version : 0 : 0,
      created_by: this.props.auth.email ? this.props.auth.email : this.props.auth.lanId,
    }
    _.remove(requestBody.feature_bullets, function (bullets) {
      bullets.trim()
      return bullets.length === 0
    })
    this.props.draftDataEvent(this.props.selectedCopyData.id, requestBody)
    this.props.history.push('/v2/longcopy')
  }

  saveDataEventHandler = () => {
    if (this.props.enteredEvent === 'NewWriteRequest' || this.props.enteredEvent === 'WritingStarted') {
      harbinger.trackEvent('j8wxam', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.enteredEvent }, { key: 'ButtonClicked', value: 'Save and Ready for QA' }])
    }
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
    // this.props.draftDataEventNoSnacbar(this.props.selectedCopyData.id, requestBody)
    this.props.saveDataEvent(this.props.selectedCopyData.id, requestBody).then(
      this.props.history.push('/v2/longcopy')
    )
  }

  publishEventHandler = () => {
    if (this.props.enteredEvent === 'ReadyForQA') {
      harbinger.trackEvent('kv07g3', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.enteredEvent }, { key: 'ButtonClicked', value: 'Publish' }])
    }
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
    this.props.publishDataEvent(this.props.selectedCopyData.id, requestBody)
    this.props.history.push('/v2/longcopy')
  }

  changeFirstDraft = () => {
    this.setState({ firstDraft: false })
    var data = this.props.editCopy.initial.featureBullet.replace('Highlights / Features \n\n', '').split('\n')
    var removeEmpty = data.filter(function (word) { return word !== '' })
    var newArray = removeEmpty.map(item => { return _.trim(item, '• ') })
    var requestBody = {
      long_copy: this.props.editCopy.initial.longCopy.replace(/(\n)/g, '<br />'),
      feature_bullets: newArray,
      version: this.props.selectedCopyData.current_copy ? this.props.selectedCopyData.current_copy.version ? this.props.selectedCopyData.current_copy.version : 0 : 0,
      created_by: this.props.auth.email ? this.props.auth.email : this.props.auth.lanId,
    }
    _.remove(requestBody.feature_bullets, function (bullets) {
      bullets.trim()
      return bullets.length === 0
    })

    this.props.firstDraftDataEvent(this.props.selectedCopyData.id, requestBody)
  }

  setBackgroundStatus = (status) => {
    let tcinColor = CopyWritingStatus.filter(item => item.value === status)
    return { backgroundColor: tcinColor[0].color, padding: '10px 20px' }
  }

  convertStatusDisplay = (status) => {
    let statusName = CopyWritingStatus.filter(item => item.value === status)
    return statusName[0].display
  }

  getFeatureBulletWordCount = () => {
    if (this.props.editCopy) {
      let bullets = this.props.editCopy.values.featureBullet
      var data = bullets.replace('Highlights / Features \n\n', '')
      if (data.length) {
        return data.replace(/[^_0-9a-zA-Z]/g, ' ').trim().split(/\s+/).length
      }
      return 0
    }
  }

  getLongCopyWordCount = () => {
    if (this.props.editCopy) {
      let longCopyString = this.props.editCopy.values.longCopy
      if (longCopyString.length) {
        return longCopyString.replace(/[^_0-9a-zA-Z]/g, ' ').trim().split(/\s+/).length
      }
      return 0
    }
  }
  getTotalFeatureBullet = () => {
    if (this.props.editCopy) {
      let bullets = this.props.editCopy.values.featureBullet
      var data = bullets.replace('Highlights / Features \n\n', '').split('\n')
      var newArray = data.filter(function (word) { return word !== '' })
      return newArray.length
    }
  }

  editFeatureBulletState = (event, value) => {
    if (event === 'NewWriteRequest' || event === 'WritingStarted' || event === 'ReadyForQA') {
      this.props.editFeatureBulletState(value)
    }
    if (this.props.auth.permission.instantEditLongCopy && event === 'Done') {
      this.props.editFeatureBulletState(value)
    }
  }

  updateFeatureBullets = (value) => {
    var data = this.props.editCopy.values.featureBullet.replace('\n\n', '\n').split('\n')
    var newArray = data.filter(function (word) { return word !== '' })
    this.props.updateFeatureBullets(newArray)
    this.props.editFeatureBulletState(value)
  }

  backTolist = () => {
    if (this.props.enteredEvent === 'NewWriteRequest' || this.props.enteredEvent === 'WritingStarted') {
      harbinger.trackEvent('9j9m0v', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.enteredEvent }])
    }
    if (this.props.enteredEvent === 'ReadyForQA') {
      harbinger.trackEvent('g72g9j', [{ key: 'tcin', value: this.props.selectedCopyData.tcin.toString() }, { key: 'state', value: this.props.enteredEvent }])
    }
  }
  deleteBulletAndCopy = () => {
    this.props.deleteBulletAndCopy([this.props.selectedCopyData.tcin], true, true)
  };
  render () {
    if (this.props.deleteData.suceesfullDeleted) {
      this.props.history.push('/v2/longCopy')
    }
    return (
      <EditCopy
        classes={this.props.classes}
        editCopy={this.props.editCopy}
        selectedCopyData={this.props.selectedCopyData}
        selectedItemData={this.props.selectedItemData}
        draftDataEventHandler={this.draftDataEventHandler}
        saveDataEventHandler={this.saveDataEventHandler}
        publishEventHandler={this.publishEventHandler}
        quickEditPublishEventHandler={this.quickEditPublishEventHandler}
        firstDraft={this.state.firstDraft}
        changeFirstDraft={this.changeFirstDraft}
        setBackgroundStatus={this.setBackgroundStatus}
        convertStatusDisplay={this.convertStatusDisplay}
        getFeatureBulletWordCount={this.getFeatureBulletWordCount}
        getLongCopyWordCount={this.getLongCopyWordCount}
        getTotalFeatureBullet={this.getTotalFeatureBullet}
        editCopyData={this.props.editCopyData}
        editFeatureBulletState={this.editFeatureBulletState}
        updateFeatureBullets={this.updateFeatureBullets}
        backTolist={this.backTolist}
        deleteBulletAndCopy={this.deleteBulletAndCopy}
        permission={this.props.auth.permission}
        quickEditPublishConfirm={this.props.quickEditPublishConfirm} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    draftDataEvent,
    draftDataEventNoSnacbar,
    firstDraftDataEvent,
    viewCopyDetailEvent,
    saveDataEvent,
    publishDataEvent,
    updateFeatureBullets,
    updatelongCopy,
    editFeatureBulletState,
    enterEvent,
    deleteBulletAndCopy,
    quickEditPublishConfirm,
    changeHistoryIndex,
    changeTabEdit,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
    form,
  } = state
  const {
    editCopy,
  } = form
  const {
    selectedCopyData,
    editCopyData,
    selectedItemData,
    enteredEvent,
    deleteData,
  } = longCopy
  return {
    editCopyData,
    selectedCopyData,
    selectedItemData,
    auth,
    enteredEvent,
    editCopy,
    deleteData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(EditCopyContainer)))

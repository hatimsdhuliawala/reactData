import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import StageCorona from './StageCorona'
import styles from '../theme'
import {
  publishToCorona,
  helpActionDrawer,
  resetForm,
  publishData,
  previewData,
  removeItem,
} from '../../../store/stageCorona/actionCreator'
import { splitTcins } from '../../Shared/TcinSeperator/TcinSeperator'

class StageCoronaContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  helpActionDrawer = () => {
    this.props.helpActionDrawer(true)
  }

  resetData = () => {
    this.props.resetForm()
  }

  publishData = () => {
    var tcinList = []
    this.props.imageDataCorona.map(item => {
      tcinList.push(item.tcin)
    })
    this.props.publishData(tcinList)
  }
  previewData = () => {
    var data = []
    splitTcins(this.props.stageCoronaForm.values.stageTcinList).forEach(i => {
      data.push(i)
    })
    this.props.previewData(data)
  }

  removeItem = (tcin) => {
    var data = []
    this.props.imageDataCorona.map(item => {
      if (item.tcin !== tcin) {
        data.push(item)
      }
    })
    this.props.removeItem(data)
  }
  render () {
    return (
      <React.Fragment>
        <StageCorona
          helpActionDrawer={this.helpActionDrawer}
          stageCoronaForm={this.props.stageCoronaForm}
          resetData={this.resetData}
          imageDataCorona={this.props.imageDataCorona}
          publishData={this.publishData}
          previewData={this.previewData}
          isFetchingCorona={this.props.isFetchingCorona}
          removeItem={this.removeItem}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    publishToCorona,
    helpActionDrawer,
    resetForm,
    publishData,
    previewData,
    removeItem,
  }, dispatch)

const mapStateToProps = state => {
  const {
    stageCorona,
    form,
  } = state
  const {
    stageCoronaForm,
  } = form
  const {
    imageDataCorona,
    isFetchingCorona,
  } = stageCorona
  return {
    imageDataCorona,
    stageCoronaForm,
    isFetchingCorona,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StageCoronaContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  newFilterAction,
} from '../../../../store/longCopy/actionCreator'
import {
  changeHistoryIndex,
} from '../../../../store/longCopy/editLongCopyActionCreator'
import CopyHistory from './CopyHistory'
class CopyHistoryContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  changeHistoryIndex = (historyIndex) => {
    this.props.changeHistoryIndex(historyIndex)
  }
  render () {
    const { historyIndex } = this.props
    return (
      <CopyHistory
        copyHistory={this.props.selectedCopyData.copy_history}
        historyIndex={historyIndex}
        changeHistoryIndex={this.changeHistoryIndex}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    newFilterAction,
    changeHistoryIndex,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    selectedCopyData,
    historyIndex,
  } = longCopy
  return {
    selectedCopyData,
    historyIndex,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CopyHistoryContainer))

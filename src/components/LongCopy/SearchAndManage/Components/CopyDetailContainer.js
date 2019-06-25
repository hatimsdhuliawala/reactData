import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CopyDetailLayout from './CopyDetailLayout'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  changeTabEdit,
} from '../../../../store/longCopy/editLongCopyActionCreator'
class CopyDetailContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleTabChange = (event, currentTabIndex) => {
    this.props.changeTabEdit(currentTabIndex)
  };

  render () {
    return (
      <CopyDetailLayout
        historyIndex={this.props.historyIndex}
        handleTabChange={this.handleTabChange}
        currentTabIndex={this.props.currentTabIndex} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeTabEdit,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    historyIndex,
    currentTabIndex,
  } = longCopy
  return {
    historyIndex,
    currentTabIndex,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CopyDetailContainer))

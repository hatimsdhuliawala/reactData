import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxDeleteSelection from './DialogBoxDeleteSelection'
import styles from '../theme'
import {
  selectTypeCopyBulletDelete,
  cancelCopyBulletDelete,
  handleValueDeleteOption,
} from '../../../../store/longCopy/actionCreator'

class DialogBoxDeleteSelectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  selectTypeCopyBulletDelete = () => {
    this.props.selectTypeCopyBulletDelete(true, this.props.deleteData.selectDeleteType, false)
  }

  cancelCopyBulletDelete = () => {
    this.props.cancelCopyBulletDelete()
  }

  handleValueDeleteOption = (event) => {
    this.props.handleValueDeleteOption(event.target.value)
  }

  render () {
    const { deleteData } = this.props
    return (
      <DialogBoxDeleteSelection
        deleteData={deleteData}
        cancelCopyBulletDelete={this.cancelCopyBulletDelete}
        handleValueDeleteOption={this.handleValueDeleteOption}
        selectTypeCopyBulletDelete={this.selectTypeCopyBulletDelete}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectTypeCopyBulletDelete,
    cancelCopyBulletDelete,
    handleValueDeleteOption,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    deleteData,
  } = longCopy
  return {
    deleteData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxDeleteSelectionContainer))

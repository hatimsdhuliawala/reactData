import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import DialogBoxConfirmDelete from './DialogBoxConfirmDelete'
import styles from '../theme'
import {
  cancelCopyBulletDelete,
  confirmDeleteSelection,
} from '../../../../store/longCopy/actionCreator'

class DialogBoxConfirmDeleteContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  cancelCopyBulletDelete = () => {
    this.props.cancelCopyBulletDelete()
  }

  confirmDeleteSelection = () => {
    let user = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.confirmDeleteSelection(this.props.deleteData, user)
  }

  render () {
    const { deleteData } = this.props
    return (
      <DialogBoxConfirmDelete
        deleteData={deleteData}
        cancelCopyBulletDelete={this.cancelCopyBulletDelete}
        confirmDeleteSelection={this.confirmDeleteSelection}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    cancelCopyBulletDelete,
    confirmDeleteSelection,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    deleteData,
  } = longCopy
  return {
    deleteData,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogBoxConfirmDeleteContainer))

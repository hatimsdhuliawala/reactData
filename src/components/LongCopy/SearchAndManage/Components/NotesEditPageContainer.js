import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  setPlannerNotesEditPageEvent,
} from '../../../../store/longCopy/actionCreator'
import NotesEditPage from './NotesEditPage'

class NotesEditPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handlePlannerNotesEvent = () => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.setPlannerNotesEditPageEvent(
      this.props.itemDetail.values.notes,
      this.props.selectedCopyData.id,
      userId,
    )
  }

  render () {
    return (
      <NotesEditPage
        user={this.props.auth}
        plannerNotes={this.props.plannerNotes}
        handlePlannerNotesEvent={this.handlePlannerNotesEvent}
        itemDetail={this.props.itemDetail} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    setPlannerNotesEditPageEvent,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
    form,
  } = state
  const {
    itemDetail,
  } = form
  const {
    selectedCopyData,
    plannerNotes,
  } = longCopy
  return {
    plannerNotes,
    selectedCopyData,
    auth,
    itemDetail,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotesEditPageContainer))

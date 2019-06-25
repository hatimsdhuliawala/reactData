import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SaveFilter from './SaveFilter'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  newFilterAction,
  toggleSaveFilterDialogue,
  saveFilterDataEvent,
  fetchSavedFiltersEvent,
} from '../../../../store/longCopy/actionCreator'
class SaveFilterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  handleClose = () => {
    this.props.toggleSaveFilterDialogue(false)
  }
  handleSave = () => {
    this.props.saveFilterDataEvent({
      created_by: this.props.auth.email,
      filter_criteria: JSON.stringify(this.props.selectedFilters),
      filter_name: this.props.saveFilter.values.saveFilter,
      host_name: 'UI',
      user_id: this.props.auth.email,
    })
  }
  render () {
    return (
      <SaveFilter
        isSaveFilterOpen={this.props.isSaveFilterOpen}
        handleClose={this.handleClose}
        handleSave={this.handleSave}
        saveFilter={this.props.saveFilter}
      />
    )
  }
}

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
    form,
  } = state
  const {
    saveFilter,
  } = form
  const {
    isSaveFilterOpen,
    savedFilterName,
    selectedFilters,
  } = longCopy
  return {
    auth,
    isSaveFilterOpen,
    savedFilterName,
    selectedFilters,
    saveFilter,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    newFilterAction,
    toggleSaveFilterDialogue,
    saveFilterDataEvent,
    fetchSavedFiltersEvent,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaveFilterContainer))

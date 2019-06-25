import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MyFilter from './MyFilter'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  newFilterAction,
  fetchSavedFiltersEvent,
  loadExistingFilter,
  requestCopyData,
  removeSavedFilter,
  toggleConfirmation,
  updateFilterSelectedSticker,
  clearSelectedSticker,
  buildFilterExpand,
} from '../../../../store/longCopy/actionCreator'
class MyFilterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    this.props.fetchSavedFiltersEvent(this.props.auth.email)
  }
  addNewFilter () { }
  removeSavedFilterHandler = (item) => {
    this.props.toggleConfirmation(true, { id: item.id })
  }
  handleCancelConfirmation = () => {
    this.props.toggleConfirmation(false, undefined)
  }
  handleConfirmRemoveFilter = (item) => {
    this.props.removeSavedFilter(this.props.confirmationPayload.id, this.props.auth.email)
  }
  loadFilterHandler = (item) => {
    var vm = this
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.buildFilterExpand(false)
    this.props.newFilterAction(true)
    this.props.loadExistingFilter(JSON.parse(item.filter_criteria))
    this.props.requestCopyData(JSON.parse(item.filter_criteria), 0, this.props.defaultPageSize, userId)
    this.props.clearSelectedSticker()
    JSON.parse(item.filter_criteria).map(item => {
      item.selectedValues.map(data => {
        vm.props.updateFilterSelectedSticker(data.value, true)
      })
    })
  }
  onClickHandler = () => {
    this.props.newFilterAction(true)
    this.props.buildFilterExpand(true)
  }
  render () {
    return (
      <MyFilter
        handler={this.addNewFilter}
        savedFilterData={this.props.savedFilterData}
        onClick={this.onClickHandler}
        removeSavedFilterHandler={this.removeSavedFilterHandler}
        loadFilterHandler={this.loadFilterHandler}
        isConfirmationOpen={this.props.isConfirmationOpen}
        handleCancelConfirmation={this.handleCancelConfirmation}
        handleConfirmRemoveFilter={this.handleConfirmRemoveFilter}
        title="My Filters"
        cardCss="my-filter-card" />
    )
  }
}

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    savedFilterData,
    defaultPageSize,
    isConfirmationOpen,
    confirmationPayload,
  } = longCopy
  return {
    auth,
    savedFilterData,
    defaultPageSize,
    isConfirmationOpen,
    confirmationPayload,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    newFilterAction,
    fetchSavedFiltersEvent,
    loadExistingFilter,
    requestCopyData,
    removeSavedFilter,
    toggleConfirmation,
    updateFilterSelectedSticker,
    clearSelectedSticker,
    buildFilterExpand,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyFilterContainer))

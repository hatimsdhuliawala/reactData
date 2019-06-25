import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import NewFilter from './NewFilter'
import {
  removeFilterHandler,
  toggleSaveFilterDialogue,
  updateFilterSelectedSticker,
  clearFilters,
  clearSelectedSticker,
} from '../../../../store/longCopy/actionCreator'
class NewFilterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      title: this.props.title,
      cardCss: this.props.cardCss,
    }
  }
  removeFilterHandler = (mainFilter, filterVal) => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.removeFilterHandler({
      selectedFilters: this.props.selectedFilters,
      mainFilterValue: mainFilter,
      filterValue: filterVal,
    }, this.props.currentPage, this.props.defaultPageSize, userId)
    this.props.updateFilterSelectedSticker(filterVal, false)
  }
  addNewFilter = () => {
    if (this.props.selectedFilters && this.props.selectedFilters.length > 0) {
      this.props.toggleSaveFilterDialogue(true)
    }
  }
  clearFilters = () => {
    this.props.clearFilters()
    this.props.clearSelectedSticker()
  }
  render () {
    return (
      <NewFilter
        title="Filters Applied"
        addNewFilter={this.addNewFilter}
        selectedFilters={this.props.selectedFilters}
        removeFilterHandler={this.removeFilterHandler}
        clearFilters={this.clearFilters}
        cardCss="build-filter-card" />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    removeFilterHandler,
    toggleSaveFilterDialogue,
    updateFilterSelectedSticker,
    clearFilters,
    clearSelectedSticker,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    selectedFilters,
    currentPage,
    defaultPageSize,
  } = longCopy
  return {
    auth,
    selectedFilters,
    currentPage,
    defaultPageSize,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewFilterContainer))

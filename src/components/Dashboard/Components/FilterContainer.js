import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  hidedisplayMessageEvent,
  changeTcinFilter,
  changeToDateFilter,
  changeFromDateFilter,
  requestJobCountData,
  toggleMigration,
} from '../../../store/dashboard/actionCreator'
class FilterContainer extends React.Component {
  handleClose = () => {
    this.props.hidedisplayMessageEvent()
  }
  changeTcinFilter = (event) => {
    this.props.changeTcinFilter(event.target.value)
  }
  changeToDateFilter = (event) => {
    this.props.changeToDateFilter(event.target.value)
  }
  changeFromDateFilter = (event) => {
    this.props.changeFromDateFilter(event.target.value)
  }
  requestJobCountData = () => {
    this.props.requestJobCountData(this.props.includeMigration)
  }
  toggleMigration = () => {
    this.props.toggleMigration(!this.props.includeMigration)
  }
  render () {
    return (
      <div>
        <br />
        <Filter
          selectedTcin={this.props.selectedTcin}
          changeTcinFilter={this.changeTcinFilter}
          changeToDateFilter={this.changeToDateFilter}
          changeFromDateFilter={this.changeFromDateFilter}
          requestJobCountData={this.requestJobCountData}
          selectedToDate={this.props.selectedToDate}
          selectedFromDate={this.props.selectedFromDate}
          includeMigration={this.props.includeMigration}
          toggleMigration={this.toggleMigration}
        />
        <br />
      </div>
    )
  }
}
const mapStateToProps = state => {
  const {
    dashboard,
  } = state
  const {
    isFetching,
    event,
    status,
    displayMessage,
    isMessageShown,
    jobData,
    selectedTcin,
    selectedToDate,
    selectedFromDate,
    includeMigration,
  } = dashboard
  return {
    isFetching,
    event,
    status,
    displayMessage,
    isMessageShown,
    jobData,
    selectedTcin,
    selectedToDate,
    selectedFromDate,
    includeMigration,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hidedisplayMessageEvent,
    changeTcinFilter,
    changeToDateFilter,
    changeFromDateFilter,
    requestJobCountData,
    toggleMigration,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterContainer))

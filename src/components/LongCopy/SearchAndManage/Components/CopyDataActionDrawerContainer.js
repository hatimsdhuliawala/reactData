import React from 'react'
import CopyDataActionDrawer from './CopyDataActionDrawer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  selectRoutingTeam,
  setPlannerNotesEvent,
  addPlannerNotes,
  toggleActionDrawer,
  clearSuccessMessage,
  setRoutingTeamEvent,
  requestCopyData,
} from '../../../../store/longCopy/actionCreator'

class CopyDataActionDrawerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  handleRoutingTeamEvent = () => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.setRoutingTeamEvent(
      this.props.currentRouteTeam,
      this.props.selectedCopy.join(),
      userId
    )
    this.toggleActionDrawer(false)
    const vm = this
    setTimeout(function () {
      vm.props.requestCopyData(vm.props.selectedFilters, vm.props.currentPage, vm.props.defaultPageSize, userId)
    }, 1500)
  }
  selectRouteTeam = (event) => {
    this.props.selectRoutingTeam(event.target.value)
  };
  toggleActionDrawer = (isActionDrawerOpen, drawerAction) => {
    this.props.toggleActionDrawer(isActionDrawerOpen, drawerAction)
  };
  closeEscapeKey = (event, keyPressed) => {
    if (event.keyCode === 27) {
      this.toggleActionDrawer(false)
    }
  }
  clearSuccessMessage = () => {
    this.props.clearSuccessMessage()
  }
  handlePlannerNotesEvent = () => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.setPlannerNotesEvent(
      this.props.plannerNotes,
      this.props.selectedCopy.join(),
      userId
    )
    this.toggleActionDrawer(false)
    const vm = this
    setTimeout(function () {
      vm.toggleActionDrawer(false)
      vm.props.requestCopyData(vm.props.selectedFilters, vm.props.currentPage, vm.props.defaultPageSize, userId)
    }, 1500)
  }
  handleChangePlannerNotes = (event) => {
    this.props.addPlannerNotes(event.target.value)
  }

  render () {
    const { selectedCopy,
      isActionDrawerOpen, drawerAction, currentRouteTeam, isLoading,
      clearSuccessMessage, successMessage, isNotificationOpen, auth,
    } = this.props
    return (
      <CopyDataActionDrawer
        numSelected={selectedCopy.length}
        toggleActionDrawer={this.toggleActionDrawer}
        closeEscapeKey={this.closeEscapeKey}
        drawerAction={drawerAction}
        selectRouteTeam={this.selectRouteTeam}
        handleChangePlannerNotes={this.handleChangePlannerNotes}
        currentRouteTeam={currentRouteTeam}
        handlePlannerNotesEvent={this.handlePlannerNotesEvent}
        isActionDrawerOpen={isActionDrawerOpen}
        clearSuccessMessage={clearSuccessMessage}
        successMessage={successMessage}
        handleRoutingTeamEvent={this.handleRoutingTeamEvent}
        isLoading={isLoading}
        isNotificationOpen={isNotificationOpen}
        auth={auth}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectRoutingTeam,
    setPlannerNotesEvent,
    addPlannerNotes,
    toggleActionDrawer,
    clearSuccessMessage,
    setRoutingTeamEvent,
    requestCopyData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    selectedCopy,
    isActionDrawerOpen,
    drawerAction,
    currentRouteTeam,
    plannerNotes,
    isLoading,
    successMessage,
    isNotificationOpen,
    selectedFilters,
    currentPage,
    defaultPageSize,
  } = longCopy
  return {
    selectedCopy,
    isActionDrawerOpen,
    drawerAction,
    currentRouteTeam,
    plannerNotes,
    auth,
    isLoading,
    successMessage,
    isNotificationOpen,
    selectedFilters,
    currentPage,
    defaultPageSize,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CopyDataActionDrawerContainer))

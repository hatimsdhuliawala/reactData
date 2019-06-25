import React from 'react'
import CopyData from './CopyData'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import { CopyWritingStatus } from './FilterData'
import {
  handleChangePage,
  changeDefaultPageSize,
  handleSelectCopy,
  viewCopyDetailEvent,
  toggleActionDrawer,
  selectRoutingTeam,
  setPlannerNotesEvent,
  addPlannerNotes,
  downloadSelectedTcinsCopyEvent,
  downloadAllToExcel,
  displayErrorEvent,
  deleteBulletAndCopy,
} from '../../../../store/longCopy/actionCreator'
function getSorting (order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

class CopyDataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      order: 'asc',
      orderBy: 'tcin',
    }
  }

  viewCopyDetailsHandler = (event, id) => {
    this.props.viewCopyDetailEvent(id)
  }
  handleRequestSort = (event, property) => {
    /*
    const orderBy = property
    let order = 'desc'
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }
    this.setState({ order, orderBy }) */
  };

  handleSelectAllClick = (event, checked) => {
    let newSelected = []
    if (checked) {
      newSelected = this.props.copyData.map((item) => item.id)
    }
    this.props.handleSelectCopy({
      selectedCopy: newSelected,
    })
  };

  handleClick = (event, id) => {
    const { selectedCopy } = this.props
    const selectedIndex = selectedCopy.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCopy, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCopy.slice(1))
    } else if (selectedIndex === selectedCopy.length - 1) {
      newSelected = newSelected.concat(selectedCopy.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCopy.slice(0, selectedIndex),
        selectedCopy.slice(selectedIndex + 1),
      )
    }
    this.props.handleSelectCopy({
      selectedCopy: newSelected,
    })
  };

  handleChangePage = (event, page) => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.handleChangePage({
      currentPage: page,
      defaultPageSize: this.props.defaultPageSize,
      selectedFilters: this.props.selectedFilters,
    }, userId)
  };
  toggleActionDrawer = (isActionDrawerOpen, drawerAction) => {
    this.props.toggleActionDrawer(isActionDrawerOpen, drawerAction)
  };
  downloadAllToExcel = () => {
    if (this.props.totalElements > 10000) {
      this.props.displayErrorEvent({
        isErrorMessageShown: true,
        errorMessage: 'Download up to 10000 items only allowed',
      })
      return false
    }
    this.props.downloadAllToExcel(this.props.selectedFilters, this.props.totalElements)
  };
  downloadSelectedTcinsCopy = () => {
    let query = this.props.selectedCopy.map(
      (id) => `${this.props.copyData.filter((item) => item.id === id)[0].tcin}`
    )
    this.props.downloadSelectedTcinsCopyEvent(query.join())
  };
  deleteBulletAndCopy = () => {
    let query = this.props.selectedCopy.map(
      (id) => `${this.props.copyData.filter((item) => item.id === id)[0].tcin}`
    )
    this.props.deleteBulletAndCopy(query, true)
  };
  handleChangeDefaultPageSize = event => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.changeDefaultPageSize({
      currentPage: this.props.currentPage,
      defaultPageSize: event.target.value,
      selectedFilters: this.props.selectedFilters,
    }, userId)
  };

  isSelected = id => this.props.selectedCopy.indexOf(id) !== -1;

  setBackgroundStatus = (status) => {
    let tcinColor = CopyWritingStatus.filter(item => item.value === status)
    return { backgroundColor: tcinColor[0].color, padding: '0px 15px' }
  }

  convertStatusDisplay = (status) => {
    let statusName = CopyWritingStatus.filter(item => item.value === status)
    return statusName[0].display
  }

  render () {
    const { order, orderBy } = this.state
    const { defaultPageSize, copyData, currentPage, selectedCopy,
      drawerAction, totalElements, auth,
    } = this.props
    const emptyRows = defaultPageSize - Math.min(defaultPageSize, (totalElements - currentPage) * defaultPageSize)
    return (
      <CopyData
        data={copyData}
        order={order}
        orderBy={orderBy}
        selected={selectedCopy}
        rowsPerPage={defaultPageSize}
        page={currentPage}
        drawerAction={drawerAction}
        emptyRows={emptyRows}
        totalElements={totalElements}
        handleSelectAllClick={this.handleSelectAllClick}
        handleRequestSort={this.handleRequestSort}
        viewCopyDetailsHandler={this.viewCopyDetailsHandler}
        isSelected={this.isSelected}
        auth={auth}
        getSorting={getSorting}
        handleClick={this.handleClick}
        handleChangePage={this.handleChangePage}
        toggleActionDrawer={this.toggleActionDrawer}
        downloadSelectedTcinsCopy={this.downloadSelectedTcinsCopy}
        handleChangeRowsPerPage={this.handleChangeDefaultPageSize}
        setBackgroundStatus={this.setBackgroundStatus}
        convertStatusDisplay={this.convertStatusDisplay}
        downloadAllToExcel={this.downloadAllToExcel}
        isActionDrawerOpen={this.props.isActionDrawerOpen}
        deleteBulletAndCopy={this.deleteBulletAndCopy}
        deleteData={this.props.deleteData}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handleChangePage,
    changeDefaultPageSize,
    handleSelectCopy,
    viewCopyDetailEvent,
    toggleActionDrawer,
    selectRoutingTeam,
    setPlannerNotesEvent,
    addPlannerNotes,
    downloadSelectedTcinsCopyEvent,
    downloadAllToExcel,
    displayErrorEvent,
    deleteBulletAndCopy,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    copyData,
    currentPage,
    selectedCopy,
    defaultPageSize,
    isActionDrawerOpen,
    drawerAction,
    currentRouteTeam,
    plannerNotes,
    totalPages,
    totalElements,
    selectedFilters,
    deleteData,
  } = longCopy
  return {
    copyData,
    currentPage,
    selectedCopy,
    defaultPageSize,
    isActionDrawerOpen,
    drawerAction,
    currentRouteTeam,
    plannerNotes,
    auth,
    totalPages,
    totalElements,
    selectedFilters,
    deleteData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CopyDataContainer))

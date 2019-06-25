import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getCountData,
  buildFilterAction,
  updateFilterSelected,
  removeFilterHandler,
} from '../../../../store/longCopy/actionCreator'
import StatusButtons from './StatusButtons'
import { CopyWritingStatus } from './FilterData'
import {
  Grid,
} from '@material-ui/core'

class StatusButtonsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  setBackgroundStatus = (status) => {
    let tcinColor = CopyWritingStatus.filter(item => item.value === status)
    return { border: '13px solid ' + tcinColor[0].color }
  }

  getCountData = (eventType, selectedFilters) => {
    var valueType = this.props.selectedFilters.filter(value => value.filterValue === 'eventType').map(item => item.selectedValues.filter(event => event.value === eventType))
    let dataCalled = true
    if (valueType[0] && valueType[0][0] && valueType[0][0].value === eventType) {
      this.props.getCountData(eventType, true, dataCalled)
    } else {
      this.props.getCountData(eventType, false, dataCalled)
    }
  }

  updateFilter = (selectedFilterValue, isSelected) => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    let selectedFilter = {
      display: 'Copy Writing Status',
      value: 'eventType',
    }
    if (!isSelected) {
      this.props.buildFilterAction({
        newFilterContainerShown: true,
        copyDataContainerShown: true,
        selectedFilters: this.props.selectedFilters,
        selectedFilter: selectedFilter,
        selectedFilterValue: selectedFilterValue,
      }, this.props.currentPage, this.props.defaultPageSize, userId)
      this.props.updateFilterSelected(selectedFilterValue.value, true)
    } else {
      this.props.removeFilterHandler({
        selectedFilters: this.props.selectedFilters,
        mainFilterValue: selectedFilter.value,
        filterValue: selectedFilterValue.value,
      }, this.props.currentPage, this.props.defaultPageSize, userId)
      this.props.updateFilterSelected(selectedFilterValue.value, false)
    }
  }

  render () {
    return (
      <Grid container justify="center" direction="row" alignItems="center">
        {CopyWritingStatus.filter(item => item.isVisible).map(item => <StatusButtons
          setBackgroundStatus={this.setBackgroundStatus}
          item={item}
          filterCount={this.props.countFilterValues.filter(value => value.eventType === item.value)}
          getCountData={this.getCountData}
          updateFilter={this.updateFilter}
          selectedFilters={this.props.selectedFilters}
        />)}
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCountData,
    buildFilterAction,
    updateFilterSelected,
    removeFilterHandler,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    selectedCopyData,
    countFilterValues,
    selectedFilters,
    defaultPageSize,
    currentPage,
  } = longCopy
  return {
    selectedCopyData,
    countFilterValues,
    selectedFilters,
    currentPage,
    defaultPageSize,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StatusButtonsContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BuildFilter from './BuildFilter'
import { FilterData, CopyWritingStatus, RoutedTeams } from './FilterData'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import {
  displayErrorEvent,
  buildFilterAction,
  changeFilterEvent,
  selectFilterValueEvent,
  requestDepartmentFilter,
  updateFilterSelectedSticker,
} from '../../../../store/longCopy/actionCreator'
class BuildFilterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      tcinList: [],
    }
  }

  componentDidMount () {
    // Call department value for the filter.
    if (!_.includes(this.props.auth.permission.hostName, 'vendorpipeline')) {
      this.props.requestDepartmentFilter()
    }
  }

  buildFilter = (selectedFilter, selectedFilterValue) => {
    if (!this.props.isFetching) {
      let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
      this.props.buildFilterAction({
        newFilterContainerShown: true,
        copyDataContainerShown: true,
        selectedFilters: this.props.selectedFilters,
        selectedFilter: selectedFilter,
        selectedFilterValue: selectedFilterValue,
      }, this.props.currentPage, this.props.defaultPageSize, userId)
      this.props.updateFilterSelectedSticker(selectedFilterValue.value, true)
    }
  }
  /**
   * This method calls when user clicks on ADD button on Build filter
   * section. This method reset value for selected value once it add to filter
   * list
   */
  addNewFilter = () => {
    // Show error if there is no selected filter
    if (this.props.selectedFilter === -1) {
      this.props.displayErrorEvent({
        isErrorMessageShown: true,
        errorMessage: 'Please select filter',
      })
      return false
    }
    var selectedFilter = FilterData.filter(
      item => item.value === this.props.selectedFilter
    )[0]
    var selectedFilterValue
    // Check for Copy Writing status
    if (this.props.selectedFilter === 'eventType') {
      if (this.props.filterValues.copyWritingStatus === -1) {
        return false
      }
      selectedFilterValue = CopyWritingStatus.filter(
        item => item.value === this.props.filterValues.copyWritingStatus
      )[0]
      // Reset filter value as soon as user clicks on Add button
      this.buildFilter(selectedFilter, selectedFilterValue)
    }
    if (this.props.selectedFilter === 'department') {
      if (this.props.filterValues.departmentData === -1) {
        return false
      }
      selectedFilterValue = this.props.selectedDepartmentData.returnData.filter(
        item => item.value === this.props.filterValues.departmentData
      )[0]
      // Reset filter value as soon as user clicks on Add button
      this.buildFilter(selectedFilter, selectedFilterValue)
    }
    if (this.props.selectedFilter === 'tcin') {
      if (this.props.filterValues.tcins === undefined ||
        this.props.filterValues.tcins.length === 0) {
        return false
      }
      let selectedChips = []
      this.props.filterValues.tcins.forEach((item) => {
        selectedFilterValue = {
          display: item.label,
          value: item.value,
        }
        selectedChips.push(selectedFilterValue)
      })
      this.buildFilter(selectedFilter, selectedChips)
      // Reset filter value as soon as user clicks on Add button
    }
    if (this.props.selectedFilter === 'division') {
      if (this.props.filterValues.divisions === undefined ||
        this.props.filterValues.divisions.length === 0) {
        return false
      }
      this.props.filterValues.divisions.forEach((item) => {
        selectedFilterValue = {
          display: item.label,
          value: item.value,
        }
        this.buildFilter(selectedFilter, selectedFilterValue)
      })
      // Reset filter value as soon as user clicks on Add button
    }
    if (this.props.selectedFilter === 'routedTeams') {
      if (this.props.filterValues.routedTeams === -1) {
        return false
      }
      selectedFilterValue = RoutedTeams.filter(
        item => item.value === this.props.filterValues.routedTeams
      )[0]
      // Reset filter value as soon as user clicks on Add button
      this.buildFilter(selectedFilter, selectedFilterValue)
    }
    // Return value to parent components
  }
  onFilterSelect = (event) => {
    this.props.changeFilterEvent({
      selectedFilter: event.target.value,
    })
    /**
     * Handling display for Filter value
     */
  }
  selectFilterValue = (selectedFilterValues) => {
    this.props.selectFilterValueEvent({
      filterValues: selectedFilterValues,
    })
  }
  onFilterValueSelect = (event) => {
    if (event.target.name === 'copyWritingStatus') {
      /**
       * Raise event for filter value select
       * filterValues: selectedFilterValues,
       */
      this.selectFilterValue({
        copyWritingStatus: event.target.value,
        tcins: [],
        divisions: [],
        routedTeams: -1,
        departmentData: -1,
        departmentClass: -1,
      })
    }
    if (event.target.name === 'departmentData') {
      /**
       * Raise event for filter value select
       * filterValues: selectedFilterValues,
       */
      this.selectFilterValue({
        copyWritingStatus: -1,
        tcins: [],
        divisions: [],
        routedTeams: -1,
        departmentData: event.target.value,
        departmentClass: -1,
      })
    }
    if (event.target.name === 'routedTeams') {
      /**
       * Raise event for filter value select
       * filterValues: selectedFilterValues,
       */
      this.selectFilterValue({
        copyWritingStatus: -1,
        tcins: [],
        divisions: [],
        routedTeams: event.target.value,
        departmentData: -1,
        departmentClass: -1,
      })
    }
    if (event.target.name === 'departmentClass') {
      /**
       * Raise event for filter value select
       * filterValues: selectedFilterValues,
       */
      this.selectFilterValue({
        copyWritingStatus: -1,
        tcins: [],
        divisions: [],
        routedTeams: -1,
        departmentData: this.props.filterValues.department,
        departmentClass: event.target.value,
      })
    }
  }
  hasWhiteSpace = (s) => {
    return /\s/g.test(s)
  }
  validTcin = (s) => {
    return /\d{5,9}/.test(s)
  }
  splitTcins = (tcin) => {
    let tcins = tcin.split('\n')
    let tcinList = []
    if (tcins.length > 0) {
      tcins.forEach(element => {
        if (element.trim() !== '') {
          if (element.indexOf(',') > -1) {
            element.split(',').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  if (tcinList.indexOf(item.trim()) === -1) {
                    tcinList.push(item.trim())
                  }
                }
              }
            })
          } else if (this.hasWhiteSpace(element)) {
            element.split(' ').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  if (tcinList.indexOf(item.trim()) === -1) {
                    tcinList.push(item.trim())
                  }
                }
              }
            })
          } else {
            if (this.validTcin(element.trim())) {
              if (tcinList.indexOf(element.trim()) === -1) {
                tcinList.push(element.trim())
              }
            }
          }
        }
      })
    }
    return tcinList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
  }
  handleAddTcin = (selectedTcins) => {
    let chips = []
    this.splitTcins(selectedTcins).forEach(i => {
      chips.push(i)
    })
    if (this.props.filterValues !== undefined &&
      this.props.filterValues.tcins.length > 0) {
      this.props.filterValues.tcins.forEach((item) => {
        chips.push(item)
      })
    }
    this.selectFilterValue({
      tcins: chips,
      copyWritingStatus: -1,
      divisions: [],
      routedTeams: -1,
      departmentData: -1,
      departmentClass: -1,
    })
  }
  handleDeleteTcin = (deletedTcin) => {
    let chips = []
    this.props.filterValues.tcins.forEach(item => {
      if (item.value !== deletedTcin) {
        chips.push(item)
      }
    })
    this.selectFilterValue({
      tcins: chips,
      copyWritingStatus: -1,
      divisions: [],
      routedTeams: -1,
      departmentData: -1,
      departmentClass: -1,
    })
  }
  handleDeleteDivision = (deletedDivision) => {
    let chips = []
    this.props.filterValues.divisions.forEach(item => {
      if (item.value !== deletedDivision) {
        chips.push(item)
      }
    })
    this.selectFilterValue({
      tcins: [],
      copyWritingStatus: -1,
      divisions: chips,
      routedTeams: -1,
      departmentData: -1,
      departmentClass: -1,
    })
  }
  handleAddDivision = (divisions) => {
    let chips = []
    chips.push({
      value: divisions,
      label: divisions,
    })
    this.selectFilterValue({
      tcins: [],
      copyWritingStatus: -1,
      divisions: chips,
      routedTeams: -1,
      departmentData: -1,
      departmentClass: -1,
    })
  }
  render () {
    const { selectedFilter, filterValues, selectedDepartmentData } = this.props
    return (
      <BuildFilter
        title="Build Your Filter"
        cardCss="build-filter-card"
        selectedFilter={selectedFilter}
        filterValues={filterValues}
        handler={this.addNewFilter}
        handleAddTcin={this.handleAddTcin}
        handleDeleteTcin={this.handleDeleteTcin}
        handleAddDivision={this.handleAddDivision}
        handleDeleteDivision={this.handleDeleteDivision}
        onFilterSelect={this.onFilterSelect}
        handleErrorClose={this.handleErrorClose}
        onFilterValueSelect={this.onFilterValueSelect}
        selectedDepartmentData={selectedDepartmentData} />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    displayErrorEvent,
    buildFilterAction,
    changeFilterEvent,
    selectFilterValueEvent,
    requestDepartmentFilter,
    updateFilterSelectedSticker,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    longCopy,
  } = state
  const {
    isFetching,
    selectedFilters,
    selectedFilter,
    filterValues,
    selectedDepartmentData,
    currentPage,
    defaultPageSize,
  } = longCopy
  return {
    auth,
    isFetching,
    selectedFilters,
    selectedFilter,
    filterValues,
    selectedDepartmentData,
    currentPage,
    defaultPageSize,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildFilterContainer))

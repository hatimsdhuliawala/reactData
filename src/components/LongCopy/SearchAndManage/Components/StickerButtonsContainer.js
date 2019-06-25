import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getCountData,
  buildFilterAction,
  updateFilterSelectedSticker,
  removeFilterHandler,
} from '../../../../store/longCopy/actionCreator'
import StickerButtons from './StickerButtons'
import { CopyWritingStatus } from './FilterData'
import {
  Grid,
} from '@material-ui/core'

class StickerButtonsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  setBackgroundStatus = (status) => {
    let tcinColor = CopyWritingStatus.filter(item => item.value === status)
    return { border: '13px solid ' + tcinColor[0].color }
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
      this.props.updateFilterSelectedSticker(selectedFilterValue.value, true)
    } else {
      this.props.removeFilterHandler({
        selectedFilters: this.props.selectedFilters,
        mainFilterValue: selectedFilter.value,
        filterValue: selectedFilterValue.value,
      }, this.props.currentPage, this.props.defaultPageSize, userId)
      this.props.updateFilterSelectedSticker(selectedFilterValue.value, false)
    }
  }

  render () {
    return (
      <Grid container justify="center" direction="row" alignItems="center">
        {CopyWritingStatus.filter(item => item.isVisible).map(item => <StickerButtons
          key={item.value}
          setBackgroundStatus={this.setBackgroundStatus}
          item={item}
          filterCount={this.props.stickerValues.filter(value => value.eventType === item.value)}
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
    updateFilterSelectedSticker,
    removeFilterHandler,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
  } = state
  const {
    selectedCopyData,
    stickerValues,
    selectedFilters,
    defaultPageSize,
    currentPage,
  } = longCopy
  return {
    selectedCopyData,
    stickerValues,
    selectedFilters,
    currentPage,
    defaultPageSize,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StickerButtonsContainer))

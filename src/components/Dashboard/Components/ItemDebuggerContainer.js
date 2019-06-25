import React from 'react'
import ItemDebugger from './ItemDebugger'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  LinearProgress,
} from '@material-ui/core'
import {
  handleSelectedItems,
  fetchItemData,
  clearItemDetails,
  toggleIncludeVersion,
} from '../../../store/dashboard/itemDebuggerActionCreator'
class ItemDebuggerContainer extends React.Component {
  validTcin = (s) => {
    return /\d{5,9}/.test(s)
  }
  hasWhiteSpace = (s) => {
    return /\s/g.test(s)
  }
  removeSelectedItem = (tcin) => {
    let filterList = this.props.itemDebugger.selectedItems.filter((item) => item !== tcin)
    this.props.handleSelectedItems(filterList)
  }
  clearSelectedItems = () => {
    this.props.handleSelectedItems([])
    this.props.clearItemDetails()
  }
  fetchItemData = () => {
    this.props.fetchItemData(this.props.itemDebugger.selectedItems, this.props.itemDebugger.includeAllVersion)
  }
  toggleIncludeVersionHandler = (event) => {
    this.props.toggleIncludeVersion(this.props.itemDebugger.selectedItems, event.target.checked)
  }
  handleTcinChange = (event) => {
    let tcins = event.target.value.split('\n')
    let tcinList = []
    if (tcins.length > 0) {
      tcins.forEach(element => {
        if (element.trim() !== '') {
          if (element.indexOf(',') > -1) {
            element.split(',').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  tcinList.push(item.trim())
                }
              }
            })
          } else if (this.hasWhiteSpace(element)) {
            element.split(' ').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  tcinList.push(item.trim())
                }
              }
            })
          } else {
            if (this.validTcin(element.trim())) {
              tcinList.push(element.trim())
            }
          }
        }
      })
    }
    this.props.handleSelectedItems(tcinList)
  }
  render () {
    return (
      <div>
        <ItemDebugger
          handleTcinChange={this.handleTcinChange}
          clearSelectedItems={this.clearSelectedItems}
          removeSelectedItem={this.removeSelectedItem}
          fetchItemData={this.fetchItemData}
          itemDebugger={this.props.itemDebugger}
          toggleIncludeVersion={this.toggleIncludeVersionHandler}
        />
        {this.props.isFetching && <LinearProgress />}
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
    itemDebugger,
  } = dashboard
  return {
    isFetching,
    itemDebugger,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handleSelectedItems,
    fetchItemData,
    clearItemDetails,
    toggleIncludeVersion,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemDebuggerContainer))

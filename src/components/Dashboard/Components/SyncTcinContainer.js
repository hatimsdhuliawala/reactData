import React from 'react'
import SyncTcin from './SyncTcin'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  LinearProgress,
} from '@material-ui/core'
import {
  handleChangeSyncTcin,
  fetchTcinData,
  succesTcinData,
  syncTcinData,
} from '../../../store/dashboard/actionCreator'
class SyncTcinContainer extends React.Component {
  validTcin = (s) => {
    return /\d{5,9}/.test(s)
  }
  hasWhiteSpace = (s) => {
    return /\s/g.test(s)
  }
  removeSyncTcinHandler = (tcin) => {
    let filterList = this.props.syncTcins.filter((item) => item !== tcin)
    this.props.handleChangeSyncTcin(filterList)
  }
  clearSyncTcins = () => {
    this.props.handleChangeSyncTcin([])
    this.props.succesTcinData([])
  }
  processSyncTcins = () => {
    let queryParams = []
    this.props.syncTcins.forEach((item) => {
      queryParams.push('tcins=' + item)
    })
    this.props.syncTcinData(queryParams.join('&'))
  }
  searchTcins = () => {
    let queryParams = []
    this.props.syncTcins.forEach((item) => {
      queryParams.push('tcins=' + item)
    })
    this.props.fetchTcinData(queryParams.join('&'))
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
    this.props.handleChangeSyncTcin(tcinList)
  }
  render () {
    return (
      <div>
        <SyncTcin
          handleTcinChange={this.handleTcinChange}
          clearSyncTcins={this.clearSyncTcins}
          removeSyncTcinHandler={this.removeSyncTcinHandler}
          searchTcins={this.searchTcins}
          syncTcins={this.props.syncTcins}
          processSyncTcins={this.processSyncTcins}
          tcinDeltaResponse={this.props.tcinDeltaResponse}
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
    syncTcins,
    tcinDeltaResponse,
  } = dashboard
  return {
    isFetching,
    syncTcins,
    tcinDeltaResponse,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handleChangeSyncTcin,
    fetchTcinData,
    succesTcinData,
    syncTcinData,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SyncTcinContainer))

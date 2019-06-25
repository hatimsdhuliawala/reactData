import React from 'react'
import BulkUploadHistoryJobs from './BulkUploadHistoryJobs'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  LinearProgress,
} from '@material-ui/core'
import {
  fetchBulkUploadJobs,
  reloadBulkUploadJobs,
} from '../../../../store/bulkUploadHistory/actionCreator'
class BulkUploadHistoryJobsContainer extends React.Component {
  componentWillMount () {
    this.props.reloadBulkUploadJobs(this.props.email, this.props.pageSize, this.props.isAdmin)
  }
  fetchBulkUploadJobsAction = () => {
    this.props.reloadBulkUploadJobs(this.props.email, this.props.pageSize, this.props.isAdmin)
  }
  fetchMoreBulkUploadJobsAction = () => {
    this.props.fetchBulkUploadJobs(this.props.email, (this.props.currentPage + 1), this.props.pageSize, this.props.isAdmin)
  }
  render () {
    const { jobData, currentPage, totalPages, totalElements } = this.props
    return (
      <div>
        {jobData &&
          <BulkUploadHistoryJobs
            jobData={jobData}
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            fetchBulkUploadJobsAction={this.fetchBulkUploadJobsAction}
            fetchMoreBulkUploadJobsAction={this.fetchMoreBulkUploadJobsAction}
          />
        }
        {this.props.isFetching && <LinearProgress />}
      </div>
    )
  }
}
const mapStateToProps = state => {
  const {
    bulkUploadHistory,
    auth,
  } = state
  const {
    isFetching,
    jobData,
    pageSize,
    currentPage,
    totalPages,
    totalElements,
  } = bulkUploadHistory
  const {
    email,
  } = auth
  return {
    pageSize,
    currentPage,
    isFetching,
    totalPages,
    totalElements,
    jobData,
    email,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchBulkUploadJobs,
    reloadBulkUploadJobs,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BulkUploadHistoryJobsContainer))

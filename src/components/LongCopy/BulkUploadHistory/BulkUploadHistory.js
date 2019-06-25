import React from 'react'
import HeaderTitle from '../../Header/HeaderTitle'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import styles from './theme'
import BulkUploadHistoryJobsContainer from './Components/BulkUploadHistoryJobsContainer'

class BulkUploadHistory extends React.Component {
  render () {
    return (
      <React.Fragment>
        <HeaderTitle title="Bulk Upload History" />
        <BulkUploadHistoryJobsContainer isAdmin={this.props.isAdmin} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const {
    bulkUploadHistory,
  } = state
  const {
    isFetching,
    errorMessage,
    isErrorMessageShown,
  } = bulkUploadHistory
  return {
    isFetching,
    errorMessage,
    isErrorMessageShown,
  }
}
export default connect(mapStateToProps, null)(withStyles(styles)(BulkUploadHistory))

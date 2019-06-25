import React from 'react'
import Header from './Header'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HeaderData } from './DashboardData'
import {
  requestJobData,
  requestJobCountData,
} from '../../../store/dashboard/actionCreator'
class HeaderContainer extends React.Component {
  componentWillMount () {
    this.props.requestJobCountData(this.props.includeMigration)
  }
  requestJobData = (event, status) => {
    this.props.requestJobData(event, status, this.props.includeMigration)
  }
  render () {
    return (
      <Grid container spacing={24}>
        {HeaderData.map(item => (<Header
          key={item.id}
          item={item}
          jobCount={this.props.jobCount}
          eventLoading={this.props.eventLoading}
          requestJobData={this.requestJobData}
        />))
        }
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestJobData,
    requestJobCountData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    dashboard,
  } = state
  const {
    isFetching,
    isMessageShown,
    displayMessage,
    jobCount,
    eventLoading,
    selectedTcin,
    selectedToDate,
    selectedFromDate,
    includeMigration,
  } = dashboard
  return {
    isFetching,
    isMessageShown,
    displayMessage,
    jobCount,
    eventLoading,
    selectedTcin,
    selectedToDate,
    selectedFromDate,
    includeMigration,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

import React from 'react'
import TcinSummary from './TcinSummary'
import { connect } from 'react-redux'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import {
  Grid,
  Paper,
} from '@material-ui/core'

import {
  requestTcinsSummaryData,
} from '../../../store/dashboard/sysHealthActionCreator'
class TcinSummaryContainer extends React.Component {
  componentDidMount () {
    this.props.requestTcinsSummaryData()
  }
  render () {
    return (
      <div>
        <Grid item xs={12}>
          <Paper elevation={12}>
            <TcinSummary
              tcinSummary={this.props.tcinSummary}
            />
          </Paper>
        </Grid>
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
    displayMessage,
    isMessageShown,
    tcinSummary,
  } = dashboard
  return {
    isFetching,
    displayMessage,
    isMessageShown,
    tcinSummary,
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    requestTcinsSummaryData,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TcinSummaryContainer))

import React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withStyles } from '@material-ui/core/styles'
import HeaderTitle from '../Header/HeaderTitle'
import HeaderContainer from './Components/HeaderContainer'
import JobDataContainer from './Components/JobDataContainer'
import FilterContainer from './Components/FilterContainer'
import SystemHealthContainer from './Components/SystemHealthContainer'
import ItemDebuggerContainer from './Components/ItemDebuggerContainer'
import SyncTcinContainer from './Components/SyncTcinContainer'
import BulkUploadHistory from '../LongCopy/BulkUploadHistory/BulkUploadHistory'
import DashboardPage from '../DashboardPage/DashboardPage'
import { bindActionCreators } from 'redux'

import {
  changeCurrentIndex,
} from '../../store/dashboard/actionCreator'
const styles = {
  dashboardUI: {
    textAlign: 'center',
  },
  dashboardContainer: {
    textAlign: 'left',
    marginTop: '30px',
  },
}
class DashboardUI extends React.Component {
  static propTypes = {
    classes: object,
  }

  handleChange = (event, value) => {
    this.props.changeCurrentIndex(value)
  }
  render () {
    const { classes, headerTitle } = this.props
    return (
      <div className={classes.dashboardUI}>
        <HeaderTitle title="Dashboard" />
        <Helmet>
          <title>{headerTitle}</title>
        </Helmet>
        {this.props.currentTabIndex === 0 &&
          <div className={classes.dashboardContainer}>
            <DashboardPage />
          </div>
        }
        {this.props.currentTabIndex === 1 &&
          <div>
            <SystemHealthContainer />
          </div>
        }
        {this.props.currentTabIndex === 2 &&
          <div>
            <FilterContainer />
            <HeaderContainer />
            <JobDataContainer />
          </div>
        }
        {this.props.currentTabIndex === 3 &&
          <div>
            <ItemDebuggerContainer />
          </div>
        }
        {this.props.currentTabIndex === 4 &&
          <div>
            <SyncTcinContainer />
          </div>
        }
        {this.props.currentTabIndex === 5 &&
          <div>
            <BulkUploadHistory isAdmin="true" />
          </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    changeCurrentIndex,
  }, dispatch)

const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout
  const { dashboard } = state
  const { currentTabIndex } = dashboard
  return {
    headerTitle: headerTitle,
    currentTabIndex: currentTabIndex,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardUI))

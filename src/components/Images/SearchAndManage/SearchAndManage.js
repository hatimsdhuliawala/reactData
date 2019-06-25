import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/SearchAndManageData'
import styles from './theme'
import { withRouter } from 'react-router-dom'
import envConfig from '../../../config/apiConfig'
import _ from 'lodash'

class SearchAndManage extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  componentDidMount () {
    window.location = _.includes(this.props.auth.permission.hostName, 'vendorpipeline') ? envConfig.hostName.externalUrl : envConfig.hostName.internalUrl + '/images/manage'
  }
  render () {
    return (
      <React.Fragment>
        <HeaderTitle title="Search And Manage" />
        <Helmet title="Search And Manage" />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => {
  const {
    searchAndManage,
    auth,
  } = state
  return {
    searchAndManage,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SearchAndManage)))

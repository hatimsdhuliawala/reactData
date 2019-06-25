import React from 'react'
import HistoryPage from './HistoryPage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getHistoryData,
  handleChangePage,
  changeDefaultPageSize,
} from '../../../../store/images/historyActionCreator'
import envConfig from '../../../../config/apiConfig'
import _ from 'lodash'

class HistoryPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    if (!_.includes(this.props.auth.permission.hostName, 'vendorpipeline')) {
      window.location = envConfig.hostName.internalUrl + '/images/upload/history'
    }
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      email_ids: [userId],
    }
    this.props.getHistoryData(this.props.currentPage, this.props.defaultPageSize, requestBody)
  }

  handleChangePage = (event, page) => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      email_ids: [userId],
    }
    this.props.handleChangePage({
      currentPage: page,
      defaultPageSize: this.props.defaultPageSize,
    }, requestBody)
  };
  handleChangeDefaultPageSize = event => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      email_ids: [userId],
    }
    this.props.changeDefaultPageSize({
      currentPage: this.props.currentPage,
      defaultPageSize: event.target.value,
    }, requestBody)
  };

  render () {
    const { defaultPageSize, currentPage, totalElements, historyData,
    } = this.props
    const emptyRows = defaultPageSize - Math.min(defaultPageSize, (totalElements - currentPage) * defaultPageSize)
    return (
      <HistoryPage
        historyData={historyData}
        rowsPerPage={defaultPageSize}
        page={currentPage}
        emptyRows={emptyRows}
        totalElements={totalElements}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeDefaultPageSize}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getHistoryData,
    handleChangePage,
    changeDefaultPageSize,
  }, dispatch)

const mapStateToProps = state => {
  const {
    images,
    auth,
  } = state
  const {
    historyData,
    currentPage,
    defaultPageSize,
    totalPages,
    totalElements,
  } = images
  return {
    historyData,
    currentPage,
    defaultPageSize,
    totalPages,
    totalElements,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HistoryPageContainer))

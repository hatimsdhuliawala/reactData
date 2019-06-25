import React from 'react'
import HistoryPage from './HistoryPage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getVideoHistoryData,
  handleChangePage,
  changeDefaultPageSize,
} from '../../../../store/videos/historyActionCreator'

class HistoryPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      duration: -1,
    }
    this.props.getVideoHistoryData(this.props.vhCurrentPage, this.props.vhDefaultPageSize, userId, requestBody)
  }

  handleChangePage = (event, page) => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      duration: -1,
    }
    this.props.handleChangePage({
      currentPage: page,
      defaultPageSize: this.props.vhDefaultPageSize,
    }, userId, requestBody)
  };
  handleChangeDefaultPageSize = event => {
    let userId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    var requestBody = {
      duration: -1,
    }
    this.props.changeDefaultPageSize({
      currentPage: this.props.vhCurrentPage,
      defaultPageSize: event.target.value,
    }, userId, requestBody)
  };

  render () {
    const { vhDefaultPageSize, vhCurrentPage, vhTotalElements, videoHistoryData,
    } = this.props
    const emptyRows = vhDefaultPageSize - Math.min(vhDefaultPageSize, (vhTotalElements - vhCurrentPage) * vhDefaultPageSize)
    return (
      <HistoryPage
        videoHistoryData={videoHistoryData}
        rowsPerPage={vhDefaultPageSize}
        page={vhCurrentPage}
        emptyRows={emptyRows}
        totalElements={vhTotalElements}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeDefaultPageSize}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getVideoHistoryData,
    handleChangePage,
    changeDefaultPageSize,
  }, dispatch)

const mapStateToProps = state => {
  const {
    videos,
    auth,
  } = state
  const {
    videoHistoryData,
    vhCurrentPage,
    vhDefaultPageSize,
    vhTotalPages,
    vhTotalElements,
  } = videos
  return {
    videoHistoryData,
    vhCurrentPage,
    vhDefaultPageSize,
    vhTotalPages,
    vhTotalElements,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HistoryPageContainer))

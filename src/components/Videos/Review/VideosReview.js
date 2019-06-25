import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/VideosReviewData'
import styles from './theme'
import { withRouter } from 'react-router-dom'
import envConfig from '../../../config/apiConfig'
import _ from 'lodash'

class VideoReview extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  componentDidMount () {
    window.location = _.includes(window.location.host, 'vendorpipeline') ? envConfig.hostName.externalUrl : envConfig.hostName.internalUrl + '/video/search'
  }
  render () {
    return (
      <React.Fragment>
        <HeaderTitle title="Video Review" />
        <Helmet title="Video Review" />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => {
  const {
    videosReview,
  } = state
  return {
    videosReview,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(VideoReview)))

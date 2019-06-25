import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultState } from './Components/ImagesReviewData'
import styles from './theme'
import { withRouter } from 'react-router-dom'
import envConfig from '../../../config/apiConfig'
import _ from 'lodash'

class ImagesReview extends React.Component {
  constructor () {
    super()
    this.state = DefaultState
  }
  componentDidMount () {
    window.location = _.includes(this.props.auth.permission.hostName, 'vendorpipeline') ? envConfig.hostName.externalUrl : envConfig.hostName.internalUrl + '/images/vendor/review'
  }
  render () {
    return (
      <React.Fragment>
        <HeaderTitle title="Image Review" />
        <Helmet title="Image Review" />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
  }, dispatch)

const mapStateToProps = state => {
  const {
    images,
    auth,
  } = state
  return {
    images,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ImagesReview)))

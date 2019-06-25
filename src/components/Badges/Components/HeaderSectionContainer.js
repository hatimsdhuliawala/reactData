import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import HeaderSection from './HeaderSection'
import styles from '../theme'
import {
  getBadgesData,
} from '../../../store/badges/actionCreator'

class HeaderSectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  render () {
    return (
      <HeaderSection
        badgesList={this.props.badgesList}
        isBadgesFetching={this.props.isBadgesFetching} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getBadgesData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    badges,
  } = state
  const {
    badgesList,
    isBadgesFetching,
  } = badges
  return {
    badgesList,
    isBadgesFetching,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderSectionContainer))

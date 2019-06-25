import React from 'react'
import TableBadges from './TableBadges'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getBadgesData,
  changeBadgeEditState,
  saveBadge,
  changeBadge,
  dispatchSaveBadge,
} from '../../../store/badges/actionCreator'

class TableBadgesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  componentDidMount () {
    this.props.getBadgesData()
  }
  changeToEditState = (badge) => {
    if (this.props.auth.permission.badgesEdit) {
      this.props.changeBadgeEditState(badge, true)
    }
  }
  changeToViewState = (badge) => {
    this.props.changeBadgeEditState(badge, false)
  }
  saveBadge = (badge) => {
    // change to lowdash?
    this.props.changedBadgesList.map(changedBadge => {
      if (changedBadge.id === badge.id) {
        this.props.saveBadge(changedBadge)
      }
    })
  }
  changeBadge = (fieldName, value, badge) => {
    this.props.changeBadge(fieldName, value, badge)
  }
  resetSaveBadgeSuccess = () => {
    this.props.dispatchSaveBadge(null)
  }
  render () {
    const { badgesList, isBadgesFetching, changedBadgesList, isSaveBadgeSuccess, isBadgeActiveAfterSave, auth } = this.props
    return (
      <TableBadges
        badges={badgesList}
        isBadgesFetching={isBadgesFetching}
        changeToEditState={this.changeToEditState}
        changeToViewState={this.changeToViewState}
        changedBadgesList={changedBadgesList}
        saveBadge={this.saveBadge}
        changeBadge={this.changeBadge}
        isSaveBadgeSuccess={isSaveBadgeSuccess}
        isBadgeActiveAfterSave={isBadgeActiveAfterSave}
        resetSaveBadgeSuccess={this.resetSaveBadgeSuccess}
        auth={auth}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getBadgesData,
    changeBadgeEditState,
    saveBadge,
    changeBadge,
    dispatchSaveBadge,
  }, dispatch)

const mapStateToProps = state => {
  const {
    badges,
    auth,
  } = state
  const {
    badgesList,
    changedBadgesList,
    isBadgesFetching,
    isSaveBadgeSuccess,
    isBadgeActiveAfterSave,
  } = badges
  return {
    badgesList,
    changedBadgesList,
    isBadgesFetching,
    isSaveBadgeSuccess,
    isBadgeActiveAfterSave,
    auth,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableBadgesContainer))

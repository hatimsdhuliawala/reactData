import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ErrorTcinCard from './ErrorTcinCard'
import styles from '../theme'
import {
  handlePanelErrorTcin,
} from '../../../../store/videos/actionCreator'

class ErrorTcinCardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handlePanelErrorTcin = panel => (event, expanded) => {
    this.props.handlePanelErrorTcin(expanded ? panel : false)
  };

  render () {
    return (
      <ErrorTcinCard
        tcinList={this.props.tcinList}
        invalidTcinList={this.props.invalidTcinList}
        notOwnedTcinList={this.props.notOwnedTcinList}
        addTcin={this.addTcin}
        deleteTcin={this.deleteTcin}
        uploadPageForm={this.props.uploadPageForm}
        panelTcinError={this.props.panelTcinError}
        handlePanelErrorTcin={this.handlePanelErrorTcin}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handlePanelErrorTcin,
  }, dispatch)

const mapStateToProps = state => {
  const {
    videos,
  } = state
  const {
    panelTcinError,
    invalidTcinList,
    notOwnedTcinList,
  } = videos
  return {
    panelTcinError,
    invalidTcinList,
    notOwnedTcinList,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ErrorTcinCardContainer))

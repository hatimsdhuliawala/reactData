import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import EditFeatureBullets from './EditFeatureBullets'
import styles from '../theme'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateFeatureBullets,
  changeToEditStateFeatureBullets,
  updateSelectedFeatureBullets,
  checkProfanity,
} from '../../../../store/bulkUpload/tableActionCreator'

class EditFeatureBulletsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      featureBulletsEdit: '',
    }
  }

  updateFeatureBullets = (event, tcin) => {
    var bullets = event.target.value.split('\n')
    bullets = bullets.filter(data => data !== '')
    if (this.checkBulletEquality(bullets, this.props.data.featureBullets)) {
      this.props.changeToEditStateFeatureBullets(tcin, false)
    } else {
      this.props.checkProfanity(tcin, this.props.longCopy, bullets, 'featureBullet')
      this.props.updateSelectedFeatureBullets(tcin, bullets)
    }
  }

 checkBulletEquality = (newVal, oldVal) => {
   if (newVal.length !== oldVal.length) {
     return false
   }
   for (var i = 0; i < newVal.length; i++) {
     if (newVal[i] !== oldVal[i].replace(/<\/?span[^>]*>/g, '')) {
       return false
     }
   }
   return true
 }
  changeToEditState = (tcin, featureBullets) => {
    var temp = ''
    featureBullets.map(data => {
      temp += data.replace(/<\/?span[^>]*>/g, '') + '\n'
    })
    this.setState({ featureBulletsEdit: temp })
    this.props.changeToEditStateFeatureBullets(tcin, true)
  }

  render () {
    return (
      <EditFeatureBullets
        tcin={this.props.data.tcin}
        updateFeatureBullets={this.updateFeatureBullets}
        featureBullets={this.props.data.featureBullets}
        isFeatureBulletsEditable={this.props.data.isFeatureBulletsEditable}
        featureBulletsEdit={this.state.featureBulletsEdit}
        changeToEditState={this.changeToEditState}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateFeatureBullets,
    changeToEditStateFeatureBullets,
    updateSelectedFeatureBullets,
    checkProfanity,
  }, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(styles)(EditFeatureBulletsContainer))

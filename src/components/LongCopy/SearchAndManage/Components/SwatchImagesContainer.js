import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  updateCurrentImages,
} from '../../../../store/longCopy/actionCreator'
import SwatchImages from './SwatchImages'
class SwatchImagesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  changeSwatch = (item) => {
    let swatchImages = item.tcin !== null ? item.tcin : null
    this.props.updateCurrentImages(item.enrichment, swatchImages)
  }

  onKeyPressHandler = () => {
    // do something in fututre
  }

  render () {
    return (
      <SwatchImages
        selectedItemData={this.props.selectedItemData}
        changeSwatch={this.changeSwatch}
        onKeyPressHandler={this.onKeyPressHandler}
        currentSwatch={this.props.currentSwatch} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCurrentImages,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    selectedCopyData,
    selectedItemData,
    currentSwatch,
  } = longCopy
  return {
    selectedCopyData,
    selectedItemData,
    currentSwatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SwatchImagesContainer))

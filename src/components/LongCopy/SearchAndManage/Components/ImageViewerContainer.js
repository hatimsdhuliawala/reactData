import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  updateCurrentSelectedImage,
} from '../../../../store/longCopy/actionCreator'
import ImageViewer from './ImageViewer'
class ImageViewerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  onClickHandler = () => {
    this.props.newFilterAction(true)
  }

  changeImage = (imageId) => {
    this.props.updateCurrentSelectedImage(imageId)
  }

  onKeyPressHandler = () => {
    // do something in fututre
  }

  render () {
    return (
      <ImageViewer
        selectedItemData={this.props.selectedItemData}
        currentImage={this.props.currentImage}
        changeImage={this.changeImage}
        onKeyPressHandler={this.onKeyPressHandler}
        currentImagesSelected={this.props.currentImagesSelected} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateCurrentSelectedImage,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    selectedCopyData,
    selectedItemData,
    currentImage,
    currentImagesSelected,
  } = longCopy
  return {
    selectedCopyData,
    selectedItemData,
    currentImage,
    currentImagesSelected,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImageViewerContainer))

import React from 'react'
import SimilarItem from './SimilarItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  startOver,
  nextImage,
  sendSimilarItemValidation,
  skipCurrentImage,
} from '../../../../store/images/classification/actionCreator'

class TagSelectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  startOver = () => {
    this.props.startOver()
  }

  skipCurrentImage = () => {
    this.props.skipCurrentImage(this.props.currentSimilarImageCount, this.props.maxSimilarImageCount)
  }

  approveCurrentImage = () => {
    let user = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.sendSimilarItemValidation(user, true, this.props.currentSimilarImageCount, this.props.maxSimilarImageCount, this.props.similarImageData[this.props.currentSimilarImageCount])
  }

  rejectCurrentImage = () => {
    let user = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.sendSimilarItemValidation(user, false, this.props.currentSimilarImageCount, this.props.maxSimilarImageCount, this.props.similarImageData[this.props.currentSimilarImageCount])
  }

  render () {
    const { similarImageData, selectedImage, currentSimilarImageCount, similarImageFetching } = this.props
    return (
      <SimilarItem
        startOver={this.startOver}
        similarImageData={similarImageData}
        selectedImage={selectedImage}
        currentSimilarImageCount={currentSimilarImageCount}
        similarImageFetching={similarImageFetching}
        skipCurrentImage={this.skipCurrentImage}
        rejectCurrentImage={this.rejectCurrentImage}
        approveCurrentImage={this.approveCurrentImage}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    startOver,
    nextImage,
    sendSimilarItemValidation,
    skipCurrentImage,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
    auth,
  } = state
  const {
    similarImageFetching,
    similarImageData,
    selectedImage,
    currentSimilarImageCount,
    maxSimilarImageCount,
  } = classification
  return {
    auth,
    similarImageData,
    selectedImage,
    currentSimilarImageCount,
    similarImageFetching,
    maxSimilarImageCount,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagSelectionContainer))

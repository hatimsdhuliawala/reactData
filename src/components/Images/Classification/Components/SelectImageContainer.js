import React from 'react'
import SelectImage from './SelectImage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  selectImage,
  imageSelectedContinue,
  getTagData,
} from '../../../../store/images/classification/actionCreator'

class SelectImageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  selectImage = (item) => {
    this.props.selectImage(item)
  }

  imageSelectedContinue = () => {
    this.props.imageSelectedContinue()
    this.props.getTagData(this.props.selectedImage)
  }

  render () {
    const { tcinList, imageList, imageListFetching,
      selectedImage } = this.props
    return (
      <SelectImage
        tcinList={tcinList}
        imageList={imageList}
        imageListFetching={imageListFetching}
        selectImage={this.selectImage}
        selectedImage={selectedImage}
        imageSelectedContinue={this.imageSelectedContinue}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    selectImage,
    imageSelectedContinue,
    getTagData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
    auth,
  } = state
  const {
    tcinList,
    imageList,
    imageListFetching,
    selectedImage,
  } = classification
  return {
    tcinList,
    auth,
    imageList,
    imageListFetching,
    selectedImage,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectImageContainer))

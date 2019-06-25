import React from 'react'
import ClassificationPage from './ClassificationPage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  startOver,
  backToSelectTags,
  backToSelectImage,
  tagDataSelection,
  backToEnterTcin,
} from '../../../../store/images/classification/actionCreator'

class ClassificationPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  startOver = () => {
    this.props.startOver()
  }

  backToSelectTags = () => {
    this.props.backToSelectTags()
  }

  backToSelectImage = () => {
    this.props.backToSelectImage()
    this.props.tagDataSelection([])
  }

  backToEnterTcin = () => {
    this.props.backToEnterTcin()
  }

  render () {
    const { currentActiveStep, currentSimilarImageCount } = this.props
    return (
      <ClassificationPage
        currentActiveStep={currentActiveStep}
        startOver={this.startOver}
        backToSelectTags={this.backToSelectTags}
        backToSelectImage={this.backToSelectImage}
        backToEnterTcin={this.backToEnterTcin}
        currentSimilarImageCount={currentSimilarImageCount}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    startOver,
    backToSelectTags,
    backToSelectImage,
    tagDataSelection,
    backToEnterTcin,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
    auth,
  } = state
  const {
    currentActiveStep,
    currentSimilarImageCount,
  } = classification
  return {
    auth,
    currentActiveStep,
    currentSimilarImageCount,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClassificationPageContainer))

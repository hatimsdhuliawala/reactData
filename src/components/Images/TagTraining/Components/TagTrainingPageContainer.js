import React from 'react'
import TagTrainingPage from './TagTrainingPage'
import { connect } from 'react-redux'

class TagTrainingPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    const { imageUrlsFetching, imageUrlInfo } = this.props
    return (
      <TagTrainingPage
        imageUrlsFetching={imageUrlsFetching}
        imageUrlInfo={imageUrlInfo}
      />
    )
  }
}

const mapStateToProps = state => {
  const {
    tagTraining,
    auth,
  } = state
  const {
    imageUrlsFetching,
    imageUrlInfo,
  } = tagTraining
  return {
    auth,
    imageUrlsFetching,
    imageUrlInfo,
  }
}

export default connect(mapStateToProps, null)(TagTrainingPageContainer)

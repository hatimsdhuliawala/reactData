import React from 'react'
import ImageGrid from './ImageGrid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getImageUrlsForModelLabel } from '../../../../store/images/tagTraining/actionCreator'

class ImageGridContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  render () {
    return (
      <React.Fragment>
        <ImageGrid
          imageUrlInfo={this.props.imageUrlInfo}
          imageUrlsFetching={this.props.imageUrlsFetching}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getImageUrlsForModelLabel,
  }, dispatch)

const mapStateToProps = state => {
  const {
    tagTraining,
    auth,
  } = state
  const {
    imageUrlInfo,
    imageUrlsFetching,
  } = tagTraining
  return {
    auth,
    imageUrlInfo,
    imageUrlsFetching,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGridContainer)

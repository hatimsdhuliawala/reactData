import React from 'react'
import TagType from './TagType'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getImageUrlsForModelLabel,
  getTagsListFromApi,
  initiateModelTraining,
} from '../../../../store/images/tagTraining/actionCreator'

class TagTypeContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    this.props.getTagsListFromApi()
  }

  toggleTagVisibility (tagGroup) {
    let tagsToUpdate = this.props.tags
    tagsToUpdate.map(tag => {
      if (tag.group === tagGroup) {
        tag.visible = !tag.visible
      }
    })

    this.props.updateTagGroups(tagsToUpdate)
  }

  render () {
    const { auth, tags, isTrainingRequesting } = this.props
    return (
      <React.Fragment>
        <TagType
          userEmail={auth.email}
          tags={tags}
          isTrainingRequesting={isTrainingRequesting}
          getImageUrlsForModelLabel={(model, label) => this.props.getImageUrlsForModelLabel(model, label)}
          initiateModelTraining={(id, userEmail) => this.props.initiateModelTraining(id, userEmail)}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getImageUrlsForModelLabel,
    getTagsListFromApi,
    initiateModelTraining,
  }, dispatch)

const mapStateToProps = state => {
  const {
    tagTraining,
    auth,
  } = state
  const {
    tags,
    isTrainingRequesting,
  } = tagTraining
  return {
    auth,
    tags,
    isTrainingRequesting,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagTypeContainer)

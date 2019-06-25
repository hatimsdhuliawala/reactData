import React from 'react'
import TagSelection from './TagSelection'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  tagSelectedContinue,
  tagDataSelection,
  getSimilarItems,
} from '../../../../store/images/classification/actionCreator'
import _ from 'lodash'

class TagSelectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  tagSelectedContinue = () => {
    this.props.tagSelectedContinue()
    let emailId = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    this.props.getSimilarItems(this.props.selectedImage, emailId)
  }

  tagDataSelection = (data, event) => {
    var addTagData = []
    _.each(this.props.tagSelectedData, (item) => {
      if (item.tag_group !== data) {
        addTagData.push(item)
      }
    })

    if (event.target.value !== 'none') {
      addTagData.push({ tag_group: data, tag_name: event.target.value })
    }
    this.props.tagDataSelection(addTagData)
  }
  render () {
    const { selectedImage, tagData, tagSelectedData, tagDataFetching, tagData1 } = this.props
    return (
      <TagSelection
        selectedImage={selectedImage}
        tagSelectedContinue={this.tagSelectedContinue}
        tagData={tagData}
        tagDataSelection={this.tagDataSelection}
        tagSelectedData={tagSelectedData}
        tagDataFetching={tagDataFetching}
        tagData1={tagData1}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    tagSelectedContinue,
    tagDataSelection,
    getSimilarItems,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
    auth,
  } = state
  const {
    selectedImage,
    tcinList,
    tagData,
    tagData1,
    tagSelectedData,
    tagDataFetching,
  } = classification
  return {
    auth,
    selectedImage,
    tagData,
    tagSelectedData,
    tcinList,
    tagDataFetching,
    tagData1,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TagSelectionContainer))

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getModalMetadata,
} from '../../../../store/longCopy/editLongCopyActionCreator'
import ModalData from './ModalData'
class ModalDataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    this.props.getModalMetadata(this.props.selectedCopyData.tcin)
  }
  render () {
    const { modalMetadata, modalMetadataFetching } = this.props
    return (
      <ModalData
        modalMetadata={modalMetadata}
        modalMetadataFetching={modalMetadataFetching}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getModalMetadata,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
    auth,
    form,
  } = state
  const {
    itemDetail,
  } = form
  const {
    selectedCopyData,
    modalMetadata,
    modalMetadataFetching,
  } = longCopy
  return {
    selectedCopyData,
    auth,
    itemDetail,
    modalMetadata,
    modalMetadataFetching,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ModalDataContainer))

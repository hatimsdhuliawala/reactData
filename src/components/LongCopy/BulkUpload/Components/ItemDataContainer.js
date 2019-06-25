import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ItemData from './ItemData'
import styles from '../theme'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getItemData,
} from '../../../../store/bulkUpload/tableActionCreator'

class ItemDataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  getItemData = (tcin) => {
    this.props.getItemData(tcin)
  }

  render () {
    return (
      <ItemData
        tcin={this.props.data.tcin}
        getItemData={this.getItemData}
        itemData={this.props.data.itemData}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getItemData,
  }, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(styles)(ItemDataContainer))

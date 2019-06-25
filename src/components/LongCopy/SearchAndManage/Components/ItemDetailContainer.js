import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  newFilterAction,
} from '../../../../store/longCopy/actionCreator'
import ItemDetail from './ItemDetail'
import _ from 'lodash'
class ItemDetailContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    let selectedItemData = this.props.selectedItemData
    // commented this out because it was unused and causing build fails
    // let selectedCopyData = this.props.selectedCopyData
    this.state = {
      itemDescription: [
        {
          key: 'TCIN',
          value: selectedItemData.tcin ? selectedItemData.tcin : 'Data not available',
        },
        {
          key: 'Launch Date',
          value: selectedItemData.launch_date_time ? selectedItemData.launch_date_time : 'Data not available',
        },
        {
          key: 'Intended Launch Date',
          value: selectedItemData.intended_launch_date_time ? selectedItemData.intended_launch_date_time : 'Data not available',
        },
        {
          key: 'Title',
          value: (selectedItemData.product_description && !_.isEmpty(selectedItemData.product_description)) ? selectedItemData.product_description.title : 'Data not available',
        },
        {
          key: 'Department',
          value: (selectedItemData.merchandise_classification && !_.isEmpty(selectedItemData.merchandise_classification)) ? selectedItemData.merchandise_classification.department_name : 'Data not available',
        },
        {
          key: 'Class',
          value: (selectedItemData.merchandise_classification && !_.isEmpty(selectedItemData.merchandise_classification)) ? selectedItemData.merchandise_classification.class_name : 'Data not available',
        },
        {
          key: 'Division',
          value: (selectedItemData.merchandise_classification && !_.isEmpty(selectedItemData.merchandise_classification)) ? selectedItemData.merchandise_classification.division_name : 'Data not available',
        },
        {
          key: 'Brand',
          value: (selectedItemData.product_brand && !_.isEmpty(selectedItemData.product_brand)) ? selectedItemData.product_brand.manufacturer_brand : 'Data not available',
        },
        {
          key: 'Product Type',
          value: (selectedItemData.product_classification && !_.isEmpty(selectedItemData.product_classification)) ? selectedItemData.product_classification.product_type_name : 'Data not available',
        },
        {
          key: 'Product-Sub Type',
          value: (selectedItemData.product_classification && !_.isEmpty(selectedItemData.product_classification)) ? selectedItemData.product_classification.product_subtype_name : 'Data not available',
        },
        {
          key: 'Merchandise Type',
          value: (selectedItemData.product_classification && !_.isEmpty(selectedItemData.product_classification)) ? selectedItemData.product_classification.merchandise_type_name : 'Data not available',
        },
        {
          key: 'Category',
          value: (selectedItemData.product_classification && !_.isEmpty(selectedItemData.product_classification)) ? selectedItemData.product_classification.item_type ? selectedItemData.product_classification.item_type.category_type : 'Data not available' : 'Data not available',
        },
      ],
      bulletDescription: (selectedItemData.product_description && !_.isEmpty(selectedItemData.product_description)) ? selectedItemData.product_description.bullet_descriptions ? selectedItemData.product_description.bullet_descriptions : null : null,
    }
  }

  onClickHandler = () => {
    this.props.newFilterAction(true)
  }

  render () {
    return (
      <ItemDetail
        user={this.props.auth}
        itemDescription={this.state.itemDescription}
        bulletDescription={this.state.bulletDescription}
        selectedItemData={this.props.selectedItemData}
        itemDetail={this.props.itemDetail} />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    newFilterAction,
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
    selectedItemData,
  } = longCopy
  return {
    selectedCopyData,
    selectedItemData,
    auth,
    itemDetail,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemDetailContainer))

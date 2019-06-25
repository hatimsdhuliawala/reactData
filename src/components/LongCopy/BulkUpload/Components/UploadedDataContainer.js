import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import HeaderSectionContainer from './HeaderSectionContainer'
import TableUploadDataContainer from './TableUploadDataContainer'
import styles from '../theme'
import {
  clearUploadData,
} from '../../../../store/bulkUpload/actionCreator'
import {
  Card,
  CardContent,
} from '@material-ui/core'

class UploadedDataContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  render () {
    return (
      <Card className={this.props.classes.marginTopMidium}>
        <CardContent>
          <HeaderSectionContainer />
          <TableUploadDataContainer />
        </CardContent>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    clearUploadData,
  }, dispatch)

const mapStateToProps = state => {
  const {
    bulkUpload,
  } = state
  const {
    uploadData,
  } = bulkUpload
  return {
    uploadData,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadedDataContainer))

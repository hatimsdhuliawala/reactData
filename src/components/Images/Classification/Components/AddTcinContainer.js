import React from 'react'
import AddTcin from './AddTcin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getImageData,
  displayErrorEventClassifier,
} from '../../../../store/images/classification/actionCreator'
import _ from 'lodash'

class AddTcinContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  getImageData = () => {
    var tcin = this.props.classificationForm.values.classifierTcinList
    if (this.validTcin(tcin)) {
      this.props.getImageData(tcin)
    } else {
      this.props.displayErrorEventClassifier('Enter a valid Tcin', true)
    }
  }

  validTcin = (tcin) => {
    var isValid = false
    var validationRegexs = [
      '^[0-9]{5,8}$',
      '^B[0-9]{10,10}$"',
    ]
    _.each(validationRegexs, function (regex) {
      regex = new RegExp(regex)
      if (tcin.match(regex) !== null && tcin.match(regex)[0] === tcin) {
        isValid = true
      }
    })

    return isValid
  }

  render () {
    const { classificationForm } = this.props
    return (
      <AddTcin
        getImageData={this.getImageData}
        classificationForm={classificationForm}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getImageData,
    displayErrorEventClassifier,
  }, dispatch)

const mapStateToProps = state => {
  const {
    classification,
    auth,
    form,
  } = state
  const {
    classificationForm,
  } = form
  const {
    tcinList,
    currentActiveStep,
  } = classification
  return {
    tcinList,
    auth,
    currentActiveStep,
    classificationForm,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddTcinContainer))

import React from 'react'
import OfferGenerationPage from './OfferGenerationPage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import {
  getOfferGenerationData,
  printData,
  displayErrorEventOfferGeneration,
} from '../../../store/offerGeneration/actionCreator'
import _ from 'lodash'

class OfferGenerationPageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
  }

  getOfferGenerationData = () => {
    let offerId = this.props.OfferGenerationForm.values.offerId.trim()
    if (this.validateOfferId(offerId)) {
      this.props.getOfferGenerationData(offerId)
    } else {
      this.props.displayErrorEventOfferGeneration('Enter a valid Offer Id', true)
    }
  }

  printData = () => {
    let printerName = this.props.OfferGenerationForm.values.printerName.trim()
    this.props.printData(printerName, this.props.offerGenerationData)
  }

  validateOfferId (offerId) {
    var isValid = false
    var validationRegexs = [
      '^[0-9]+$',
    ]
    _.each(validationRegexs, function (regex) {
      regex = new RegExp(regex)
      if (offerId.match(regex) !== null && offerId.match(regex)[0] === offerId) {
        isValid = true
      }
    })

    return isValid
  }

  render () {
    const { imageData, pdfData, offerGenerationData, offerFetching, OfferGenerationForm, printerData, printerDataFetching } = this.props
    return (
      <OfferGenerationPage
        imageData={imageData}
        pdfData={pdfData}
        offerGenerationData={offerGenerationData}
        offerFetching={offerFetching}
        getOfferGenerationData={this.getOfferGenerationData}
        printData={this.printData}
        OfferGenerationForm={OfferGenerationForm}
        printerData={printerData}
        printerDataFetching={printerDataFetching}
      />
    )
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getOfferGenerationData,
    printData,
    displayErrorEventOfferGeneration,
  }, dispatch)

const mapStateToProps = state => {
  const {
    offerGeneration,
    auth,
    form,
  } = state
  const {
    OfferGenerationForm,
  } = form
  const {
    imageData,
    pdfData,
    offerGenerationData,
    offerFetching,
    printerData,
    printerDataFetching,
  } = offerGeneration
  return {
    auth,
    imageData,
    pdfData,
    offerGenerationData,
    offerFetching,
    OfferGenerationForm,
    printerData,
    printerDataFetching,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfferGenerationPageContainer))

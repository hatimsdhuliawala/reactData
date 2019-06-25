import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

/* eslint-disable */
const renderTextField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    fullWidth
    multiline
    rowsMax="1"
    autoFocus
    margin="normal"
    {...input}
    {...custom}
  />
)

let OfferGenerationPage = (props) => {
  const { imageData, pdfData, offerGenerationData, offerFetching, pristine,
    getOfferGenerationData, printData, classes, OfferGenerationForm,
    printerData, printerDataFetching } = props
  const maxWidthHeight = '&wid=1000&hei=1000'
  return (
    <React.Fragment>
      <Grid container>
        <Grid item container direction="row" alignItems="center">
          <Grid item xs={6}>
            <Field
              id="offerId"
              name="offerId"
              component={renderTextField}
              placeholder="Enter a Offer Id"
              className={classes.textFieldWidth}
            />
            {OfferGenerationForm && <Button
              className={classes.generateButton}
              disabled={OfferGenerationForm.values.offerId.length <= 0}
              onClick={getOfferGenerationData}>
              Generate
            </Button>}
          </Grid>
            {offerGenerationData !== null && offerGenerationData.length > 0 &&
              <React.Fragment>
                <Grid item container justify="flex-end" alignItems="center" xs={6}>
                  <Grid item>
                    <Field
                      id="printerName"
                      name="printerName"
                      component={renderTextField}
                      placeholder="Enter Printer Name"
                      className={classes.textFieldPrinterWidth}
                    />
                  </Grid>
                  <Grid item>
                    {OfferGenerationForm && <Button
                      className={classes.printButton}
                      onClick={printData}
                      disabled={OfferGenerationForm.values.printerName.length <= 0 }>
                      Print
                    </Button>}
                  </Grid>
                </Grid>
            </React.Fragment>}
          </Grid>
        <Grid item container>
          {offerFetching ? <CircularProgress className={classes.progressBar} /> :
          <React.Fragment>
            {offerGenerationData !== null && <React.Fragment>
              {offerGenerationData.length > 0 ?
                <Grid container>
                  <Grid item container alignItems="center" xs={8}>
                    <a
                      className={classes.linkToURL}
                      href={offerGenerationData[0].sign_url}
                      target="_blank"
                    >
                      {offerGenerationData[0].sign_url}
                    </a>
                  </Grid>
                  {printerDataFetching
                    ?
                    <Grid container item xs={4} justify="flex-end" alignItems="center">
                      <CircularProgress className={classes.marginRight5} />
                    </Grid>
                    : <React.Fragment>
                      { printerData && printerData.length > 0 &&
                         <Grid container item xs={4} justify="flex-end">
                          <span className={classes.marginRight5}>Transaction id: {printerData[0].transaction_id}</span>
                         </Grid>}
                    </React.Fragment>}
                  <Grid item xs={12} container justify="center" alignItems="center">
                    {/* <object data={`${offerGenerationData[0].sign_url}${maxWidthHeight}`}
                      className={classes.previewLarge}>
                      <embed src={`${offerGenerationData[0].sign_url}${maxWidthHeight}`} />
                    </object> */}
                    <img src={offerGenerationData[0].sign_url} alt={offerGenerationData[0].sign_url} className={classes.previewLargeFull} />
                  </Grid>
                </Grid>
            : <Grid container> There is no data available for this offer id</Grid>}
          </React.Fragment>}
          </React.Fragment>}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

OfferGenerationPage = reduxForm({ form: 'OfferGenerationForm' })(OfferGenerationPage)
OfferGenerationPage = connect(
  state => ({
    initialValues: {
      offerId: '',
      printerName: '',
    },
  }),
)(OfferGenerationPage)
export default withStyles(styles)(OfferGenerationPage)

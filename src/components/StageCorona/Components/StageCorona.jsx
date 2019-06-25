import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import HelpDrawerContainer from './HelpDrawerContainer'
import { Field, reduxForm } from 'redux-form'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
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
    rowsMax="3"
    autoFocus
    margin="normal"
    {...input}
    {...custom}
  />
)
/* eslint-enable */
let StageCorona = (props) => {
  const { classes, helpActionDrawer, resetData, pristine, imageDataCorona, publishData, previewData, isFetchingCorona, removeItem } = props
  return (
    <React.Fragment>
      <Grid container className={classes.marginTop20}>
        <Grid item xs={6} container direction="row">
          <Grid item>
            <Field
              id="stageTcinList"
              name="stageTcinList"
              component={renderTextField}
              placeholder="enter a TCIN or list of TCINs and Preview the results"
              disabled={imageDataCorona.length > 0}
              className={classes.textFieldWidth}
            />
          </Grid>
          <Button
            className={classes.resetButton}
            disabled={pristine && imageDataCorona.length <= 0}
            onClick={resetData}>
              Reset
          </Button>
          {imageDataCorona.length > 0
            ? <Button
              className={classes.previewPublishButton}
              onClick={publishData}>
                Publish
            </Button>
            : <Button
              className={classes.previewPublishButton}
              disabled={pristine}
              onClick={previewData}>
                Preview
            </Button>}
        </Grid>
        <Grid item xs={6} container justify="flex-end"> <div role="presentation" onClick={helpActionDrawer} className={classes.aboutPageButton}>WHAT IS THIS PAGE?</div></Grid>
      </Grid>
      <React.Fragment>
        {isFetchingCorona && <CircularProgress size={25} color="secondary" />}
        {imageDataCorona.length > 0 &&
          <div className={classes.table}>
            <Table aria-labelledby="tableTitle">
              <TableBody>
                {imageDataCorona.map((n, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={{ width: '100px' }}><img src={n.primary_image_url} alt={n.tcin} className={classes.stageImage} /></TableCell>
                      <TableCell style={{ width: '100px' }}>{n.tcin}</TableCell>
                      <TableCell style={{ width: '10px' }}> <DeleteIcon onClick={() => removeItem(n.tcin)} className={classes.deleteicon} /></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div> }
      </React.Fragment>
      <HelpDrawerContainer />
    </React.Fragment>
  )
}
StageCorona = reduxForm({ form: 'stageCoronaForm' })(StageCorona)
StageCorona = connect(
  state => ({
    initialValues: {
      stageTcinList: '',
    },
  }),
)(StageCorona)
export default withStyles(styles)(StageCorona)

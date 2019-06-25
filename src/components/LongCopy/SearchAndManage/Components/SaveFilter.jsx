import React from 'react'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import {
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
/* eslint-disable */
const renderTextField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    fullWidth
    autoFocus
    margin="normal"
    {...input}
    {...custom}
  />
)
/* eslint-enable */
let SaveFilter = props => {
  const { pristine } = props
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      open={props.isSaveFilterOpen}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle
        id="confirmation-dialog-title"
        className="saveFilterTitle"
      >
        <div>
          <Typography variant="subtitle2" gutterBottom className={props.classes.saveTitleText} >
            Save New Search
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent className={props.classes.marginTop20}>
        <Grid container
          direction="column"
        >
          <Field
            className={props.classes.saveFilterWidth}
            id="saveFilter"
            name="saveFilter"
            component={renderTextField}
          />
          {props.saveFilter && props.saveFilter.values.saveFilter.length < 200
            ? <span className={props.classes.helperTextLabel}>Please provide filter name</span>
            : <span className={props.classes.maxExceeded}>You’ve exceeded the max of 200 characters.</span>}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className={props.classes.drawerButtonCancel} onClick={() => { props.handleClose() }}>
          Cancel
        </Button>
        <Button
          className={props.classes.drawerButtonSave}
          onClick={() => { props.handleSave() }}
          disabled={pristine ||
            props.saveFilter.values.saveFilter.length > 200}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
SaveFilter = reduxForm({ form: 'saveFilter' })(SaveFilter)
SaveFilter = connect(
  state => ({
    initialValues: {
      saveFilter: '',
    }, // pull initial values from account reducer
  }),
)(SaveFilter)
export default withStyles(styles)(SaveFilter)

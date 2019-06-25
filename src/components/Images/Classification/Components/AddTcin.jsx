import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  TextField,
  Button,
} from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
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
    rowsMax="1"
    autoFocus
    margin="normal"
    {...input}
    {...custom}
  />
)

let AddTcin = (props) => {
  const { getImageData, pristine, classes } = props
  return (
    <React.Fragment>
      <Field
        id="classifierTcinList"
        name="classifierTcinList"
        component={renderTextField}
        placeholder="enter a TCIN"
        className={classes.textFieldWidth}
      />
      <Button
        className={classes.searchTcinButton}
        disabled={pristine}
        onClick={getImageData}>
        Search
      </Button>
    </React.Fragment>
  )
}

AddTcin = reduxForm({ form: 'classificationForm' })(AddTcin)
AddTcin = connect(
  state => ({
    initialValues: {
      classifierTcinList: '',
    },
  }),
)(AddTcin)
export default withStyles(styles)(AddTcin)

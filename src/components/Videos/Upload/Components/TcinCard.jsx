import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
  Card,
  TextField,
} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ErrorTcinCardContainer from './ErrorTcinCardContainer'

const renderTitleField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    multiline
    rows="1"
    fullWidth
    margin="normal"
    {...input}
    {...custom}
  />
)

let TcinCard = (props) => {
  const { classes, tcinList, addTcin, deleteTcin, uploadPageForm, editMode, editModeTitle } = props
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Card style={{ margin: '10px', padding: '15px', minHeight: '210px' }}>
            <div className={classes.vuAddTcinTitle}> Attach TCINs</div>
            <ChipInput
              value={tcinList}
              fullWidth
              blurBehavior="add"
              onAdd={(chips) => addTcin(chips)}
              onDelete={(deletedChip) => deleteTcin(deletedChip)}
              className={props.classes.formControl}
              placeholder="Enter TCIN(s)"
              disabled={editMode}
            />
            <div className={classes.vuTcinRequiredMessage}>{tcinList.length <= 0 && <span> Video TCIN(s) is required</span>}</div>
            {!editMode ? <Field
              className={classes.editLongCopy}
              id="tcinTitle"
              name="tcinTitle"
              component={renderTitleField}
              placeholder="Enter Video Title"
              disabled={editMode}
            />
              : <TextField
                multiline
                rows="1"
                fullWidth
                margin="normal"
                defaultValue={editModeTitle}
                disabled
              />}
            {!editMode && <div className={classes.vuTcinRequiredMessage}>{uploadPageForm && uploadPageForm.values.tcinTitle.length <= 0 && <span> Video title is required</span>}</div>}
          </Card>
        </Grid>
        <ErrorTcinCardContainer />
      </Grid>
    </React.Fragment>
  )
}
TcinCard = reduxForm({ form: 'uploadPageForm' })(TcinCard)
TcinCard = connect(
  state => ({
    initialValues: {
      tcinTitle: '',
    }, // pull initial values from account reducer
  }),
)(TcinCard)
export default withStyles(styles)(TcinCard)

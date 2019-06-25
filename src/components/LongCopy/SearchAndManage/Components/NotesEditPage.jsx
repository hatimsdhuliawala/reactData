import React from 'react'
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'

function isCopyWriter (userInfo) {
  var returnGroup = true
  var adminGroup = false
  _.each(userInfo.memberOf, function (group) {
    var upperGroup = group.toUpperCase()
    if (_.includes(upperGroup, 'APP-CEP-COPYWRITING') && !adminGroup) {
      returnGroup = false
    }
    if (_.includes(upperGroup, 'ADMN-CEP-PROD')) {
      returnGroup = true
      adminGroup = true
    }
  })
  return returnGroup
}

function wordCount (input) {
  if (input.length) {
    let input1
    input1 = input.replace(/(^\s*)|(\s*$)/gi, '').replace(/[ ]{2,}/gi, ' ').replace(/\n /, '\n')
    return input1.split(' ').length
  }
  return 0
}

const renderTextAreaField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    multiline
    rows="14"
    fullWidth
    margin="normal"
    {...input}
    {...custom}
  />
)

let NotesEditPage = props => {
  const { pristine, handlePlannerNotesEvent } = props
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <div className={props.classes.margin}>
                    <Field
                      id="notes"
                      name="notes"
                      disabled={!isCopyWriter(props.user)}
                      component={renderTextAreaField}
                      label="Notes from Content Planners"
                    />
                  </div>
                  {isCopyWriter(props.user) && <Grid
                    justify="space-between"
                    container
                    spacing={40}
                  >
                    <Grid item />
                    <Grid item>
                      {props.itemDetail ? <span className={props.classes.notesWordCount}>
                        {wordCount(props.itemDetail.values.notes)} words
                      </span> : null}
                    </Grid>
                  </Grid> }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {isCopyWriter(props.user) && <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                className={props.classes.buttonSaveNote}
                disabled={pristine}
                onClick={() => handlePlannerNotesEvent()}
              >
                Save Note
                <SaveIcon />
              </Button>
            </Grid>
          </Grid> }
        </CardContent>
      </Card>
    </Grid>
  )
}
NotesEditPage = reduxForm({ form: 'itemDetail' })(NotesEditPage)
NotesEditPage = connect(
  state => ({
    initialValues: {
      notes: state.longCopy.plannerNotes ? state.longCopy.plannerNotes.length ? state.longCopy.plannerNotes : '' : '',
    }, // pull initial values from account reducer
  }),
)(NotesEditPage)
export default withStyles(styles)(NotesEditPage)

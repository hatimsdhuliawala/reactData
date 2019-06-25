import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import {
  Grid,
  TextField,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
/* eslint-disable */
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
    rows="15"
    fullWidth
    margin="normal"
    placeholder="Enter VTT Text"
    {...input}
    {...custom}
  />
)


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
    rows="1"
    autoFocus
    margin="normal"
    placeholder="Enter VTT Title"
    {...input}
    {...custom}
  />
)
/* eslint-enable */
function convertTotText (input) {
  var text = ''
  input.forEach(item => {
    text = text + item + '\n'
  })
  return text
}

function getDefaultVtt () {
  return 'WEBVTT\n\n00:00:00.000 --> 00:00:01.000\n[no audio]'
}

let DialogBoxEditVtt = (props) => {
  const { closeEditVtt, vttEditBoxOpen, onSave, classes, editVtt } = props
  return (
    <React.Fragment>
      {vttEditBoxOpen && <Dialog
        open={vttEditBoxOpen}
        onClose={() => closeEditVtt()}
        maxWidth={'md'}
      >
        <DialogTitle className={classes.headerVttError} id="alert-dialog-title">
          <Grid container direction="row" justify="center">
            <Grid item xs={6}>
              <span className={classes.headerVttErrorTitle}>
                {`VTT Editor`}
              </span>
            </Grid>
            <Grid item container justify="flex-end" alignItems="center" xs={6}>
              <Close className={classes.closeIconCC} onClick={closeEditVtt} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              {<Grid item xs={12}>
                <Field
                  id="vttTitle"
                  name="vttTitle"
                  component={renderTextField}
                  variant="outlined"
                />
              </Grid>}
              {<Grid container item xs={12} direction="row">
                <Field
                  id="vttData"
                  name="vttData"
                  component={renderTextAreaField}
                  variant="outlined"
                />
              </Grid>}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.downloadVTT}
            onClick={() => onSave()}
            disabled={(editVtt && editVtt.values && editVtt.values.vttData.trim() === '') || (editVtt && editVtt.values && editVtt.values.vttTitle.trim() === '')}
          >
            Save
          </Button>
          <Button onClick={event => closeEditVtt()} className={classes.dismissVTT}>
            Close
          </Button>
        </DialogActions>
      </Dialog>}
    </React.Fragment>
  )
}

DialogBoxEditVtt = reduxForm({ form: 'editVtt' })(DialogBoxEditVtt)
DialogBoxEditVtt = connect(
  state => ({
    initialValues: {
      vttTitle: state.videos ? state.videos.vttEditBoxTitle ? state.videos.vttEditBoxTitle : 'untitled.vtt' : 'untitled.vtt',
      vttData: state.videos ? state.videos.vttEditData ? convertTotText(state.videos.vttEditData) : getDefaultVtt() : getDefaultVtt(),
    }, // pull initial values from account reducer
  }),
)(DialogBoxEditVtt)
export default DialogBoxEditVtt

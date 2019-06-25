import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
} from '@material-ui/core'

function escapeHtml (input) {
  return { __html: input }
}

function DialogBoxError (props) {
  const { classes, fileName, dropZoneErrorMessage, dropZoneErrorTitle, confirmWrongFile, validFile } = props
  return (
    <Dialog
      open={validFile}
      onClose={() => confirmWrongFile()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container>
            <Grid item xs={12}><p dangerouslySetInnerHTML={escapeHtml(fileName + ' ' + dropZoneErrorTitle)} className={classes.wrongFileTitle} /></Grid>
            <Grid item xs={12}>
              <p> {dropZoneErrorMessage}</p>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={event => confirmWrongFile()} className={classes.confirmDelete}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default withStyles(styles)(DialogBoxError)

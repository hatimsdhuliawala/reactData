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

function DialogBoxQuickPublish (props) {
  const { classes, quickEditPublishEventHandler, quickEditConfirm, cancelQuickPublish } = props
  return (
    <Dialog
      open={quickEditConfirm}
      onClose={() => cancelQuickPublish()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xs'}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container>
            <Grid container direction="column" item xs={12} className={classes.marginBottom10}>
              <span className={classes.deleteCopyFeatureTitle}>Publish copy / bullets now?</span>
              <span className={classes.deleteCopyFeatureText}>Do you want to immediately publish the edits to copy and/or feature bullets for this item?</span>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={event => cancelQuickPublish()} >
          Cancel
        </Button>
        <Button onClick={event => quickEditPublishEventHandler()} className={classes.deleteCopyFeatureButton}>
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default withStyles(styles)(DialogBoxQuickPublish)

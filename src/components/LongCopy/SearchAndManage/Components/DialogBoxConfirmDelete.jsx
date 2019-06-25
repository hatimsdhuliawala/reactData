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

function DialogBoxConfirmDelete (props) {
  const { classes, confirmDeleteSelection, deleteData, cancelCopyBulletDelete } = props
  return (
    <Dialog
      open={deleteData.confirmationDelete}
      onClose={() => cancelCopyBulletDelete()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xs'}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container>
            <Grid container direction="column" item xs={12} className={classes.marginBottom10}>
              <span className={classes.deleteCopyFeatureConfirmText}>Are you sure you want to delete
                {deleteData.selectDeleteType === 'COPY_ONLY' && ' only long copy '}
                {deleteData.selectDeleteType === 'FEATURE_BULLETS_ONLY' && ' only feature bullets '}
                {deleteData.selectDeleteType === 'COPY_AND_FEATURE_BULLETS' && ' long copy and feature bullets '}
                 for the selected tcins ?</span>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={event => cancelCopyBulletDelete()} >
          Cancel
        </Button>
        <Button onClick={event => confirmDeleteSelection()} className={classes.deleteCopyFeatureButton}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default withStyles(styles)(DialogBoxConfirmDelete)

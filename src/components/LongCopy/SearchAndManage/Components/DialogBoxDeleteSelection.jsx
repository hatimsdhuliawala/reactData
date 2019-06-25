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
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

function DialogBoxDeleteSelection (props) {
  const { classes, selectTypeCopyBulletDelete, deleteData, cancelCopyBulletDelete, handleValueDeleteOption } = props
  return (
    <Dialog
      open={deleteData.showSelectedDeleteType}
      onClose={() => cancelCopyBulletDelete()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xs'}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container>
            <Grid container direction="column" item xs={12} className={classes.marginBottom10}>
              <span className={classes.deleteCopyFeatureTitle}>Delete copy / bullets?</span>
              <span className={classes.deleteCopyFeatureText}>Do you want to remove copy and/or feature bullets for the selected items?</span>
            </Grid>
            <RadioGroup
              aria-label="CopyFeatureBullet"
              name="CopyFeatureBullet"
              value={deleteData.selectDeleteType}
              onChange={handleValueDeleteOption}
            >
              <FormControlLabel value="COPY_ONLY" control={<Radio />} label="COPY" />
              <FormControlLabel value="FEATURE_BULLETS_ONLY" control={<Radio />} label="BULLETS" />
              <FormControlLabel value="COPY_AND_FEATURE_BULLETS" control={<Radio />} label="BOTH" />
            </RadioGroup>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={event => cancelCopyBulletDelete()} >
          Cancel
        </Button>
        <Button onClick={event => selectTypeCopyBulletDelete()} className={classes.deleteCopyFeatureButton}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default withStyles(styles)(DialogBoxDeleteSelection)

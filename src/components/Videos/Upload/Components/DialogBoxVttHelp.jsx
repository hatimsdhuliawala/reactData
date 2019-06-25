import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'

function DialogBoxVttHelp (props) {
  const { closeHelpVtt, vttHelpUrl, vttHelpDialog, classes } = props
  return (
    <React.Fragment>
      {vttHelpDialog && <Dialog
        open={vttHelpDialog}
        onClose={() => closeHelpVtt()}
      >
        <DialogTitle className={classes.headerVttError} id="alert-dialog-title">
          <Grid container direction="row" justify="center">
            <Grid item xs={6}>
              <span className={classes.headerVttErrorTitle}>
                {`Help`}
              </span>
            </Grid>
            <Grid item container justify="flex-end" alignItems="center" xs={6}>
              <Close className={classes.closeIconCC} onClick={closeHelpVtt} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.helpContainer}>
          <DialogContentText id="alert-dialog-description">
            <Grid container justify="center" alignItems="center">
              <div className={classes.helpText}>
                For information on creating and formatting a VTT, please use
                <a target="_blank" href={vttHelpUrl} className={classes.referenceLink} onClick={closeHelpVtt}> this page</a>
              </div>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center" alignItems="center">
            <Button onClick={event => closeHelpVtt()} className={classes.closeHelp}>
              DISMISS
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>}
    </React.Fragment>
  )
}
export default withStyles(styles)(DialogBoxVttHelp)

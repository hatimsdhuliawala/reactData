import React from 'react'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import {
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

function Transition (props) {
  return <Slide direction="up" {...props} />
}
function Confirmation (props) {
  return (
    <React.Fragment>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        keepMounted
        maxWidth="md"
        TransitionComponent={Transition}
        open={props.isConfirmationOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="saveFilterTitle" id="alert-dialog-slide-title">
          <div>
            <Typography variant="subtitle2" gutterBottom className={props.classes.saveTitleText} >
              Confirmation
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={props.classes.marginTop20} id="alert-dialog-slide-description">
            Are you sure you want to delete Filter ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={props.classes.drawerButtonCancel} onClick={() => { props.handleCancelConfirmation() }}>
            Cancel
          </Button>
          <Button className={props.classes.drawerButtonSave} onClick={() => { props.handleConfirmRemoveFilter() }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default withStyles(styles)(Confirmation)

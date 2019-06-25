import React from 'react'
import {
  Grid,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import TcinSummaryContainer from './TcinSummaryContainer'
import FileStatusContainer from './FileStatusContainer'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
function SystemHealth (props) {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <TcinSummaryContainer />
        </Grid>
        <Grid item xs={6}>
          <FileStatusContainer />
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={props.isMessageShown}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={props.displayMessage}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={props.classes.close}
              onClick={props.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Grid>
    </div>
  )
}

export default withStyles(styles)(SystemHealth)

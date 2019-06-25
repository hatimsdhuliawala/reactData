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
import Build from '@material-ui/icons/Build'
import Error from '@material-ui/icons/Error'
import Close from '@material-ui/icons/Close'

function escapeHtml (input) {
  return { __html: input }
}

function DialogBoxVttError (props) {
  const { errorCC, fileContents, handleDismiss, handleDownloadReport, errorCCDialog, fileName,
    fileErrorLineNumber, editVttDialogBox, classes } = props
  return (
    <React.Fragment>
      {errorCCDialog && <Dialog
        open={errorCCDialog}
        onClose={() => handleDismiss()}
        maxWidth={'md'}
      >
        <DialogTitle className={classes.headerVttError} id="alert-dialog-title">
          <Grid container direction="row" justify="center">
            <Grid item xs={6}>
              <span className={classes.headerVttErrorTitle}>
                {`.VTT file has ${errorCC.length} Errors`}
              </span>
            </Grid>
            <Grid item container justify="flex-end" alignItems="center" xs={6}>
              <Close className={classes.closeIconCC} onClick={handleDismiss} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid container item xs={12} direction="row" className={classes.contentFileName}>
                <Build />
                <span className={classes.contentFileNameText}>Use this report to fix the error(s) in your {fileName} file and then re-upload.</span>
              </Grid>
              <Grid container item xs={12} direction="row" className={classes.vttErrorBox}>
                {errorCC.map(error => {
                  return <Grid direction="row" item container key={error.line} >
                    <Error className={classes.errorIconRed} item />
                    <span className={classes.vttErrorContent} item>{`Line ${error.line} -- `}</span>
                    <span className={classes.vttErrorContent} item dangerouslySetInnerHTML={escapeHtml(error.message)} />
                  </Grid>
                })}
              </Grid>
              <Grid container item xs={12} direction="row" className={classes.hmsVttFileBox}>
                {fileContents.map((fileLine, index) => {
                  return <Grid key={index} container className={classes.marginFileLine}>
                    <span className={fileErrorLineNumber.indexOf(index + 1) > -1 ? classes.hmsVttFileIndexError : classes.hmsVttFileIndex}>{index + 1}</span>
                    <span className={fileErrorLineNumber.indexOf(index + 1) > -1 ? classes.hmsVttErrorLine : null}>{fileLine}</span>
                  </Grid>
                })}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.downloadVTT} onClick={() => editVttDialogBox()}>
            Edit VTT
          </Button>
          <Button className={classes.downloadVTT} onClick={() => handleDownloadReport()}>
            Download Report
          </Button>
          <Button onClick={event => handleDismiss()} className={classes.dismissVTT}>
            DISMISS
          </Button>
        </DialogActions>
      </Dialog>}
    </React.Fragment>
  )
}
export default withStyles(styles)(DialogBoxVttError)

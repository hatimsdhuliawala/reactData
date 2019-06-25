import React from 'react'
import Dropzone from 'react-dropzone'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import PhotoIcon from '@material-ui/icons/Photo'
import ErrorOutline from '@material-ui/icons/ErrorOutline'

function DropZone (props) {
  const { onDrop, ondragenter, ondragleave, dropZoneEnter, invalidFileError,
    removeInvalidFile, invalidFiles, numberValidFiles, clearData, classes, sendToTarget } = props
  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        disableClick
        className={dropZoneEnter ? classes.dropZoneActive : classes.dropZoneNotActive}
        onDragEnter={ondragenter} onDragLeave={ondragleave}
      >
        {({ open }) => (
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <div className={classes.DropZoneLargeText}>Drag & Drop Images</div>
            <Grid justify="center" container alignItems="center" item xs={12}><CloudUpload className={classes.uploadIcon} /></Grid>
            <div className={classes.DropZoneSmallText}>Images must be .jpg/.png/.tif/.psd, at least 1000x1000 pixels and less than 100MB.</div>
            <Grid justify="center" container alignItems="center" item xs={12}><div className={classes.DropZoneMediumText}><a href="https://www.chrome.com"><font color="red">To avoid upload issues please use Chrome</font></a></div></Grid>
            <Grid justify="center" container alignItems="center" item xs={12}>
              <Button role="presentation" onClick={() => open()} className={classes.browseButton}>
                <PhotoIcon />
                <span className={classes.browseButtonText}>browse images </span>
              </Button>
            </Grid>
          </Grid>
        )}
      </Dropzone>
      { numberValidFiles > 0 && <Grid container
        justify="center"
        direction="column"
        alignItems="center"
      >
        { numberValidFiles <= 1
          ? <Grid className={classes.numberOfFilesText} item xs={12}>{numberValidFiles} file ready for upload</Grid>
          : <Grid className={classes.numberOfFilesText} item xs={12}>{numberValidFiles} files ready for upload</Grid>
        }
        <Grid item xs={12}
          direction="row"
          container>
          <Grid item xs={6} container justify="flex-end">
            <Button className={classes.cancelButton} onClick={clearData}>Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.sendToTargetButton} onClick={sendToTarget}>send to target</Button>
          </Grid>
        </Grid>
      </Grid> }

      {invalidFileError && <Dialog
        open={invalidFileError}
        onClose={() => removeInvalidFile()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {invalidFiles.length <= 1
          ? <DialogTitle id="alert-dialog-title">
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={1} container justify="flex-start" alignItems="center">
                <ErrorOutline className={classes.errorTitle} />
              </Grid>
              <Grid item>
                <span className={classes.errorTitle}>{invalidFiles.length} File Error </span>
              </Grid>
            </Grid>

          </DialogTitle>

          : <DialogTitle id="alert-dialog-title">
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={1} container justify="flex-start" alignItems="center">
                <ErrorOutline className={classes.errorTitle} />
              </Grid>
              <Grid item>
                <span className={classes.errorTitle}>{invalidFiles.length} File Errors </span>
              </Grid>
            </Grid>
          </DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invalidFiles.map(file => {
                  return (<TableRow key={file.name}>
                    <TableCell><span>{file.name}</span></TableCell>
                    <TableCell><span>{file.errorMessage}</span></TableCell>
                  </TableRow>)
                })}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={event => removeInvalidFile()} className={classes.confirmDelete}>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
      }
    </div>
  )
}
export default withStyles(styles)(DropZone)

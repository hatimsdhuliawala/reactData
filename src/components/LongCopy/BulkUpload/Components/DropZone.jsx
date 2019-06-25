import React from 'react'
import Dropzone from 'react-dropzone'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
} from '@material-ui/core'
import DialogBoxErrorContainer from './DialogBoxErrorContainer'

function DropZone (props) {
  const { onDrop, ondragenter, ondragleave, dropZoneEnter, classes } = props
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
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={4} container justify="center">
              <p><CloudUpload className={classes.uploadIcon} /></p>
            </Grid>
            <Grid container item xs={8} justify="center">
              <Grid item xs={12}>
                <p className={classes.DropZoneLargeText}>Drag & Drop</p>
                <p className={classes.DropZoneSmallText}>an Excel file containing Copy and Features, or
                  <span role="presentation" onClick={() => open()} className={classes.browseButton}> browse</span>
                </p>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Dropzone>
      <DialogBoxErrorContainer />
    </div>
  )
}
export default withStyles(styles)(DropZone)

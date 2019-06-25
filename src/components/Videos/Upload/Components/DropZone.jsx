import React from 'react'
import Dropzone from 'react-dropzone'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
} from '@material-ui/core'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import Help from '@material-ui/icons/Help'

function DropZone (props) {
  const { onDrop, ondragenter, ondragleave, dropZoneEnter, classes, fileType,
    requiredType, editVttDialogBoxEmpty, openHelpVtt } = props
  const dropzoneRef = React.createRef()
  return (
    <div>
      <Grid container className={classes.videoTitle}>
        <Grid item container xs={11}>
          <Grid item xs={12} className={classes.videoFileTypeTitle}>
            {fileType}
            {requiredType === 'Required' && <ErrorOutline className={classes.errorOutline} />}
          </Grid>
          <Grid item xs={12} className={requiredType === 'Required' ? classes.requiredTypeRequired : classes.requiredTypeOptional}>{requiredType}</Grid>
        </Grid>
        {fileType === 'Closed Caption' &&
          <Grid item xs={1} container alignItems="center" >
            <Help onClick={openHelpVtt} className={classes.helpLink} />
          </Grid> }
      </Grid>
      <Dropzone
        onDrop={(files) => onDrop(fileType, files)}
        className={dropZoneEnter ? classes.dropZoneActive : requiredType === 'Required' ? classes.dropZoneNotActiveRequired : classes.dropZoneNotActiveOptional}
        onDragEnter={() => ondragenter(fileType)} onDragLeave={ondragleave}
        ref={dropzoneRef}
        disableClick
      >
        {({ getRootProps, getInputProps }) => (
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <Grid justify="center" container alignItems="center" item xs={12}><CloudUpload className={classes.videoUploadIcon} /></Grid>
            <Grid item xs={12}><div className={classes.DropZoneSmallText}>No {fileType} Added</div></Grid>
            <Grid item xs={12}><div className={classes.DropZoneSmallText}><hr className={classes.lineSeperator} /></div></Grid>
            <Grid item xs={12}><div className={classes.DropZoneSmallText}>Drag & Drop File Here </div></Grid>
            <Grid item xs={12}><div className={classes.DropZoneSmallText}> or</div></Grid>
            <Grid justify="center" container alignItems="center" item xs={12}>
              <Button role="presentation" onClick={() => dropzoneRef.current.open()} className={classes.browseButton}>
                <span className={classes.browseButtonText}>browse </span>
              </Button>
              {fileType === 'Closed Caption' && <span className={classes.paddingSide15}> or </span>}
              {fileType === 'Closed Caption' && <Button onClick={editVttDialogBoxEmpty} className={classes.browseButton}>
                <span className={classes.browseButtonText}>Create New </span> </Button>}
            </Grid>
          </Grid>
        )}
      </Dropzone>
    </div>
  )
}
export default withStyles(styles)(DropZone)

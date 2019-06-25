import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
  Card,
  Button,
} from '@material-ui/core'
import DropZoneContainer from './DropZoneContainer'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import TcinCardContainer from './TcinCardContainer'
import CloudDone from '@material-ui/icons/CloudDone'
import DialogBoxVttErrorContainer from './DialogBoxVttErrorContainer'
import DialogBoxEditVttContainer from './DialogBoxEditVttContainer'
import { withRouter } from 'react-router-dom'
import DialogBoxVttHelpContainer from './DialogBoxVttHelpContainer'

function UploadPage (props) {
  const { classes, video, closedCaption, posterFrame, transcript, dropZoneEnter, onDrop, removeFile, tcinList, uploadPageForm,
    sendToTarget, videoFileAdded, ccFileAdded, posterFrameFileAdded, transcriptFileAdded, errorCCDialog,
    editMode, deleteAssetJob, videoGroupStatus, editModeTitle, vttEditBoxOpen, editVttDialogBox, vttHelpDialog } = props
  return (
    <React.Fragment>
      <Grid container style={{ marginTop: '30px' }}>
        <TcinCardContainer />
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            {tcinList.length > 0 && <CloudDone className={classes.cloudDone} />}
            <span className={classes.tcinAssociated}>{tcinList.length} TCINs associated.</span>
          </Grid>
          { /* Send to Target Button */ }
          <Grid container item xs={6} alignItems="flex-end" justify="flex-end">
            <Button
              className={classes.sendToTargetUpload}
              onClick={sendToTarget}
              disabled={(editMode ? editModeTitle.length <= 0 : (uploadPageForm && uploadPageForm.values.tcinTitle.length <= 0)) ||
                tcinList.length <= 0 ||
                video.length <= 0 ||
                !videoFileAdded ||
                closedCaption.length <= 0 ||
                !ccFileAdded ||
                (video[0] && video[0].reject_reason && video[0].reject_reason.length > 0) ||
                (closedCaption[0] && closedCaption[0].reject_reason && closedCaption[0].reject_reason.length > 0) ||
                (posterFrame[0] && posterFrame[0].reject_reason && posterFrame[0].reject_reason.length > 0) ||
                (transcript[0] && transcript[0].reject_reason && transcript[0].reject_reason.length > 0) ||
                (videoGroupStatus !== null && videoGroupStatus === 'InProcess') ||
                (videoGroupStatus !== null && videoGroupStatus === 'Approved')
              }
            >
              send to target
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} xl={6} lg={6} md={6} sm={12}>
          <Card style={{ margin: '10px', maxHeight: '475px', minHeight: '475px' }}>
            {video.length > 0 && videoFileAdded
              ? <div>
                <Grid container direction="row" className={classes.videoTitle}>
                  <Grid container item xs={6} justify="flex-start" alignItems="center">
                    <div className={classes.videoFileTypeTitle}>Video</div>
                  </Grid>
                  <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
                    <Grid
                      container
                      item xs={10}
                      justify="flex-end"
                      className={classes.videoHeaderFileName}>
                      <span
                        style={(editMode && video[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') ? { paddingRight: '10px' } : { paddingRight: '40px' }}>
                        {video[0].name ? video[0].name : video[0].file_name}
                      </span>
                    </Grid>
                    {!editMode &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Video')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {editMode && video[0].blobUrl &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Video')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {(editMode && video[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => deleteAssetJob('Video', video[0].job_id)} />
                          </Tooltip>
                        </span>
                      </Grid>}
                  </Grid>
                </Grid>
                {
                  editMode &&
                    <Grid>
                      {video[0].approval_status === 'Rejected' && <div className={classes.rejectedMessage}>Rejected: {video[0].reject_reason}</div>}
                      {video[0].approval_status === 'InProcess' && videoGroupStatus !== 'Rejected' && <div className={classes.waitingForReviewMessage}>Video: Waiting for Review</div>}
                      {video[0].approval_status === 'Approved' && <div className={classes.approvedMessage}>Video: Approved</div>}
                    </Grid>
                }
                <Grid container justify="center">
                  { /* eslint-disable */}
                  <video src={video[0].blobUrl ? video[0].blobUrl : video[0].asset_url} controls crossOrigin="anonymous"
                    className={editMode ? video[0].blobUrl ? classes.vuVideoPreviewlarge : video[0].approval_status === 'Rejected' ? classes.vuVideoPreviewRejected : (editMode && (!video[0].approval_status || video[0].approval_status === 'InProcess') && videoGroupStatus === 'Rejected') ? classes.vuVideoPreviewlarge : classes.vuVideoPreview : classes.vuVideoPreviewlarge}>
                    {closedCaption.length > 0 && closedCaption[0].blobUrl && <track label="English" kind="subtitles" srcLang="en" src={closedCaption[0].blobUrl} default />}
                    {closedCaption.length > 0 && closedCaption[0].asset_url && <track label="English" kind="subtitles" srcLang="en" src={closedCaption[0].asset_url} default />}
                  </video>
                  { /* eslint-enable */ }
                </Grid>
                {
                  editMode && video[0].approval_status === 'Rejected' &&
                  <Grid container justify="center">
                    <Button
                      className={classes.addReplacement}
                      onClick={() => deleteAssetJob('Video', video[0].job_id)}>
                      Add a replacement Video
                    </Button>
                  </Grid>
                }
              </div>
              : <DropZoneContainer
                fileType={'Video'}
                requiredType={'Required'}
                dropZoneEnter={dropZoneEnter.video}
                onDrop={onDrop} />}
          </Card>
        </Grid>
        <Grid item xs={12} xl={6} lg={6} md={6} sm={12}>
          <Card style={{ margin: '10px', maxHeight: '475px', minHeight: '475px' }}>
            {closedCaption.length > 0 && ccFileAdded
              ? <div>
                <Grid container direction="row" className={classes.videoTitle}>
                  <Grid container item xs={6} justify="flex-start" alignItems="center">
                    <div className={classes.videoFileTypeTitle}>Closed Caption</div>
                  </Grid>
                  <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
                    <Grid
                      container
                      item xs={10}
                      justify="flex-end"
                      className={classes.videoHeaderFileName}>
                      <span
                        style={(editMode && closedCaption[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') ? { paddingRight: '10px' } : { paddingRight: '35px' }}>
                        {closedCaption[0].name ? closedCaption[0].name : closedCaption[0].file_name }
                      </span>
                    </Grid>
                    {!editMode &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Edit File">
                            <EditIcon onClick={() => editVttDialogBox()} className={classes.paddingRight5} />
                          </Tooltip>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Closed Caption')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {editMode && closedCaption[0].blobUrl &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Closed Caption')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {(editMode && closedCaption[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') &&
                    <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                      <span>
                        <Tooltip title="Remove File">
                          <DeleteIcon onClick={() => deleteAssetJob('Closed Caption', closedCaption[0].job_id)} />
                        </Tooltip>
                      </span>
                    </Grid>}
                  </Grid>
                </Grid>
                {
                  editMode &&
                  <Grid>
                    {closedCaption[0].approval_status === 'Rejected' && <div className={classes.rejectedMessage}>Rejected: {closedCaption[0].reject_reason}</div>}
                    {closedCaption[0].approval_status === 'InProcess' && videoGroupStatus !== 'Rejected' && <div className={classes.waitingForReviewMessage}>Closed Caption: Waiting for Review</div>}
                    {closedCaption[0].approval_status === 'Approved' && <div className={classes.approvedMessage}>Closed Caption: Approved</div>}
                  </Grid>
                }
                <div className={editMode ? closedCaption[0].blobUrl ? classes.vuCcPreviewLarge : closedCaption[0].approval_status === 'Rejected' ? classes.vuCcPreviewRejected : (editMode && (!closedCaption[0].approval_status || closedCaption[0].approval_status === 'InProcess') && videoGroupStatus === 'Rejected') ? classes.vuCcPreviewLarge : classes.vuCcPreview : classes.vuCcPreviewLarge}>
                  <pre>{closedCaption[0].fileContents}</pre>
                </div>
                {
                  editMode && closedCaption[0].approval_status === 'Rejected' &&
                  <Grid container justify="center">
                    <Button
                      className={classes.addReplacement}
                      onClick={() => deleteAssetJob('Closed Caption', closedCaption[0].job_id)}>
                      Add a replacement Closed Caption
                    </Button>
                  </Grid>
                }
              </div>
              : <DropZoneContainer
                fileType={'Closed Caption'}
                requiredType={'Required'}
                dropZoneEnter={dropZoneEnter.closedCaption}
                onDrop={onDrop} />}
          </Card>
        </Grid>
        <Grid item xs={12} xl={6} lg={6} md={6} sm={12}>
          <Card style={{ margin: '10px', maxHeight: '475px', minHeight: '475px' }}>
            {posterFrame.length > 0 && posterFrameFileAdded
              ? <div>
                <Grid container direction="row" className={classes.videoTitle}>
                  <Grid container item xs={6} justify="flex-start" alignItems="center">
                    <div className={classes.videoFileTypeTitle}>Poster Frame</div>
                  </Grid>
                  <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
                    <Grid
                      container
                      item xs={10}
                      justify="flex-end"
                      className={classes.videoHeaderFileName}>
                      <span style={(editMode && posterFrame[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') ? { paddingRight: '10px' } : { paddingRight: '40px' }}>
                        {posterFrame[0].name ? posterFrame[0].name : posterFrame[0].file_name}
                      </span>
                    </Grid>
                    {!editMode &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Poster Frame')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {editMode && posterFrame[0].blobUrl &&
                      <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                        <span>
                          <Tooltip title="Remove File">
                            <DeleteIcon onClick={() => removeFile('Poster Frame')} />
                          </Tooltip>
                        </span>
                      </Grid>}
                    {(editMode && posterFrame[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') &&
                    <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                      <span>
                        <Tooltip title="Remove File">
                          <DeleteIcon onClick={() => deleteAssetJob('Poster Frame', posterFrame[0].job_id)} />
                        </Tooltip>
                      </span>
                    </Grid>}
                  </Grid>
                </Grid>
                {
                  editMode &&
                    <Grid>
                      {posterFrame[0].approval_status === 'Rejected' && <div className={classes.rejectedMessage}>Rejected: {posterFrame[0].reject_reason}</div>}
                      {posterFrame[0].approval_status === 'InProcess' && videoGroupStatus !== 'Rejected' && <div className={classes.waitingForReviewMessage}>Poster Frame: Waiting for Review</div>}
                      {posterFrame[0].approval_status === 'Approved' && <div className={classes.approvedMessage}>Poster Frame: Approved</div>}
                    </Grid>
                }
                <Grid container justify="center">
                  <img src={posterFrame[0].blobUrl ? posterFrame[0].blobUrl : posterFrame[0].asset_url} alt="test"
                    className={editMode ? posterFrame[0].blobUrl ? classes.vuVideoPreviewlarge : posterFrame[0].approval_status === 'Rejected' ? classes.vuVideoPreviewRejected : (editMode && (!posterFrame[0].approval_status || posterFrame[0].approval_status === 'InProcess') && videoGroupStatus === 'Rejected') ? classes.vuVideoPreviewlarge : classes.vuVideoPreview : classes.vuVideoPreviewlarge} />
                </Grid>
                {
                  editMode && posterFrame[0].approval_status === 'Rejected' &&
                  <Grid container justify="center">
                    <Button
                      className={classes.addReplacement}
                      onClick={() => deleteAssetJob('Poster Frame', posterFrame[0].job_id)}>
                      Add a replacement Posterframe
                    </Button>
                  </Grid>
                }
              </div>
              : <DropZoneContainer
                fileType={'Poster Frame'}
                requiredType={'Optional'}
                dropZoneEnter={dropZoneEnter.posterFrame}
                onDrop={onDrop} />}
          </Card>
        </Grid>
        <Grid item xs={12} xl={6} lg={6} md={6} sm={12}>
          <Card style={{ margin: '10px', maxHeight: '475px', minHeight: '475px' }}>
            {transcript.length > 0 && transcriptFileAdded
              ? <div>
                <Grid container direction="row" className={classes.videoTitle}>
                  <Grid container item xs={6} justify="flex-start" alignItems="center">
                    <div className={classes.videoFileTypeTitle}>Transcript</div>
                  </Grid>
                  <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
                    <Grid
                      container
                      item xs={10}
                      justify="flex-end"
                      className={classes.videoHeaderFileName}>
                      <span style={(editMode && transcript[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') ? { paddingRight: '10px' } : { paddingRight: '40px' }}>
                        {transcript[0].name ? transcript[0].name : transcript[0].file_name}
                      </span>
                    </Grid>
                    {!editMode &&
                    <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                      <span>
                        <Tooltip title="Remove File">
                          <DeleteIcon onClick={() => removeFile('Transcript')} />
                        </Tooltip>
                      </span>
                    </Grid>}
                    {(editMode && transcript[0].approval_status === 'InProcess' && videoGroupStatus === 'Rejected') &&
                    <Grid container item xs={2} justify="flex-start" className={classes.deleteIcon}>
                      <span>
                        <Tooltip title="Remove File">
                          <DeleteIcon onClick={() => deleteAssetJob('Transcript', transcript[0].job_id)} />
                        </Tooltip>
                      </span>
                    </Grid>}
                  </Grid>
                </Grid>
                {
                  editMode &&
                    <Grid>
                      {transcript[0].approval_status === 'Rejected' && <div className={classes.rejectedMessage}>Rejected: {transcript[0].reject_reason}</div>}
                      {transcript[0].approval_status === 'InProcess' && videoGroupStatus !== 'Rejected' && <div className={classes.waitingForReviewMessage}>Transcript: Waiting for Review</div>}
                      {transcript[0].approval_status === 'Approved' && <div className={classes.approvedMessage}>Transcript: Approved</div>}
                    </Grid>
                }
                <Grid container justify="center">
                  <object data={transcript[0].blobUrl ? transcript[0].blobUrl : transcript[0].asset_url}
                    className={editMode ? transcript[0].blobUrl ? classes.vuTranscriptPreviewLarge : transcript[0].approval_status === 'Rejected' ? classes.vuTranscriptPreviewRejected : (editMode && (!transcript[0].approval_status || transcript[0].approval_status === 'InProcess') && videoGroupStatus === 'Rejected') ? classes.vuTranscriptPreviewLarge : classes.vuTranscriptPreview : classes.vuTranscriptPreviewLarge}>
                    <embed ng-src={transcript[0].blobUrl ? transcript[0].blobUrl : transcript[0].asset_url} />
                  </object>
                </Grid>
                {
                  editMode && transcript[0].approval_status === 'Rejected' &&
                  <Grid container justify="center">
                    <Button
                      className={classes.addReplacement}
                      onClick={() => deleteAssetJob('Transcript', transcript[0].job_id)}>
                      Add a replacement Transcript
                    </Button>
                  </Grid>
                }
              </div>
              : <DropZoneContainer
                fileType={'Transcript'}
                requiredType={'Optional'}
                dropZoneEnter={dropZoneEnter.transcript}
                onDrop={onDrop} /> }
          </Card>
        </Grid>
      </Grid>
      {vttEditBoxOpen && <DialogBoxEditVttContainer onDrop={onDrop} />}
      {errorCCDialog && <DialogBoxVttErrorContainer />}
      {vttHelpDialog && <DialogBoxVttHelpContainer />}
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(UploadPage))

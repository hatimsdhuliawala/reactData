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
import envConfigs from '../../../../config/apiConfig'
import _ from 'lodash'

function escapeHtml (input) {
  return { __html: input }
}

function DialogBoxDelete (props) {
  const { data, handleDelete, cancelDeleteConfirmation, classes } = props
  var baseUrl = !_.isEmpty(data.itemData) ? data.itemData.enrichment ? data.itemData.enrichment.images ? data.itemData.enrichment.images.base_url ? data.itemData.enrichment.images.base_url : envConfigs.api.sceneSevenBaseUrl : envConfigs.api.sceneSevenBaseUrl : envConfigs.api.sceneSevenBaseUrl : envConfigs.api.sceneSevenBaseUrl
  var primaryImage = !_.isEmpty(data.itemData) ? data.itemData.enrichment ? data.itemData.enrichment.images ? data.itemData.enrichment.images.primary_image ? data.itemData.enrichment.images.primary_image : 'pipeline_image_missing' : 'pipeline_image_missing' : 'pipeline_image_missing' : 'pipeline_image_missing'
  var title = !_.isEmpty(data.itemData) ? data.itemData.product_description ? data.itemData.product_description.title ? data.itemData.product_description.title : 'No Title Available' : 'No Title Available' : 'No Title Available'

  return (
    <Dialog
      open={data.confirmDelete}
      onClose={() => cancelDeleteConfirmation(data.tcin)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Skip Upload of Long Copy and Features'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container direction="row">
            <Grid container item xs={6}>
              <Grid item xs={4}><img src={baseUrl + primaryImage} alt={data.tcin} className={classes.itemImage} /></Grid>
              <Grid container item xs={8}>
                <Grid item xs={12}>{data.tcin}</Grid>
                <Grid item xs={12}><div dangerouslySetInnerHTML={escapeHtml(title)} /></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div> Do you want to remove the long copy and features from the curerent bulk upload?</div>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancelDeleteConfirmation(data.tcin)}>
          Cancel
        </Button>
        <Button onClick={event => handleDelete(event, data)} className={classes.confirmDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default withStyles(styles)(DialogBoxDelete)

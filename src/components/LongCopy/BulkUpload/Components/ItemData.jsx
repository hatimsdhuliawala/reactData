import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import _ from 'lodash'
import {
  Grid,
} from '@material-ui/core'
import envConfigs from '../../../config/apiConfig'

function escapeHtml (input) {
  return { __html: input }
}

function ItemData (props) {
  const { tcin, classes, getItemData, itemData } = props

  if (_.isEmpty(itemData)) {
    getItemData(tcin)
  }
  if (!_.isEmpty(itemData)) {
    var baseUrl = itemData.enrichment.images ? itemData.enrichment.images.base_url ? itemData.enrichment.images.base_url : envConfigs.api.sceneSevenBaseUrl : envConfigs.api.sceneSevenBaseUrl
    var primaryImage = itemData.enrichment.images ? itemData.enrichment.images.primary_image ? itemData.enrichment.images.primary_image : 'pipeline_image_missing' : 'pipeline_image_missing'
    var title = itemData.product_description ? itemData.product_description.title ? itemData.product_description.title : 'No Title Available' : 'No Title Available'
  }
  return (
    <div>
      {_.isEmpty(itemData) &&
        <div>
          <CircularProgress className={classes.progressBar} />
        </div> }
      {!_.isEmpty(itemData) &&
        <Grid container
          justify="flex-start"
          direction="row"
          alignItems="center"
        >
          <Grid item xs={4}><img src={baseUrl + primaryImage} alt={tcin} className={classes.itemImage} /></Grid>
          <Grid item xs={8}> <div dangerouslySetInnerHTML={escapeHtml(title)} /></Grid>
        </Grid> }
    </div>
  )
}
export default withStyles(styles)(ItemData)

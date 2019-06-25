import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
  Button,
} from '@material-ui/core'

function HeaderSection (props) {
  const { classes, clearData, uploadDataLength, selectedDataLength, publishData } = props
  return (
    <Grid container className={classes.marginBottom10}>
      <Grid item xs={6}
        container
        direction="row"
        justify="flex-start"
        alignItems="center">
        <div className={classes.numberOfUploadedData}>{uploadDataLength} Items</div>
      </Grid>
      <Grid item xs={6}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Button
          className={classes.buttonDiscard}
          onClick={clearData}>
          Discard
        </Button>
        <Button
          disabled={selectedDataLength <= 0}
          className={classes.buttonPublish}
          onClick={publishData}>
          Publish
        </Button>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(HeaderSection)

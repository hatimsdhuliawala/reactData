import React from 'react'
import TagTypeContainer from './TagTypeContainer'
import ImageGridContainer from './ImageGridContainer'
import {
  Paper,
  Grid,
  CircularProgress,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'

function TagTrainingPage (props) {
  const { classes, imageUrlsFetching, imageUrlInfo } = props
  return (
    <React.Fragment>
      <Paper>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={4}>
            <div className={classes.tagPageContainerTitle}>
              <div style={{ fontWeight: 'bold' }}>Tags</div>
            </div>
            <div>
              <TagTypeContainer />
            </div>
          </Grid>
          {imageUrlsFetching ? <CircularProgress disableShrink className={classes.progressCircle} />
            : <Grid item xs={8}>
              {imageUrlInfo.group &&
                <div className={classes.tagPageContainerTitle}>
                  <div style={{ fontWeight: 'bold' }}> Type: </div> <div style={{ paddingLeft: '10px', paddingRight: '50px' }}> {imageUrlInfo.group}</div>
                  <div style={{ fontWeight: 'bold' }}> Tag: </div> <div style={{ paddingLeft: '10px' }}> {imageUrlInfo.label}</div>
                </div>}
              <div>
                <ImageGridContainer />
              </div>
            </Grid>}
        </Grid>
      </Paper>
    </React.Fragment>
  )
}

export default withStyles(styles)(TagTrainingPage)

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import NoThumbnail from '../../../../images/NoThumbnail.svg'

function SimilarItem (props) {
  const { similarImageData, startOver, selectedImage, similarImageFetching, currentSimilarImageCount, classes, skipCurrentImage,
    rejectCurrentImage, approveCurrentImage } = props
  const imageMidWidHeight = '?wid=300&hei=300&fmt=pjpeg'
  const imageLargeWidHeight = '?wid=400&hei=400&fmt=pjpeg'
  return (
    <React.Fragment>
      {similarImageFetching ? <CircularProgress className={classes.progressBar} />
        : <React.Fragment>
          {similarImageData && <Grid container direction="row">
            {selectedImage && <Grid item xs={4}><img key={selectedImage.id} src={selectedImage.publish_url + imageLargeWidHeight} alt={selectedImage.tcin} className={`${classes.marginLeft10} ${classes.marginTop10}`} /></Grid>}
            <Grid item xs={6} container direction="column">
              <div className={classes.similarImageContainer}>
                <Grid item container direction="row">
                  <Grid item xs={6}>
                    <Button
                      className={classes.noImageButton}
                      onClick={rejectCurrentImage}
                    >
                      No
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.yesImageButton}
                      onClick={approveCurrentImage}
                    >
                      Yes
                    </Button>
                  </Grid>
                </Grid>
                <Grid item className={classes.similarImage}>
                  {similarImageData[currentSimilarImageCount] &&
                    <div>
                      <img
                        key={similarImageData[currentSimilarImageCount].tcin}
                        src={similarImageData[currentSimilarImageCount].image_uri + imageMidWidHeight}
                        alt={similarImageData[currentSimilarImageCount].tcin}
                        className={`${classes.marginLeft10} ${classes.marginTop10}`}
                        onError={(e) => { e.target.src = NoThumbnail }}
                      />
                    </div>}
                </Grid>
                <Grid item container direction="row">
                  <Grid item xs={6}>
                    <Button
                      className={classes.skipImageButton}
                      onClick={skipCurrentImage}
                    >
                      Skip
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={classes.startOverImageButton}
                      onClick={startOver}
                    >
                      Start over
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>}
        </React.Fragment>}
    </React.Fragment>
  )
}

export default withStyles(styles)(SimilarItem)

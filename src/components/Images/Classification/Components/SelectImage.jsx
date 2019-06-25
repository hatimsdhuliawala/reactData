import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckCircle from '@material-ui/icons/CheckCircle'

function SelectImage (props) {
  const { tcinList, imageList,
    imageListFetching, selectImage, selectedImage, imageSelectedContinue, classes } = props
  const imageSmallWidHeight = '?wid=154&hei=154&fmt=pjpeg'
  return (
    <React.Fragment>
      {imageListFetching
        ? <CircularProgress className={classes.progressBar} />
        : <Grid container direction="column">
          {imageList && imageList.length <= 0
            ? <Grid item>No Images found for {tcinList}</Grid>
            : <Grid item>{tcinList} has several images... please select one to continue</Grid>}
          <Grid className={classes.marginTop10} item>{imageList && imageList.length > 0 &&
            imageList.map(item => {
              return <span key={item.id}>
                <img key={item.id} src={item.publish_url + imageSmallWidHeight} alt={item.tcin} onClick={() => selectImage(item)} role="presentation" className={selectedImage && selectedImage.id === item.id ? classes.imageBorder : classes.imageWithoutBorder} />
                {selectedImage && selectedImage.id === item.id && <CheckCircle className={classes.selectedCheck} />}
              </span>
            }) }
          </Grid>
          <Grid item>
            {imageList && imageList.length > 0 &&
              <Button
                className={classes.searchTcinButton}
                onClick={imageSelectedContinue}
                disabled={selectedImage === null}>
              Continue
              </Button>}
          </Grid>
        </Grid>}
    </React.Fragment>
  )
}

export default withStyles(styles)(SelectImage)

import React from 'react'
import {
  Card,
  Grid,
  CardContent,
  GridList,
  GridListTile,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import SwatchImagesContainer from './SwatchImagesContainer'
import Magnifier from 'react-magnifier'

function ImageViewer (props) {
  const allImageData = props.currentImagesSelected ? props.currentImagesSelected.images ? props.currentImagesSelected.images : null : null
  const imagwWidHeight = '?wid=1200&hei=1200&fmt=pjpeg'
  const { currentImagesSelected, classes } = props
  return (
    <React.Fragment>
      {currentImagesSelected && currentImagesSelected.images && (currentImagesSelected.images.primary_image || currentImagesSelected.images.alternate_images.length)
        ? <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                  >
                    <Grid item xs={5}>
                      <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="center"
                      >
                        <SwatchImagesContainer />
                        <div className={props.classes.heightImage}>
                          <GridList cellHeight={180} className={props.classes.gridList}>
                            {allImageData.primary_image ? <GridListTile>
                              <img src={allImageData.base_url + allImageData.primary_image + imagwWidHeight}
                                alt={allImageData.primary_image}
                                onClick={() => props.changeImage(allImageData.primary_image)}
                                onKeyPress={props.onKeyPressHandler}
                                role="presentation"
                                className={props.currentImage === allImageData.primary_image ? props.classes.gridListImageSelected : props.classes.gridListImage} />
                            </GridListTile> : null}
                            {allImageData.alternate_images && allImageData.alternate_images.map(imageId => (
                              <GridListTile key={imageId} >
                                <img src={allImageData.base_url + imageId + imagwWidHeight} alt={imageId}
                                  role="presentation"
                                  className={props.currentImage === imageId ? props.classes.gridListImageSelected : props.classes.gridListImage}
                                  value={imageId}
                                  onClick={() => props.changeImage(imageId)}
                                  onKeyPress={props.onKeyPressHandler} />
                              </GridListTile>
                            ))}
                          </GridList>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Card>
                          <Magnifier
                            src={allImageData.base_url + props.currentImage + imagwWidHeight}
                            className={props.classes.selectedImage}
                            mgWidth={200}
                            mgHeight={200}
                            mgShape={'square'}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid> : <Grid container justify="center">
          <span className={`${classes.noHistoryData} ${classes.minHeightCard}`}>No Image data available</span> </Grid>}
    </React.Fragment>
  )
}
export default withStyles(styles)(ImageViewer)

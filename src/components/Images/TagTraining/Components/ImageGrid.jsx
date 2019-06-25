import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'

function ImageGrid (props) {
  const { imageUrlInfo } = props
  const imageDimensions = '?hei=250&wid=250'
  return (
    <React.Fragment>
      {<Grid container>
        {imageUrlInfo.urls.map(image => (
          <Grid
            item
            xl={2}
            lg={3}
            md={4}
            sm={6}
            key={image}>
            <img
              src={`${image}${imageDimensions}`}
              alt="tag"
            />
          </Grid>
        ))}
      </Grid>
      }
    </React.Fragment>
  )
}

export default withStyles(styles)(ImageGrid)

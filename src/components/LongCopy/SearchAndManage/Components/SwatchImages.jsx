import React from 'react'
import {
  Grid,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import CheckCircle from '@material-ui/icons/CheckCircle'
function SwatchImages (props) {
  const { selectedItemData, classes, changeSwatch, onKeyPressHandler, currentSwatch } = props
  const childData = selectedItemData.child_items ? selectedItemData.child_items : []
  const filteredChildData = childData.filter(item => item.enrichment && item.enrichment.images !== null && item.enrichment.images.swatch_image !== null)
  return (
    <React.Fragment>
      {filteredChildData.length > 0
        ? <div className={classes.swatchContainer}>
          <Grid container item xs={12}
            direction="row"
            justify="center"
            alignItems="center">
            {filteredChildData.map(item =>
              <div style={{ width: '98px' }}>
                <img src={item.enrichment.images.base_url + item.enrichment.images.swatch}
                  alt={item.enrichment.images.swatch}
                  onClick={() => changeSwatch(item)}
                  onKeyPress={onKeyPressHandler}
                  role="presentation"
                  className={currentSwatch === item.tcin ? classes.swatchImageSelected : classes.swatchImage} />
                {currentSwatch === item.tcin && <CheckCircle className={classes.selectedCheck} />}
              </div>
            )}
          </Grid>
        </div> : null}
    </React.Fragment>
  )
}
export default withStyles(styles)(SwatchImages)

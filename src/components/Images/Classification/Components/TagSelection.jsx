import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
  Card,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const capitalize = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
function TagSelection (props) {
  const { selectedImage, tagSelectedContinue,
    tagData, tagDataSelection, tagSelectedData, tagDataFetching, classes, tagData1 } = props
  const imageLargeWidHeight = '?wid=300&hei=300&fmt=pjpeg'
  return (
    <React.Fragment>
      {tagDataFetching ? <CircularProgress className={classes.progressBar} />
        : <Grid container direction="column">
          <Grid item>
            {selectedImage &&
              <Grid container direction="row">
                <img key={selectedImage.id} src={selectedImage.publish_url + imageLargeWidHeight} alt={selectedImage.tcin} className={`${classes.marginLeft10} ${classes.marginTop10}`} />
                {tagData && tagData.map(item => {
                  return <Card key={item.group} className={classes.tagCards}>
                    {capitalize(item.group)}
                    <RadioGroup
                      onChange={(e) => tagDataSelection(item.group, e)}>
                      {item.tags && item.tags.map(tagData => {
                        return <FormControlLabel
                          key={tagData.name}
                          value={tagData.name}
                          label={tagData.name}
                          control={<Radio />}
                          aria-label={tagData.name} />
                      })}
                      <FormControlLabel value="none" control={<Radio />} label="none" />
                    </RadioGroup>
                  </Card>
                })}
                {tagData1 && tagData1.map(item => {
                  return <Card key={item.group} className={classes.tagCards}>
                    {capitalize(item.group)}
                    <RadioGroup
                      onChange={(e) => tagDataSelection(item.group, e)}>
                      {item.tags && item.tags.map(tagData => {
                        return <FormControlLabel
                          key={tagData.name}
                          value={tagData.name}
                          label={tagData.name}
                          control={<Radio />}
                          aria-label={tagData.name} />
                      })}
                      <FormControlLabel value="none" control={<Radio />} label="none" />
                    </RadioGroup>
                  </Card>
                })}
              </Grid>
            }
          </Grid>
          <Grid item container direction="row">
            <Button
              className={classes.searchTcinButton}
              onClick={tagSelectedContinue}
              disabled={tagSelectedData.length <= 0}
            >
              Continue
            </Button>
          </Grid>
        </Grid>}
    </React.Fragment>
  )
}

export default withStyles(styles)(TagSelection)

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import {
  Grid,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

function StickerButtons (props) {
  const { classes, item, filterCount, updateFilter } = props
  return (
    <Grid className={classes.statusContainer} container justify="center" alignItems="center" direction="column" onClick={() => updateFilter(item, filterCount[0].isSelected)}>
      <Grid className={classes.buttonNotReady} style={filterCount[0].isSelected ? { border: '9px solid ' + item.color, backgroundColor: item.color } : { border: '9px solid ' + item.color }} item container justify="center" alignItems="center">
        {(filterCount[0].count !== undefined && filterCount[0].count !== -1)
          ? <span>{filterCount[0].count}</span>
          : <CircularProgress />
        }
      </Grid>
      <Grid item className={classes.buttonDisplayName}> {item.display}</Grid>
    </Grid>
  )
}
export default withStyles(styles)(StickerButtons)

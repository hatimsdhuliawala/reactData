import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Grid,
} from '@material-ui/core'

function HeaderSection (props) {
  const { classes, badgesList, isBadgesFetching } = props
  return (
    <Grid container className={classes.marginBottom10}>
      <Grid item xs={6}
        container
        direction="row"
        justify="flex-start"
        alignItems="center">
        <React.Fragment>{!isBadgesFetching && <div className={classes.numberOfUploadedData}>
          {badgesList.length - 1} Badges
        </div>}</React.Fragment>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(HeaderSection)

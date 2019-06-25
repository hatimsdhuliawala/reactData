import React from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  Grid,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

let HelpDrawer = props => {
  const { classes, helpTextContainerOpen, closeEscapeKey, helpActionDrawer,
  } = props
  return (
    <Drawer
      anchor="right"
      open={helpTextContainerOpen}
      onKeyDown={(event) => closeEscapeKey(event, false)}
      className={classes.drawerHelp}
    >
      <Grid container className={classes.helpText}>
        <Grid container item xs={12} alignItems="center" className={classes.closeHelp}>
          <KeyboardArrowRightIcon className={classes.closeHelpBackButton} onClick={() => helpActionDrawer(false)} />
          <p className={classes.closeHelpBackText}>Send Image Data to Corona Stage</p>
        </Grid>
        <Grid item xs={12} className={classes.closeHelpInner}>
          <div className={classes.helpInnerText}>This page allows you to publish item image data to Corona's Stage environment.</div>
          <div className={classes.helpInnerText}> Currently this will send “Primary” image data to satisfy Ready For Launch status.</div>
          <div className={classes.helpInnerText}>If the Primary image does not exist we will substitute this placeholder image:</div>
          <Grid container justify="center">
            <img src="" alt="No prod data" className={classes.nonProdImage} />
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  )
}

HelpDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HelpDrawer)

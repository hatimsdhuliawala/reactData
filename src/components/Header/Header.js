import React from 'react'
import { object, string, func } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { appBarStyles } from 'react-praxis-components/SecondaryNav'

export function Header ({ classes, title, menuAction }) {
  return (
    <div className={classes.header}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          { menuAction && (
            <div className={classes.headerTab}>
              <IconButton onClick={menuAction} classes={{ root: classes.button }} aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <div className={classes.marginLeftMedium}>
                <img alt="Primary" src="" />
              </div>
              <div className={classes.marginLeftMedium}>
                <Typography variant="h6" color="inherit">{title}</Typography>
              </div>
            </div>
          ) }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.displayName = 'Header'

Header.propTypes = {
  classes: object,
  title: string.isRequired,
  menuAction: func,
}

Header.defaultProps = {
  classes: {},
}

const styles = theme => ({
  header: {
    height: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 48,
    },
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  appBar: {
    ...appBarStyles,
  },
  marginLeftMedium: {
    marginLeft: theme.spacing.unit * 2,
  },
  headerTab: {
    display: 'contents',
    // marginTop: theme.spacing.unit * 1,
    // marginBottom: theme.spacing.unit * -5,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
})

export default withStyles(styles)(Header)

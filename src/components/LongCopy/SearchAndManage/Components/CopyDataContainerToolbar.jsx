import React from 'react'
import { Typography, Toolbar, Button } from '@material-ui/core'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import TextsmsIcon from '@material-ui/icons/Textsms'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import GetAppIcon from '@material-ui/icons/GetApp'
import Delete from '@material-ui/icons/Delete'
import _ from 'lodash'

function isCopyWriter (userInfo) {
  var returnGroup = true
  var adminGroup = false
  _.each(userInfo.memberOf, function (group) {
    var upperGroup = group.toUpperCase()
    if (_.includes(upperGroup, 'APP-CEP-COPYWRITING') && !adminGroup) {
      returnGroup = false
    }
    if (_.includes(upperGroup, 'ADMN-CEP-PROD')) {
      returnGroup = true
      adminGroup = true
    }
  })
  return returnGroup
}
function isDeleteAccess (userInfo) {
  var returnGroup = false
  _.each(userInfo.memberOf, function (group) {
    var upperGroup = group.toUpperCase()
    if (_.includes(upperGroup, 'ADMN-CEP-PROD')) {
      returnGroup = true
    }
    if (_.includes(upperGroup, 'APP-CEP-CONTENT')) {
      returnGroup = true
    }
  })
  return returnGroup
}
let CopyDataContainerToolbar = props => {
  const { numSelected, classes, auth, isActionDrawerOpen, deleteBulletAndCopy } = props
  return (
    <React.Fragment>
      {numSelected > 0 && <Toolbar
        style={!isActionDrawerOpen ? { position: 'fixed', bottom: '0', width: '100%' } : null}
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 &&
            <Typography color="inherit">
              {numSelected} selected
            </Typography>
          }
        </div>
        {numSelected > 0 ? null : <div className={classes.spacer} />}
        <div className={classes.actions}>
          {numSelected > 0 && isCopyWriter(auth) &&
            <Button
              className={props.classes.drawerButtonSave}
              onClick={() => props.toggleActionDrawer(true, 'ROUTE_ACTION')}
            >
              <PermContactCalendarIcon />
              Route to Team
            </Button>
          }
          {numSelected > 0 && isCopyWriter(auth) &&
            <Button
              className={props.classes.drawerButtonSave}
              onClick={() => props.toggleActionDrawer(true, 'NOTE_ACTION')}
            >
              <TextsmsIcon />
              Notes
            </Button>
          }
          {numSelected > 0 && isCopyWriter(auth) &&
            <Button
              className={props.classes.drawerButtonSave}
              onClick={() => props.downloadSelectedTcinsCopy()}
            >
              <GetAppIcon />
              DOWNLOAD SELECTED TO EXCEL
            </Button>
          }
          {numSelected > 0 && isDeleteAccess(auth) &&
            <Button
              className={props.classes.drawerButtonSave}
              onClick={() => deleteBulletAndCopy()}
            >
              <Delete />
              DELETE COPY/BULLETS
            </Button>
          }
        </div>
      </Toolbar>}
    </React.Fragment>
  )
}

CopyDataContainerToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

export default withStyles(styles)(CopyDataContainerToolbar)

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import UndoIcon from '@material-ui/icons/Undo'
import CheckIcon from '@material-ui/icons/Check'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SyncDisabledRoundedIcon from '@material-ui/icons/SyncDisabled'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  CircularProgress,
  TextField,
  Tooltip,
  IconButton,
  Snackbar,
} from '@material-ui/core'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styles from '../theme'
import '../../../styles/badges.css'

let TableBadges = props => {
  const { classes, badges, isBadgesFetching, changeToEditState, changeToViewState,
    changedBadgesList, saveBadge, changeBadge, isSaveBadgeSuccess, isBadgeActiveAfterSave,
    resetSaveBadgeSuccess, auth } = props
  const widthHeight = '?wid=75&hei=75&qlt=80&fmt=png-alpha' // const size for badge image
  // method used for each badge row; move to new tag/component?
  let displayBadgeRow = (data) => {
    var badge = Object.assign({}, data)
    changedBadgesList.map(changedBadge => {
      if (badge.id === changedBadge.id) {
        badge = changedBadge
      }
    })
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={badge.id}
      >
        { badge.isBadgeEditable ? <TableCell padding="none" style={{ whiteSpace: 'nowrap' }}><Tooltip title="Revert Changes">
          <IconButton style={{ color: '#b21e1e', margin: '0' }}>
            <UndoIcon onClick={() => changeToViewState(badge)} />
          </IconButton>
        </Tooltip><Tooltip title="Save Changes">
          <IconButton style={{ color: 'green', margin: '0' }}>
            <CheckIcon onClick={() => saveBadge(badge)} />
          </IconButton>
        </Tooltip></TableCell> : null }
        { changedBadgesList.length > 0 && !badge.isBadgeEditable ? <TableCell /> : null }
        <TableCell padding="checkbox" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
          {badge.isBadgeEditable ? <TextField name="badge_rank" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} fullWidth rows="1" defaultValue={badge.badge_rank} placeholder="3" /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.badge_rank ? badge.badge_rank : <Tooltip title="Create new badge from scratch"><IconButton style={{ color: 'green', margin: '0' }}><AddCircleIcon /></IconButton></Tooltip>}</div>}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable
            ? <TextField name="badge_name" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} multiline fullWidth rowsMax="3" defaultValue={badge.badge_name} placeholder="badge name" />
            : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.badge_name ? badge.badge_name : 'Create new badge'}{!badge.active && badge.badge_name && <Tooltip title="Badge is disabled, contact pipeline-help room if you want it enabled."><SyncDisabledRoundedIcon style={{ color: '#a0a0a0' }} /></Tooltip>}</div>}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable ? <TextField name="badge_id" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} rows="1" defaultValue={badge.badge_id} placeholder="654321" /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.badge_id}</div>}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable ? <TextField name="mta_value_name" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} multiline fullWidth rowsMax="3" defaultValue={badge.mta_value_name} placeholder="mta value" /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.mta_value_name}</div>}
        </TableCell>
        <TableCell padding="none">
          {badge.isBadgeEditable ? <TextField name="badge_url" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} multiline fullWidth rowsMax="3" defaultValue={badge.badge_url} placeholder="image url" /> : badge.badge_url && <img src={badge.badge_url + widthHeight} alt={badge.badge_name} />}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable ? <TextField name="mta_name" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} multiline rowsMax="3" defaultValue={badge.mta_name} placeholder="mta name" /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.mta_name}</div>}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable ? <TextField name="mta_id" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} rows="1" defaultValue={badge.mta_id} placeholder="123456" /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.mta_id}</div>}
        </TableCell>
        <TableCell>
          {badge.isBadgeEditable ? <TextField name="badge_description" onChange={(e) => changeBadge(e.target.name, e.target.value, badge)} multiline fullWidth rowsMax="3" style={{ margin: 8 }} defaultValue={badge.badge_description} placeholder="Detailed description of badge." /> : <div role="presentation" onClick={() => changeToEditState(badge)}>{badge.badge_description}</div>}
        </TableCell>
        <TableCell>
          <div role="presentation">{badge.item_count}</div>
        </TableCell>
      </TableRow>
    )
  }
  return (
    <React.Fragment>{!isBadgesFetching && badges.length ? <div>
      <Paper className={classes.copyDataroot}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                { changedBadgesList.length > 0 && <TableCell /> }
                <TableCell padding="checkbox" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>Rank</TableCell>
                <TableCell>Badge Name</TableCell>
                <TableCell style={{ minWidth: '55px' }}>Value Id</TableCell>
                <TableCell style={{ minWidth: '70px' }}>MTA Value</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>MTA Name</TableCell>
                <TableCell style={{ minWidth: '55px' }}>MTA Id</TableCell>
                <TableCell style={{ minWidth: '100px' }}>Description</TableCell>
                <TableCell style={{ minWidth: '40px' }}>Aprox. Item Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {badges
                // .sort((a, b) => a.badge_rank - b.badge_rank)
                .map(data => {
                  if (data.id === 'new' && !auth.permission.badgesEdit) {
                    return
                  }
                  return displayBadgeRow(data)
                })}
            </TableBody>
          </Table>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={isSaveBadgeSuccess}
          autoHideDuration={4000}
          onClose={() => resetSaveBadgeSuccess()}
          ContentProps={{
            'aria-describedby': 'badge-save-message',
          }}
          message={<span id="badge-save-message">{ isSaveBadgeSuccess
            ? (isBadgeActiveAfterSave ? 'Badge Saved Successfully' : 'Badge deactivated, tcin count > 10,000; contact pipeline-help room.')
            : 'Badge Save Failed' }</span>} />
      </Paper>
    </div> : <CircularProgress className={classes.progressBar} />}</React.Fragment>
  )
}

TableBadges = reduxForm({ form: 'tableBadges' })(TableBadges)
TableBadges = connect(
  state => ({
    initialValues: {
      name: '',
    }, // pull initial values from account reducer
  }),
)(TableBadges)
export default withStyles(styles)(TableBadges)

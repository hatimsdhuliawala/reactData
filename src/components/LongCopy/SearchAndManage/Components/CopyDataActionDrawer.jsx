import React from 'react'
import PropTypes from 'prop-types'
import {
  Drawer,
  Grid,
  Typography,
  Toolbar,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import CopyDataContainerToolbar from './CopyDataContainerToolbar'
import CircularProgress from '@material-ui/core/CircularProgress'

let CopyDataActionDrawer = props => {
  const { numSelected, classes,
    isActionDrawerOpen, toggleActionDrawer, drawerAction, selectRouteTeam,
    currentRouteTeam, handleChangePlannerNotes, handlePlannerNotesEvent,
    isLoading, handleRoutingTeamEvent, pristine, auth, closeEscapeKey,
  } = props
  return (
    <Drawer
      anchor="bottom"
      open={isActionDrawerOpen}
      onKeyDown={(event) => closeEscapeKey(event, false)}
    >
      <CopyDataContainerToolbar
        numSelected={numSelected}
        toggleActionDrawer={toggleActionDrawer}
        auth={auth}
        isActionDrawerOpen={isActionDrawerOpen}
      />
      <Toolbar>
        {drawerAction === 'ROUTE_ACTION' &&
          <Grid container className={classes.margin}>
            <Grid item xs={12}>
              <Typography variant="title" gutterBottom>
                <b>Route items for Copy Writing</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="copyWritingTeam"
                  name="copyWritingTeam"
                  value={currentRouteTeam}
                  onChange={(event) => selectRouteTeam(event)}
                >
                  <FormControlLabel value="Periscope" control={<Radio />} label="Periscope" />
                  <FormControlLabel value="India" control={<Radio />} label="India" />
                  <FormControlLabel value="None" control={<Radio />} label="None (vendor will provide)" />
                </RadioGroup>
                <Grid>
                  {isLoading && <CircularProgress size={25} color="secondary" />}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.drawerButtonCancel}
                    onClick={() => toggleActionDrawer(false)}
                  >
                    Cancel
                  </Button>
                  <div className={classes.margin}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.drawerButtonSave}
                      onClick={() => handleRoutingTeamEvent()}
                    >
                      Route
                    </Button>
                  </div>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        }
        {drawerAction === 'NOTE_ACTION' &&
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <TextField
                id="multiline-flexible"
                label="Notes"
                helperText="Please provide notes"
                multiline
                rows="7"
                fullWidth
                onBlur={(event) => handleChangePlannerNotes(event)}
                margin="normal"
                className={props.classes.notesSectionDrawer}
              />
              <Grid>
                {isLoading && <CircularProgress size={25} color="secondary" />}
              </Grid>
              <Grid
                style={{ marginBottom: '19px' }}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.drawerButtonCancel}
                  onClick={() => toggleActionDrawer(false)}
                >
                  Cancel
                </Button>
                <div className={classes.margin}>
                  <Button
                    disabled={pristine}
                    variant="contained"
                    color="primary"
                    onClick={() => handlePlannerNotesEvent()}
                    className={classes.drawerButtonSave}>
                    Save
                  </Button>
                </div>
              </Grid>
            </FormControl>
          </Grid>
        }
      </Toolbar>
    </Drawer>
  )
}

CopyDataActionDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

export default withStyles(styles)(CopyDataActionDrawer)

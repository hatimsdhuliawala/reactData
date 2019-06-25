import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
  FormControl,
  TextField,
  Chip,
  Paper,
} from '@material-ui/core'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import TcinDetails from './TcinDetails'
function SyncTcin (props) {
  return (
    <Paper elevation={12}>
      <Card>
        <CardHeader title="Sync Items" />
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  label="Provide list of TCINs"
                  placeholder="TCINs"
                  multiline
                  rows="3"
                  helperText="List of TCINs"
                  onChange={(event) => props.handleTcinChange(event)}
                  fullWidth
                  margin="normal"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {props.syncTcins.map((item) =>
                <Chip
                  label={item}
                  key={item}
                  className={props.classes.smallMargin}
                  onDelete={() => props.removeSyncTcinHandler(item)} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                className={props.classes.button}
                onClick={() => props.searchTcins()} >
                Search
              </Button>
              {props.tcinDeltaResponse.length > 0 &&
                <Button
                  variant="contained"
                  color="secondary"
                  className={props.classes.button}
                  onClick={() => props.processSyncTcins()} >
                Sync All
                </Button>
              }
              <Button variant="contained"
                onClick={() => props.clearSyncTcins()}
                color="default">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      {props.tcinDeltaResponse &&
        <Grid container spacing={24}>
          {props.tcinDeltaResponse && props.tcinDeltaResponse.map((item) =>
            <TcinDetails key={item.id} item={item} />
          )}
        </Grid>
      }
    </Paper>
  )
}

export default withStyles(styles)(SyncTcin)

import React from 'react'
import {
  Paper,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LoopIcon from '@material-ui/icons/Loop'
function Filter (props) {
  let currentDate = new Date()
  return (
    <Grid>
      <Paper elevation={12}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" >Click to Change Filter</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.details}>
            <TextField
              id="fromDate"
              label="From Date"
              type="date"
              defaultValue={currentDate}
              className={props.classes.textField}
              onBlur={(event) => props.changeFromDateFilter(event)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="toDate"
              label="To Date"
              type="date"
              defaultValue="2017-05-24"
              className={props.classes.textField}
              onBlur={(event) => props.changeToDateFilter(event)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="tcin"
              label="TCIN"
              onBlur={(event) => props.changeTcinFilter(event)}
            />
            <div>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.includeMigration}
                    onChange={() => props.toggleMigration()}
                  />
                }
                label="Include  Migration"
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              className={props.classes.button}
              onClick={(event) => props.requestJobCountData(event)} >
              <LoopIcon /> &nbsp;
              Refresh
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(Filter)

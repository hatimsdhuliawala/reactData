import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  TextField,
  Chip,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import ItemDetailsContainer from './ItemDetailsContainer'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
function ItemDebugger (props) {
  return (
    <Paper elevation={12}>
      <Card>
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
                  rows="2"
                  onChange={(event) => props.handleTcinChange(event)}
                  fullWidth
                  margin="normal"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {props.itemDebugger.selectedItems.map((item) =>
                <Chip
                  label={item}
                  key={item}
                  className={props.classes.smallMargin}
                  onDelete={() => props.removeSelectedItem(item)} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                className={props.classes.button}
                onClick={() => props.fetchItemData()} >
                Search
              </Button>
              <Button variant="contained"
                onClick={() => props.clearSelectedItems()}
                color="default">
                Cancel
              </Button>
              <FormControlLabel className={props.classes.smallMargin}
                control={
                  <Checkbox
                    checked={props.itemDebugger.includeAllVersion}
                    onClick={event => props.toggleIncludeVersion(event)} />
                }
                label="Include all versions?"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      {props.itemDebugger.itemDetails && props.itemDebugger.itemDetails.length > 0 &&
        <ItemDetailsContainer itemDebugger={props.itemDebugger} />
      }
    </Paper>
  )
}

export default withStyles(styles)(ItemDebugger)

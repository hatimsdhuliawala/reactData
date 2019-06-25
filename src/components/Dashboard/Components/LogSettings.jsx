import React from 'react'
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import { LogLevels, ActuatorData } from './DashboardData'
function LogSettings (props) {
  return (
    <Grid>
      <Paper elevation={12}>
        <Card>
          <CardHeader title="Log Settings" />
          <CardContent className={props.classes.systemHealthCardStyle}>
            <Grid container spacing={16}>
              <Grid item xs={16} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <CardHeader subheader="Change Log level" />
                    <Divider />
                    <Grid container direction="column">
                      <FormControl className={props.classes.jobDataContainer}>
                        <InputLabel htmlFor="age-native-simple">Server</InputLabel>
                        <Select
                          native
                          fullWidth
                          className={props.classes.formControl}
                          value={props.selectedLogServerUrl}
                          onChange={props.setLogServerUrl}
                        >
                          <option value="" />
                          {ActuatorData.map((legLevel) => {
                            return (
                              <option key={legLevel.id} value={legLevel.url}>{legLevel.display}</option>
                            )
                          })
                          }
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel htmlFor="age-native-simple">Log Level</InputLabel>
                        <Select
                          native
                          value={props.selectedLogLevel}
                          className={props.classes.formControl}
                          onChange={props.setLogLevel}
                        >
                          <option value="" />
                          {LogLevels.map((legLevel) => {
                            return (
                              <option key={legLevel.id} value={legLevel.value}>{legLevel.display}</option>
                            )
                          })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={props.classes.button}
                        onClick={props.changeLogLevel} >
                        Save
                      </Button>
                      <Button variant="contained" color="default">
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(LogSettings)

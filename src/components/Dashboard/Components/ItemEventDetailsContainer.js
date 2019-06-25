import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'MM-DD-YYYY [at] LT',
}

const styles = theme => ({
  root: {
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
})

function getSteps (events) {
  if (events !== null) {
    return Object.keys(events)
  }
  return ['']
}
function getCurrentEvent (events, label) {
  return events[label]
}
function isEventHasErrorStatus (events, label) {
  let isError = true
  if (events[label].status === 'Complete') {
    isError = false
  }
  return isError
}
class ItemEventDetailsContainer extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  };

  render () {
    const { classes, selectedItem } = this.props
    const steps = getSteps(selectedItem.events)
    const { activeStep } = this.state
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            const labelProps = {}
            if (isEventHasErrorStatus(selectedItem.events, label)) {
              labelProps.error = true
            }
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent>
                  <Card>
                    <CardContent>
                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2">Status:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography>{getCurrentEvent(selectedItem.events, label).status}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2">Start Time:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography>
                            {getCurrentEvent(selectedItem.events, label).start_time &&
                              <Moment calendar={calendarStrings} format="DD-MM-YYYY HH:mm:ss">
                                {getCurrentEvent(selectedItem.events, label).start_time}
                              </Moment>
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2">End Time:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography>
                            {getCurrentEvent(selectedItem.events, label).end_time &&
                              <Moment calendar={calendarStrings} format="DD-MM-YYYY HH:mm:ss">
                                {getCurrentEvent(selectedItem.events, label).end_time}
                              </Moment>
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle2">Error Message:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography>{getCurrentEvent(selectedItem.events, label).error_message}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Please click on below button to go to first event</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

ItemEventDetailsContainer.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(ItemEventDetailsContainer)

/* global _ */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './Theme'
import {
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from '@material-ui/core'
class JobDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open,
      scroll: props.scroll,
      header: 'Job Information',
      content: '',
    }
  }

  handleClose = () => {
    this.props.handleClose()
  };

  readableObject = (context) => {
    if (context) {
      return JSON.stringify(context, undefined, 4)
    } else {
      return 'N/A'
    }
  };

  handleRetry = (retryContext) => {
    this.props.handleRetry(retryContext)
  }
  render () {
    const { data, selectedJobId } = this.props
    const jobDetail = _.cloneDeep(data)
    return (
      <Dialog
        open={this.state.open}
        classes={{ paper: this.props.classes.dialogPaper }}
        onClose={this.handleClose}
        scroll={this.state.scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">{this.state.header}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.selectedJobId}
            {jobDetail !== undefined && jobDetail
              .filter((i) => i.id === selectedJobId)
              .map(n => {
                return (
                  <div className={this.props.classes.root}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                      Basic Job Details:
                    </Typography>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">TCIN</InputLabel>
                      <Input id="name-disabled" fullWidth value={n.tcin} />
                    </FormControl>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">File Name</InputLabel>
                      <Input id="name-disabled" value={n.file_name} />
                    </FormControl>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">Suffix</InputLabel>
                      <Input id="name-disabled" value={n.suffix} />
                    </FormControl>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">View Type</InputLabel>
                      <Input id="name-disabled" value={n.view_type} />
                    </FormControl>
                    <FormControl fullWidth className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">File Path</InputLabel>
                      <Input id="name-disabled" fullWidth value={n.file_path} />
                    </FormControl>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">Created Time</InputLabel>
                      <Input id="name-disabled" value={n.create_time} />
                    </FormControl>
                    <FormControl className={this.props.classes.margin} disabled>
                      <InputLabel htmlFor="name-disabled">Host Name</InputLabel>
                      <Input id="name-disabled" value={n.host_name} />
                    </FormControl>
                    {n.events.validate_file_name &&
                      <Paper elevation={12} className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Validate File Name </u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_file_name.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_file_name.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_file_name.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" multiline
                            rowsMax="4" value={n.events.validate_file_name.error_message ? n.events.validate_file_name.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.validate_file_name.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.validate_file_name.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.validate_file_name.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.validate_file_name.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.validate_file_name.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.validate_file_name.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.image_quality_check &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Quality Check:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.image_quality_check.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.image_quality_check.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.image_quality_check.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" multiline
                            rowsMax="4" value={n.events.image_quality_check.error_message ? n.events.image_quality_check.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.image_quality_check.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.image_quality_check.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.image_quality_check.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.image_quality_check.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.image_quality_check.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.image_quality_check.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.publish &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Publish Event:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.publish.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.publish.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.publish.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" multiline
                            rowsMax="4" value={n.events.publish.error_message ? n.events.publish.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.publish.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.publish.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.publish.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.publish.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.publish.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.publish.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.validate_publish &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Validate Publish Event:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_publish.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_publish.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.validate_publish.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" multiline
                            rowsMax="4" value={n.events.validate_publish.error_message ? n.events.validate_publish.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.validate_publish.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.validate_publish.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.validate_publish.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.validate_publish.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.validate_publish.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.validate_publish.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.notify &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Notify Event:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.notify.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.notify.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.notify.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" multiline
                            rowsMax="4" value={n.events.notify.error_message ? n.events.notify.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.notify.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.notify.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.notify.retry_context &&
                          n.events.notify.retry_context.body &&
                          n.events.notify.retry_context.body.targets &&
                          <div className={this.props.classes.margin}>
                            <Typography variant="caption">
                              <u><b>Publish Image:</b></u>
                            </Typography>
                            <img height="400" width="400" src={n.events.notify.retry_context.body.targets[0].asset_url + '?hei=400&wei=400&1537205593931'} alt="Publish URL" />
                          </div>
                        }
                        {n.events.notify.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.notify.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.notify.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.notify.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.purge &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Purge:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.purge.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.purge.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.purge.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" value={n.events.purge.error_message ? n.events.purge.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.purge.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.purge.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.purge.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.purge.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.purge.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.purge.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.generateLabel &&
                      <Paper elevation={12} square className={this.props.classes.margin}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Generate Label:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.generateLabel.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.generateLabel.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.generateLabel.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" value={n.events.generateLabel.error_message ? n.events.generateLabel.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.generateLabel.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.generateLabel.context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.generateLabel.retry_context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Retry Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.generateLabel.retry_context)}
                            </pre>
                          </FormControl>
                        }
                        {n.events.generateLabel.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.generateLabel.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                    {n.events.generateSwatch &&
                      <Paper elevation={12}>
                        <Typography variant="body2" gutterBottom align="left" className={this.props.classes.padding}>
                          <b><u>Generate Swatch:</u></b>
                        </Typography>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Status</InputLabel>
                          <Input id="name-disabled" value={n.events.generateSwatch.status} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Start Time</InputLabel>
                          <Input id="name-disabled" value={n.events.generateSwatch.start_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">End Time</InputLabel>
                          <Input id="name-disabled" value={n.events.generateSwatch.end_time} />
                        </FormControl>
                        <FormControl className={this.props.classes.margin} disabled>
                          <InputLabel htmlFor="name-disabled">Error Message</InputLabel>
                          <Input id="name-disabled" value={n.events.generateSwatch.error_message ? n.events.generateSwatch.error_message : 'N/A'} />
                        </FormControl>
                        <br />
                        {n.events.generateSwatch.context &&
                          <FormControl className={this.props.classes.margin} disabled>
                            <Typography variant="caption">
                              Context
                            </Typography>
                            <pre>
                              {this.readableObject(n.events.generateSwatch.context)}
                            </pre>
                          </FormControl>
                        }
                        <FormControl className={this.props.classes.margin} disabled>
                          <Typography variant="caption">
                            Retry Context
                          </Typography>
                          <pre>
                            {this.readableObject(n.events.generateSwatch.retry_context)}
                          </pre>
                        </FormControl>
                        {n.events.generateSwatch.retry_context &&
                          <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRetry(n.events.generateSwatch.retry_context)}>
                              Retry
                            </Button>
                          </Grid>
                        }
                      </Paper>
                    }
                  </div>
                )
              })
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

JobDetail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JobDetail)

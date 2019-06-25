import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ItemEventDetailsContainer from './ItemEventDetailsContainer'
import { styles } from './Theme'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core'
class ItemEventDetailsPopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open,
      scroll: props.scroll,
      header: 'Events Information',
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
            <ItemEventDetailsContainer selectedItem={this.props.selectedItem} />
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

ItemEventDetailsPopup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemEventDetailsPopup)

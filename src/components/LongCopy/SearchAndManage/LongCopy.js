import React from 'react'
import { bindActionCreators } from 'redux'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import '../../../styles/longCopy.css'
import MyFilterContainer from './Components/MyFilterContainer'
import BuildFilterContainer from './Components/BuildFilterContainer'
import NewFilterContainer from './Components/NewFilterContainer'
import CopyDataContainer from './Components/CopyDataContainer'
import {
  Snackbar,
  IconButton,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { DefaultState } from './Components/FilterData'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styles from './theme'
import { withStyles } from '@material-ui/core/styles'
import {
  hideErrorEvent,
  buildFilterExpand,
} from '../../../store/longCopy/actionCreator'

class LongCopy extends React.Component {
  constructor (props) {
    super(props)
    this.state = DefaultState
  }
  onNewFilterClickHandler = () => {
    this.props.newFilterAction(true)
  }
  handleErrorClose = () => {
    this.props.hideErrorEvent()
  };
  handlePanel = () => {
    this.props.buildFilterExpand(!this.props.buildFilterExpansionPanel)
  }
  render () {
    const { isFetching, isErrorMessageShown,
      errorMessage,
    } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Search & Manage" />
        <Helmet title="Search & Manage" />
        <Grid container spacing={24}>
          {this.props.myFilterContainerShown &&
            <Grid item xs={12} sm={12}>
              <MyFilterContainer />
            </Grid>
          }
          <React.Fragment>
            {(this.props.buildFilterContainerShown || this.props.newFilterContainerShown) &&
              <ExpansionPanel
                className={this.props.classes.buildFilterExpansion}
                expanded={this.props.buildFilterExpansionPanel}
                onChange={() => this.handlePanel()} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{this.props.buildFilterExpansionPanel ? 'Hide ' : 'Show '} Filter</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.props.buildFilterContainerShown &&
                  <Grid item xs={12} sm={6}>
                    <BuildFilterContainer />
                  </Grid>
                  }
                  {this.props.newFilterContainerShown &&
                  <Grid item xs={12} sm={6}>
                    <NewFilterContainer />
                  </Grid>
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>}
          </React.Fragment>
          {isFetching &&
            <Grid className={this.props.classes.progressBar}>
              <CircularProgress className={this.props.classes.progressBar} />
            </Grid>
          }
          {this.props.copyDataContainerShown && !isFetching &&
          <Grid item xs={12} sm={12}>
            <CopyDataContainer />
          </Grid>
          }
          {isErrorMessageShown &&
            <div>
              <Snackbar
                open={isErrorMessageShown}
                onClose={() => this.handleErrorClose()}
                autoHideDuration={this.props.durationSnackBar}
                message={<span id="message-id">{errorMessage}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.handleErrorClose()}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </div>
          }
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hideErrorEvent,
    buildFilterExpand,
  }, dispatch)

const mapStateToProps = state => {
  const {
    longCopy,
  } = state
  const {
    myFilterContainerShown,
    buildFilterContainerShown,
    newFilterContainerShown,
    copyDataContainerShown,
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
    buildFilterExpansionPanel,
  } = longCopy
  return {
    myFilterContainerShown,
    buildFilterContainerShown,
    newFilterContainerShown,
    copyDataContainerShown,
    isFetching,
    isErrorMessageShown,
    errorMessage,
    durationSnackBar,
    buildFilterExpansionPanel,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LongCopy))

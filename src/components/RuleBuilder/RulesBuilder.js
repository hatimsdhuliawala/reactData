import React from 'react'
import { connect } from 'react-redux'
import { styles } from '../../styles/rulesBuilderStyles'
import HeaderTitle from '../Header/HeaderTitle'
import { Redirect } from 'react-router'
import {
  Stepper,
  Step,
  Paper,
  StepButton,
  withStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import SelectItems from './Components/SelectItems'
import SizeChartEdit from './Components/SizeChartUI'
import HowToMeasure from './Components/HowToMeasure'
import RuleConfirmation from './Components/RuleConfirmation'
import * as apiActions from '../../store/rules/builder/apiActions'
import {
  getAllSizeChartIdentifiers,
  getSizeChart,
  saveSizeChart,
  setSaveSizechartError,
} from '../../store/sizeChartEdit/sizeChartHTTPActions'
import { resetSizeChart } from '../../store/sizeChartEdit/sizeChartDataActions'
import { getRules } from '../../store/rules/selection/apiActions'
import * as builderActions from '../../store/rules/builder/rulesBuilderActions'
import Prompt from 'react-router/Prompt'
import _ from 'lodash'

/*
 */
export class RulesBuilder extends React.Component {
  constructor (props) {
    super(props)
    // THIS IS AN EVIL THAT SHOULDN'T HAVE THINGS IN IT
    this.state = {
      redirect: {
        redirect: false,
        target: '',
      },
    }
  }

  componentDidMount () {
    const { sizeChart, name, getRule, getSizeChart } = this.props
    this.props.getIdentifiers()
    this.props.getRuleAttributes()
      .then(() => {
        if (
          sizeChart.category && sizeChart.category !== '' &&
          sizeChart.brand && sizeChart.brand !== '' &&
          sizeChart.size && sizeChart.size !== '' &&
          name && name !== ''
        ) {
          getRule({
            size_chart_info: {
              category: sizeChart.category,
              brand: sizeChart.brand,
              size: sizeChart.size,
            },
            name,
          })
          getSizeChart({
            category: sizeChart.category,
            brand: sizeChart.brand,
            size: sizeChart.size,
          })
        } else {
          this.props.getRuleItems()
        }
      })
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount () {
    this.props.resetRules()
    this.props.resetSizeChart()
    window.removeEventListener('beforeunload', this.onUnload)
  }

  onUnload (event) {
    if (this.props.modified) {
      event.returnValue = 'Are you sure you want to leave? You still have unsaved data'
      return 'Are you sure you want to leave? You still have unsaved data'
    } else {
      return false
    }
  }

  saveRule () {
    const {
      ruleId,
      sizeChart,
      conditions,
      user,
      name,
      priority,
    } = this.props

    let payload = {
      size_chart_info: {
        category: sizeChart.category,
        brand: sizeChart.brand,
        size: sizeChart.size,
        sizeChartId: sizeChart.sizeChartId,
      },
      criteria: conditions,
      updated_by: user.email,
      name,
      priority,
      id: ruleId,
    }

    if (!this.hasValidSizeChart()) {
      this.props.sendWarning({
        ignore: false,
        open: true,
        message: 'Size Charts cannot have empty cells',
        ok: () => {
          this.props.sendWarning({
            error: {
              open: false,
              ignore: false,
              message: '',
              cancel: () => { },
              ok: () => { },
            },
          })
        },
        cancel: undefined,
      })
    }
    this.props.saveRule({
      ...payload,
      size_chart_info: {
        ...payload.size_chart_info,
        size_chart_tab_name: this.props.sizeChart.sizeChartTabName,
      },
    })
      .then(
        this.props.saveSizeChart({
          ...this.props.sizeChart,
          measurementCategory: this.props.useMeasurementGuide ? this.props.sizeChart.measurementCategory : '',
          user: { ...this.props.user },
        })
      )
      .then(
        () => {
          this.props.getRules()
          this.setState({
            redirect: {
              ...this.state.redirect,
              redirect: true,
              target: '/v2/size-and-fit/',
            },
          })
        }
      )
  }

  redirect () {
    if (this.state.redirect.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect.target,
        state: { refferer: '/v2/size-and-fit/edit-chart' },
      }} />
    }
  }

  hasValidSizeChart () {
    const { charts } = this.props.sizeChart
    let out = true
    _.forEach(charts, (chart) => {
      _.forEach(chart.header, (cell) => {
        if (cell === '') {
          out = false
        }
      })
      _.forEach(charts.data, (row) => {
        _.forEach(row, (cell) => {
          if (cell === '') {
            out = false
          }
        })
      })
    })
    return out
  }

  handleStep (index) {
    const { activeStep } = this.props
    if ((index !== 0 && activeStep === 0) && this.props.searchResults >= 10000) {
      let message = (
        <div>
          This Rule has more results than is supported and won't reach all of its results.
          You probably don't want to do this
        </div>
      )
      let message2 = (
        <div>
          Seriously, You really don't want to do this, the results
          are not defined and are unpredictable...
        </div>
      )
      this.props.sendWarning({
        ignore: false,
        open: true,
        message,
        ok: () => {
          this.props.sendWarning({
            ignore: false,
            open: true,
            message: message2,
            ok: () => {
              this.props.sendWarning({
                ignore: true,
                open: false,
                message: '',
              })
              this.props.setActiveStep(index)
            },
            cancel: () => {
              this.props.sendWarning({
                ignore: false,
                open: false,
                message: '',
              })
            },
          })
        },
        cancel: () => {
          this.props.sendWarning({
            ignore: false,
            open: false,
            message: '',
          })
        },
      })
      return
    }
    if ((index === 1 || index === 2) && !this.hasFullSizeChartIdentifiers()) {
      // does not allow navigation to how to measure
      // or to edit size chart before cat / brand / size are selected
      return
    }

    // if currently editing the size chart and the size chart has holes in it
    if (activeStep === 1 && index !== 1 && !this.hasValidSizeChart()) {
      this.props.sendWarning({
        ignore: false,
        open: true,
        message: 'Size Charts cannot have empty cells',
        ok: () => {
          this.props.sendWarning({
            error: {
              open: false,
              ignore: false,
              message: '',
              cancel: () => { },
              ok: () => { },
            },
          })
        },
        cancel: undefined,
      })
    } else {
      // retrives the size chart whenever edit size chart or publish rule are selected
      if (index === 1 || index === 3) {
        // only retrieve sizechart from sizecharts api if we don't have any chart data
        // fixes bug where editting existing sizecharts gets overwritten with existing chart data on confirm page
        if (this.props.sizeChart === undefined || !this.props.sizeChart.charts.length) {
          this.props.getSizeChart({
            ...this.props.sizeChart,
          })
        }
      }
      this.props.completeStep(activeStep)
      this.props.setActiveStep(index)
    }
  }

  hasFullSizeChartIdentifiers () {
    const { sizeChart } = this.props
    return (
      sizeChart.category && sizeChart.category !== '' &&
      sizeChart.brand && sizeChart.brand !== '' &&
      sizeChart.size && sizeChart.size !== ''
    )
  }

  promptSave () {
    let message = (
      <div>
        {'Slow down there, you\'re about to save a rule that could affect ' + this.props.tcins + ' items!'}
        <br />
        Are you sure you want to do that?
      </div>
    )
    this.props.sendWarning({
      ignore: false,
      open: true,
      message: message,
      ok: () => { this.saveRule() },
      cancel: () => { this.props.sendWarning({ open: false }) },
    })
  }

  shouldNextBeDisabled (index) {
    switch (index) {
      case 0: {
        return !this.hasFullSizeChartIdentifiers()
      }
      case 1: {
        return !this.hasValidSizeChart()
      }
      default: {
        return false
      }
    }
  }

  render () {
    const {
      classes,
      warning,
      activeStep,
      stages,
      completedSteps,
    } = this.props

    return (
      <div id="RulesSelection" className={classes.RulesBuilderMain}>
        {this.redirect()}
        <HeaderTitle title="Size And Fit / Rule Builder" />
        <Prompt message="Are you sure you want to leave, there is data unsaved" when={this.props.modified} />

        <Dialog open={warning.open}>
          <DialogTitle id="Rule Builder Warning">WHOA THERE!</DialogTitle>
          <DialogContent>
            <DialogContentText id="Rule Builder Warning Text">
              {warning.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {warning.cancel ? <Button onClick={warning.cancel}>Cancel</Button> : ''}
            {warning.ok ? <Button onClick={warning.ok} color="primary">Ok</Button> : ''}
          </DialogActions>
        </Dialog>
        <div id="Rules Header" className={classes.RulesBuilderHeader} >
          <Paper>
            <div id="Stepper" className={classes.RulesBuilderStepper}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                nonLinear
                style={{ padding: '10px' }}
              >
                {
                  stages.map((label, index) => {
                    const props = {}
                    const labelProps = {}
                    return (
                      <Step
                        completed={completedSteps[index]}
                        key={label} {...props}
                      >
                        <StepButton
                          {...labelProps}
                          className={classes.RulesBuilderStepButton}
                          onClick={() => this.handleStep(index)}
                        >{ label }</StepButton>
                      </Step>
                    )
                  })
                }
              </Stepper>
            </div>
            <div className={classes.rulesBuilderControlWrapper}>
              <div className={classes.RulesBuilderControl}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.RulesBuilderControlButton}
                  onClick={() => {
                    this.setState({
                      redirect: {
                        redirect: true,
                        target: '/v2/size-and-fit',
                      },
                    })
                  }}
                >cancel</Button>
              </div>
              <div className={classes.RulesBuilderControl}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.RulesBuilderControlButton}
                  disabled={activeStep === 0}
                  onClick={() => this.handleStep(activeStep - 1)}
                >back</Button>
              </div>
              <div className={classes.RulesBuilderControl}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.RulesBuilderControlButton}
                  disabled={this.shouldNextBeDisabled(activeStep)}
                  onClick={
                    activeStep === stages.length - 1
                      ? () => this.promptSave()
                      : () => this.handleStep(activeStep + 1)
                  }
                >{ activeStep === stages.length - 1 ? 'Publish' : 'Next' }</Button>
              </div>
            </div>
          </Paper>
        </div>
        <div id="item_selection" className={activeStep === 0 ? classes.rulesBuilderContent : classes.hidden}>
          {
            activeStep === 0
              ? <SelectItems />
              : ''
          }
        </div>
        <div id="Size_Chart" className={activeStep === 1 ? classes.rulesBuilderContent : classes.hidden}>
          {
            activeStep === 1
              ? <SizeChartEdit subComponent />
              : ''
          }
        </div>
        <div id="How_To_Measure" className={activeStep === 2 ? classes.rulesBuilderContent : classes.hidden}>
          {
            activeStep === 2
              ? <HowToMeasure />
              : ''
          }
        </div>
        <div id="Rule_Confirmation" className={activeStep === 3 ? classes.rulesBuilderContent : classes.hidden}>
          {
            activeStep === 3
              ? <RuleConfirmation />
              : ''
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout
  return {
    headerTitle: headerTitle,
    user: { ...state.user },
    sizeChart: state.sizeChartEdit.sizeChart,
    name: state.rulesBuilder.name,
    conditions: state.rulesBuilder.conditions,
    modified: state.sizeChartEdit.modified || state.rulesBuilder.modified,
    warning: state.rulesBuilder.warning,
    activeStep: state.rulesBuilder.activeStep,
    completedSteps: state.rulesBuilder.completedSteps,
    stages: state.rulesBuilder.stages,
    useMeasurementGuide: state.sizeChartEdit.useMeasurementGuide,
    tcins: state.rulesBuilder.parentCount,
    searchResults: state.rulesBuilder.parentCount,
    priority: state.rulesBuilder.priority,
    ruleId: state.rulesBuilder.ruleId,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    // api Actions
    getRuleAttributes: () => dispatch(apiActions.getRuleAttributes()),
    getRule: (payload) => dispatch(apiActions.getRule(payload)),
    saveRule: (payload) => dispatch(apiActions.saveRule(payload)),
    getRuleItems: () => dispatch(apiActions.getRuleItems()),
    getRules: () => dispatch(getRules()),

    // Size Chart Edit Actions
    getIdentifiers: () => dispatch(getAllSizeChartIdentifiers()),
    getSizeChart: (payload) => dispatch(getSizeChart(payload)),
    saveSizeChart: (payload) => dispatch(saveSizeChart(payload)),
    resetSizeChart: () => dispatch(resetSizeChart()),
    throwSizeChartEditError: (msg) => dispatch(setSaveSizechartError({
      value: true,
      message: msg,
    })),

    // Other Actions
    resetRules: () => dispatch(builderActions.resetState()),
    sendWarning: (payload) => dispatch(builderActions.sendWarning(payload)),
    setActiveStep: (index) => dispatch(builderActions.setActiveStep(index)),
    completeStep: (index) => dispatch(builderActions.completeStep(index)),
  }
}

RulesBuilder.defaultProps = {
  rules: { },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RulesBuilder))

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core'
import { styles } from '../../../styles/rulesBuilderStyles'
import RuleConditionViewer from './SubComponents/RuleConditionViewer'
import SizeChartUI from './SizeChartUI'
import ResultsTable from './SubComponents/ResultsTable'
import * as ConfirmationActions from '../../../store/rules/builder/rulesBuilderActions'
import { updateTableFilter } from '../../../store/rules/builder/conditionActions'
import { getRuleItems } from '../../../store/rules/builder/apiActions'

/*
 */

class RuleConfirmation extends React.Component {
  componentDidMount () {
    /* if (this.props.priority === undefined) {
      this.props.suggestPriority()
    } */
  }

  render () {
    const {
      classes,
      conditions,
      priority,
      name,
      foundItems,
      totalResults,
      tableFilter,
      useMeasurementGuide,
      page,
      childCount,
      loadingConditions,
    } = this.props

    let priorityValues = ['1', '2', '3', '4', '5']

    return (
      <div className={classes.ruleConfirmationMain}>
        <Paper className={classes.ruleConfirmationFinalSettings}>
          <Typography className={classes.ruleConfirmationTitle}>Final Settings</Typography>
          <div className={classes.ruleConfirmationFinalSettingsInputWrapper}>
            <div className={classes.ruleConfirmationPriorityWrapper}>
              <Typography className={classes.ruleConfirmationLabel}>Rule Priority:</Typography>
              <TextField
                value={priority === undefined ? 1 : '' + priority}
                onChange={(e) => this.props.changePriority(e.target.value)}
                className={classes.ruleConfirmationPriorityInput}
                select
              >
                {
                  priorityValues.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    )
                  })
                }
              </TextField>
            </div>
            <div className={classes.ruleConfirmationNameWrapper}>
              <Typography className={classes.ruleConfirmationLabel}>Rule Name:</Typography>
              <TextField
                value={name}
                className={classes.ruleConfirmationNameInput}
                onChange={(e) => this.props.changeName(e.target.value)}
                placeholder={'Name Defaults to a Random String if not Entered'}
              />
            </div>
            <div className={classes.ruleConfirmationHowToMeasure}>
              <Typography className={classes.ruleConfirmationLabel}>
                How To Measure: {useMeasurementGuide ? ' Enabled' : ' Disabled'}
              </Typography>
            </div>
          </div>
        </Paper>
        <RuleConditionViewer
          conditions={conditions}
          readOnly
          multiColumn
        />
        <div className={classes.rulesConfirmationPreviews}>
          <div className={classes.ruleConfirmationSizeChartPreview}>
            <SizeChartUI
              subComponent
              readOnly
            />
          </div>
          <div className={classes.ruleConfirmationItemPreview}>
            <ResultsTable
              foundItems={foundItems}
              totalResults={totalResults}
              tableFilter={tableFilter}
              updateTableFilter={(newFilter) => {
                this.props.updateTableFilter(newFilter)
                this.props.getRuleItems(conditions, newFilter)
              }}
              handleChangePage={(event, page) => {
                this.props.changePage(page)
                this.props.getRuleItems()
              }}
              page={page}
              childCount={childCount}
              refreshing={loadingConditions}
            />
          </div>
        </div>
      </div>
    )
  }
}

RuleConfirmation.defaultProps = {
  category: '',
  brand: '',
  size: '',
}

export const mapStateToProps = state => {
  return {
    conditions: state.rulesBuilder.conditions,
    priority: state.rulesBuilder.priority,
    name: state.rulesBuilder.name,
    foundItems: state.rulesBuilder.foundItems,
    parentCount: state.rulesBuilder.parentCount,
    childCount: state.rulesBuilder.childCount,
    tableFilter: state.rulesBuilder.filter,
    useMeasurementGuide: state.sizeChartEdit.useMeasurementGuide,
    page: state.rulesBuilder.page,
    totalResults: state.rulesBuilder.totalResults,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    changeName: (name) => dispatch(ConfirmationActions.setRuleName(name)),
    changePriority: (priority) => dispatch(ConfirmationActions.setRulePriority(priority)),
    updateTableFilter: (newFilter) => dispatch(updateTableFilter(newFilter)),

    // api actions
    getRuleItems: (criteria, filter) => dispatch(getRuleItems(criteria, filter)),
    // other actions
    changePage: (page) => dispatch(ConfirmationActions.changePage(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RuleConfirmation))

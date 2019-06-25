import React from 'react'
import { connect } from 'react-redux'
import {
  withStyles,
  Input,
  IconButton,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core'
import {
  Clear,
} from '@material-ui/icons'
import { styles } from '../../styles/rulesSelectionStyles'
import RulesTableList from './Components/RulesTableList'
import TCINTable from './Components/SizeChartTCINTable'
import HeaderTitle from '../Header/HeaderTitle'
import { Redirect } from 'react-router'
import * as rulesAPIActions from '../../store/rules/selection/apiActions'
import * as tableActions from '../../store/rules/selection/tableActions'
import * as sizeChartDataActions from '../../store/sizeChartEdit/sizeChartDataActions'
import * as rulesBuilderActions from '../../store/rules/builder/rulesBuilderActions'

/*
 */
export class RuleSelection extends React.Component {
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
    this.props.getRules()
  }

  redirect () {
    if (this.state.redirect.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect.target,
        state: { refferer: '/v2/size-and-fit' },
      }} />
    }
  }

  hasRules (filteredRules, filter) {
    return (filteredRules && Object.keys(filteredRules).length > 0) || filter === ''
  }

  getTCINs (rule) {
    const {
      rules,
    } = this.props
    return rules[rule.category].brands[rule.brand].sizes[rule.size].rules[rule.name].items
  }

  editRule (rule) {
    this.props.setSizeChart(rule)
    this.props.setRuleName(rule.name, false)
    this.setState({
      redirect: {
        redirect: true,
        target: '/v2/size-and-fit/edit-rule',
      },
    })
  }

  render () {
    const {
      classes,
      rules,
      filterRules,
      filteredRules,
      expanded,
      expandRuleIndex,
      searchedTCINs,
      filter,
      warning,
    } = this.props
    return (
      <div id="RulesSelection" className={classes.RulesSelection}>
        {this.redirect()}
        <HeaderTitle title="Size and Fit / Rule Selection" />
        <div id="Rules" className={classes.RulesMain}>
          <div id="Rules Header" className={classes.RulesSelectionHeader} >
            <Input
              placeholder="enter category, brand or size or paste TCINs"
              onChange={(e) => filterRules(e.target.value, rules)}
              label="Rules Search"
              className={classes.RulesSelectionFilter}
              value={filter}
              endAdornment={(
                <IconButton onClick={() => filterRules('', rules)}>
                  <Clear />
                </IconButton>
              )}
            />
          </div>
          <Dialog
            open={warning.open}
          >
            <DialogTitle>Are You Sure You Want to do That?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {warning.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {
                warning.cancel
                  ? <Button onClick={() => warning.cancel()} color="primary">
                    No
                  </Button>
                  : ''
              }
              {
                warning.ok
                  ? <Button onClick={() => warning.ok()} color="secondary">
                      Yes
                  </Button>
                  : ''
              }
            </DialogActions>
          </Dialog>
          <div id="Rules Table" className={{ height: 'calc(100% - 80px)' }}>
            {
              searchedTCINs.length === 0
                ? <RulesTableList
                  rulesTree={Object.keys(filteredRules).length === 0 ? rules : filteredRules}
                  expanded={expanded}
                  expandRuleIndex={(key, expanded, level) => expandRuleIndex(key, expanded, level)}
                  deletePressed={(rule) => this.props.sendWarning(
                    {
                      ignore: false,
                      open: true,
                      message: 'That Rule Has ' + this.getTCINs(rule) + ' tcins assosiated with it!',
                      ok: () => {
                        this.props.sendWarning({
                          open: false,
                        })
                        this.props.deleteRule(rule)
                          .then(
                            () => {
                              this.props.expandRuleIndex('', expanded, 0)
                            }
                          )
                      },
                      cancel: () => {
                        this.props.sendWarning({
                          open: false,
                        })
                      },
                    }
                  )}
                  editRule={(rule) => this.editRule(rule)}
                  mainStyleClass={{
                    width: '100%',
                    position: 'absolute',
                  }}
                />
                : <TCINTable
                  expanded={expanded}
                  expandRuleIndex={(key, expanded, level) => expandRuleIndex(key, expanded, level)}
                  tcins={searchedTCINs}
                  viewRule={(rule) => this.editRule({
                    ...rule.size_chart,
                    name: rule.name,
                    priority: rule.priority,
                  })}
                />
            }
          </div>
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
    rules: state.rulesSelection.rules,
    filteredRules: state.rulesSelection.filteredRules,
    expanded: state.rulesSelection.expanded,
    filter: state.rulesSelection.filter,
    searchedTCINs: state.rulesSelection.searchedTCINs,
    warning: state.rulesSelection.warning,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    getRules: () => dispatch(rulesAPIActions.getRules()),
    filterRules: (filter, rules) => dispatch(tableActions.filterRules(filter, rules)),
    expandRuleIndex: (key, expanded, level) => dispatch(tableActions.expandRuleIndex(key, expanded, level)),
    setSizeChart: (rule) => dispatch(sizeChartDataActions.setRule(rule)),
    setRuleName: (name) => dispatch(rulesBuilderActions.setRuleName(name)),
    deleteRule: (rule) => dispatch(rulesAPIActions.deleteRule(rule)),
    sendWarning: (warning) => dispatch(tableActions.sendWarning(warning)),
  }
}

RuleSelection.defaultProps = {
  rules: { },
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RuleSelection))

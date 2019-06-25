import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import {
  KeyboardArrowDown,
  Create,
  ExpandMore,
  // Delete,
} from '@material-ui/icons'
import { styles } from '../../../styles/rulesSelectionStyles'

/*
 */

class RulesTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: [-1],
    }
  }

  getEditData (rule) {
    if (rule.brand === '') {
      return (
        <IconButton
          onClick={() => this.props.expandRule(rule)}
        ><KeyboardArrowDown /></IconButton>
      )
    } else if (rule.brand !== '' && rule.size === '') {

    }
  }

  getChildRules (payload, level = 0) {
    const {
      classes,
      editRule,
      // deletePressed,
      expandRuleIndex,
      expanded,
      rulesTree,
    } = this.props

    if (level > 3) {
      return
    }

    const getLevelID = (level, rule) => {
      if (level === 0) {
        return rule.category
      } else if (level === 1) {
        return rule.brand
      } else if (level === 2) {
        return rule.size
      } else {
        return rule.name
      }
    }

    const levelName = (level) => {
      switch (level) {
        case 0:
          return 'Category'
        case 1:
          return 'Brand'
        case 2:
          return 'Size'
        case 3:
          return 'Rule'
      }
    }

    const getLevelTree = () => {
      if (payload.category === '' || payload.category === undefined) {
        return rulesTree
      } else if (payload.brand === '' || payload.brand === undefined) {
        return rulesTree[payload.category].brands
      } else if (payload.size === '' || payload.size === undefined) {
        return rulesTree[payload.category].brands[payload.brand].sizes
      } else {
        return rulesTree[payload.category].brands[payload.brand].sizes[payload.size].rules
      }
    }

    if (rulesTree !== undefined && rulesTree !== {}) {
      let tree = getLevelTree()
      return (
        <div name="RulesExpansionTableChild" className={classes.rulesExpansionPanelChild}>
          <ExpansionPanel
            onChange={
              () => editRule({
                category: payload.category ? payload.category : '',
                brand: payload.brand ? payload.brand : '',
                size: payload.size ? payload.size : '',
                name: '',
              })
            }
          >
            <ExpansionPanelSummary expandIcon={<Create />}>
              <div style={{ width: '60%' }}>
                <Typography style={{
                  paddingLeft: level < 3 ? '' + 5 * level + '%' : 'calc(10% + 48px)',
                  color: 'rgba(112, 112, 112, 0.44)',
                }}>
                  Create New {levelName(level)}
                </Typography>
              </div>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          {
            Object.keys(tree).map((rule, key) => {
              return (
                <ExpansionPanel
                  expanded={expanded[level] === rule}
                  onChange={
                    level !== 3
                      ? () => expandRuleIndex(rule === expanded[level] ? -1 : rule, expanded, level)
                      : () => editRule({
                        ...payload,
                        name: rule,
                      })
                  }
                  key={key}
                  className={expanded[level] === rule ? classes.expandedRulesTableCard : undefined}>
                  <ExpansionPanelSummary expandIcon={level !== 3 ? <ExpandMore /> : <Create />}>
                    <div className={classes.rulesTableIdentifiers}>
                      {/* level === 3 ? <div className={classes.rulesTableDeleteDiv}>
                        <IconButton
                          onClick={() => deletePressed({
                            ...payload,
                            name: level === 3 ? rule : '',
                          }) }>
                          <Delete />
                        </IconButton></div> : */ ''}
                      <Typography className={classes.rulesTableDataTitleText} style={{ paddingLeft: level < 3 ? '' + 5 * level + '%' : '10%' }}>{
                        rule
                      }</Typography>
                    </div>
                    <div className={classes.rulesTableStats}>
                      <Typography className={classes.rulesTableDataText}>{expanded[level] === key ? '' : tree[rule].items}</Typography>
                      <Typography className={classes.rulesTableDataText}>{expanded[level] === key ? '' : tree[rule].ruleCount}</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.rulesTableCard} style={{ width: '100%', padding: 0, margin: 0 }}>
                    {
                      level === 3 || expanded[level] !== rule
                        ? <Typography>NOT YET IMPLEMENTED</Typography>
                        : this.getChildRules(
                          {
                            category: payload.category ? payload.category : rule,
                            brand: payload.brand ? payload.brand : payload.category ? rule : '',
                            size: payload.size ? payload.size : payload.brand ? rule : '',
                          }, level + 1
                        )
                    }
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }
        </div>
      )
    } else if (rulesTree === undefined) {
      const rules = this.props.expandRule(payload)

      return (
        <div name="RulesExpansionTableChild" className={classes.rulesExpansionPanelChild}>
          {
            rules.map((rule, key) => {
              return (
                <ExpansionPanel
                  expanded={expanded[level] === key}
                  onChange={
                    level !== 3
                      ? () => expandRuleIndex(key === expanded[level] ? -1 : key, expanded, level)
                      : () => editRule({
                        ...payload,
                        name: '',
                      })
                  }
                  key={key}
                  className={expanded[level] === key ? classes.expandedRulesTableCard : undefined}>
                  <ExpansionPanelSummary expandIcon={level !== 3 ? <ExpandMore /> : <Create />}>
                    <div className={classes.rulesTableIdentifiers}>
                      {/* level === 3
                        ? <div className={classes.rulesTableDeleteDiv}>
                          <IconButton
                            onClick={deletePressed({
                              ...payload,
                              name: level === 3 ? rule : '',
                            })}>
                            <Delete />
                          </IconButton>
                        </div>
                        : */ ''}
                      <Typography className={classes.rulesTableDataTitleText} style={{ paddingLeft: level < 3 ? '' + 5 * level + '%' : '10%' }}>{
                        getLevelID(level, rule)
                      }</Typography>
                    </div>
                    <div className={classes.rulesTableStats}>
                      <Typography className={classes.rulesTableDataText}>{expanded[level] === key ? '' : rule.items}</Typography>
                      <Typography className={classes.rulesTableDataText}>{expanded[level] === key ? '' : rule.rules}</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.rulesTableCard} style={{ width: '100%', padding: 0, margin: 0 }}>
                    {
                      level === 3
                        ? <Typography>NOT YET IMPLEMENTED</Typography>
                        : this.getChildRules(
                          {
                            category: payload.category ? rule.category : '',
                            brand: rule.brand ? rule.brand : '',
                            size: rule.size ? rule.size : '',
                          }, level + 1
                        )
                    }
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  getExpansionView () {
    const {
      classes,
      rules,
    } = this.props
    return (
      <div name="RulesExpansionTableModel">
        <ExpansionPanel disabled className={classes.rulesTableHeader}>
          <ExpansionPanelSummary>
            <div className={classes.rulesTableIdentifiers}>
              <Typography className={classes.rulesTableHeaderTitleText}>Category / Brand / Size / Name</Typography>
            </div>
            <div className={classes.rulesTableStats}>
              <Typography className={classes.rulesTableHeaderText}>Items</Typography>
              <Typography className={classes.rulesTableHeaderText}>Rules</Typography>
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {
          rules !== undefined && rules.length > 0 ? this.getChildRules({ category: '' }) : ''
        }
      </div>
    )
  }

  render () {
    const {
      classes,
    } = this.props

    return (
      <div className={classes.rulesTableMain} >
        {this.getExpansionView()}
      </div>
    )
  }
}

RulesTable.defaultProps = {
  rules: [
    {
      category: 'something',
      brand: 'went',
      size: 'wrong',
      name: 'bro',
      priority: -1,
      items: 420,
      rules: 69,
    },
  ],
  editRule: (rule) => { },
  expendRule: (rule) => { },
  deletePressed: (rule) => { },
}

RulesTable.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
}

export default (withStyles(styles)(RulesTable))

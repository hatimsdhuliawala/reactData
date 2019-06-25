import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
} from '@material-ui/core'
import {
  ExpandMore,
  OpenInNew,
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

  decode (text) {
    return <div dangerouslySetInnerHTML={{ __html: text }} />
  }

  getChildRules () {
    const {
      classes,
      viewRule,
      expandRuleIndex,
      expanded,
      tcins,
    } = this.props

    return (
      <div name="RulesExpansionTableChild" className={classes.rulesExpansionPanelChild}>
        {
          tcins.map((item, key) => {
            return (
              <ExpansionPanel
                expanded={expanded[0] === key}
                onChange={() => expandRuleIndex(key === expanded[0] ? -1 : key, expanded, 0)}
                key={key}
                className={expanded[0] === key ? classes.expandedTCINTableCard : undefined}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                  <Typography className={classes.rulesTCINTableImage}>{
                    <img src={'' + item.tcin + '?&hei=60&wei=60'} alt="" />
                  }</Typography>
                  <Typography className={classes.rulesTCINTableTitle} dangerouslySetInnerHTML={{ __html: item.title }} />
                  <Typography className={classes.rulesTCINTableTCIN}>{item.tcin}</Typography>
                  {
                    item.rules.length > 0
                      ? <Typography className={classes.rulesTCINTableChart}>{
                        item.rules[0].size_chart.category + ' / ' + item.rules[0].size_chart.brand + ' / ' + item.rules[0].size_chart.size
                      }
                      </Typography>
                      : <Typography className={classes.rulesTCINTableChart}>
                        No Size Chart on this Item
                      </Typography>
                  }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.rulesTableCard} style={{ width: '100%', padding: 0, margin: 0 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Rule Name</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        item.rules.map((rule, key) => {
                          return (
                            <TableRow>
                              <TableCell>{rule.size_chart.category}</TableCell>
                              <TableCell>{rule.size_chart.brand}</TableCell>
                              <TableCell>{rule.size_chart.size}</TableCell>
                              <TableCell>{rule.name}</TableCell>
                              <TableCell>{rule.priority}</TableCell>
                              <TableCell>{
                                <IconButton onClick={() => viewRule(rule)}>
                                  <OpenInNew />
                                </IconButton>
                              }</TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }

  getExpansionView () {
    const {
      classes,
    } = this.props
    return (
      <div name="TCINExpansionTableModel">
        <ExpansionPanel disabled className={classes.rulesTableHeader}>
          <ExpansionPanelSummary>
            <Typography className={classes.rulesTCINTableImage}>Image</Typography>
            <Typography className={classes.rulesTCINTableTitle}>Product Title</Typography>
            <Typography className={classes.rulesTCINTableTCIN}>TCIN</Typography>
            <Typography className={classes.rulesTCINTableChart}>Current Size Chart</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        {
          this.getChildRules()
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
  editChart: (rule) => { },
  editRule: (rule) => { },
  expendRule: (rule) => { },
  deletePressed: (rule) => { },
  viewRule: () => { },
}

RulesTable.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
}

export default (withStyles(styles)(RulesTable))

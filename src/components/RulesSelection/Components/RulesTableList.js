import React from 'react'
import {
  withStyles,
  Paper,
  Collapse,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
} from '@material-ui/core'
import {
  Create,
  Delete,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons'
import { styles } from '../../../styles/rulesSelectionStyles'

export class RulesTableList extends React.Component {
  componentDidMount () { }

  getListItems (level = 0, category = '', brand = '', size = '') {
    const {
      classes,
      editRule,
      deletePressed,
      expandRuleIndex,
      expanded,
      rulesTree,
    } = this.props

    if (level > 3) {
      return
    }

    const levelName = () => {
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

    const tree = (() => {
      switch (level) {
        case 0: {
          return rulesTree
        }
        case 1: {
          if (category) {
            return rulesTree[category].brands
          } else {
            return {}
          }
        }
        case 2: {
          if (category && brand) {
            return rulesTree[category].brands[brand].sizes
          } else {
            return {}
          }
        }
        case 3: {
          if (category && brand && size) {
            return rulesTree[category].brands[brand].sizes[size].rules
          } else {
            return {}
          }
        }
      }
    })()

    const payload = (item) => {
      return {
        category: level === 0 ? item : category,
        brand: level === 1 ? item : brand,
        size: level === 2 ? item : size,
        name: level === 3 ? item : '',
      }
    }

    if (tree === undefined || tree === {}) {
      return
    }

    return (
      <List
        component="div"
        style={{ paddingBottom: level === 0 ? '8px' : '0px', paddingTop: '0px' }}
        className={level === 0 ? classes.rulesTableList : undefined}
      >
        {
          level === 0
            ? <ListItem button disabled divider className={classes.rulesTableHeader}>
              <ListItemText disableTypography>
                <div className={classes.rulesTableIdentifiers}>
                  <Typography
                    className={classes.rulesTableDataTitleText}
                    style={{ paddingLeft: '100px' }}
                    variant="subtitle1"
                  >
                    Category / Brand / Size
                  </Typography>
                </div>
                <div className={classes.rulesTableStats}>
                  <Typography className={classes.rulesTableDataText} variant="subtitle1">Item Count</Typography>
                  <Typography className={classes.rulesTableDataText} variant="subtitle1">Rule Count</Typography>
                </div>
              </ListItemText>
            </ListItem>
            : ''
        }
        <div className={level === 0 ? classes.rulesListTableListWrapper : undefined}>
          <ListItem
            button
            divider
            onClick={() => editRule(payload(''))}
          >
            <ListItemText
              className={classes.rulesTableListText}
              style={{
                paddingRight: '24px',
                paddingLeft: '24px',
              }}
              disableTypography
            >
              <div style={{ width: '60%' }}>
                <Typography
                  style={{
                    color: 'rgb(112, 112, 112, 0.44)',
                    paddingLeft: (level * 3 + '%'),
                  }}
                  variant="subtitle1"
                >
                  Create New {levelName()}
                </Typography>
              </div>
            </ListItemText>
            <ListItemIcon>
              <Create className={classes.rulesTableListIcon} />
            </ListItemIcon>
          </ListItem>
          {
            Object.keys(tree).map((key, index) => {
              return (
                <div key={index}>
                  <ListItem
                    button
                    divider
                    onClick={
                      level === 3
                        ? () => editRule(payload(key))
                        : () => expandRuleIndex(expanded[level] === key ? '' : key, expanded, level)
                    }
                    selected={key === expanded[level]}
                  >
                    <ListItemText
                      className={classes.rulesTableListText}
                      style={{ paddingRight: '24px', paddingLeft: '24px' }}
                    >
                      <div className={classes.rulesTableIdentifiers}>
                        <Typography
                          className={classes.rulesTableDataTitleText}
                          variant="subtitle1"
                          style={{ paddingLeft: (level * 3 + '%') }}
                        >
                          {key}
                        </Typography>
                      </div>
                      <div className={classes.rulesTableStats}>
                        <Typography className={classes.rulesTableDataText} variant="subtitle1">{tree[key].items}</Typography>
                        <Typography className={classes.rulesTableDataText} variant="subtitle1">{level === 3 ? '' : tree[key].ruleCount}</Typography>
                      </div>
                      {
                        level === 3
                          ? <Create className={classes.rulesTableListIcon} />
                          : expanded[level] === key
                            ? <ExpandLess className={classes.rulesTableListIcon} />
                            : <ExpandMore className={classes.rulesTableListIcon} />
                      }
                    </ListItemText>
                    {
                      level === 3
                        ? <ListItemSecondaryAction className={classes.rulesTableListSecondaryButton}>
                          <IconButton onClick={() => deletePressed(payload(key))}>
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                        : ''
                    }
                  </ListItem>
                  <Collapse unmountOnExit in={key === expanded[level]}>
                    {
                      level < 3
                        ? this.getListItems(
                          level + 1,
                          level === 0 ? key : category,
                          level === 1 ? key : brand,
                          level === 2 ? key : size,
                        )
                        : ''
                    }
                  </Collapse>
                </div>
              )
            })
          }
        </div>
      </List>
    )
  }

  render () {
    const {
      classes,
      mainStyleClass,
    } = this.props
    return (
      <Paper className={classes.rulesTableListMain} style={mainStyleClass}>
        {this.getListItems()}
      </Paper>
    )
  }
}

RulesTableList.defaultProps = {
  expanded: [-1],
  rulesTree: {
    'star-trek-enemies': {
      ruleCount: 3,
      items: 10,
      brands: {
        'the-borg': {
          ruleCount: 2,
          items: 8,
          sizes: {
            'ships': {
              ruleCount: 2,
              items: 8,
              sizes: {
                'cube': {
                  items: '4',
                },
                'sphere': {
                  items: '4',
                },
              },
            },
          },
        },
        'the-dominion': {
          ruleCount: 1,
          items: 2,
          sizes: {
            'jem-hadar': {
              ruleCount: 1,
              items: 2,
              rules: {
                'alpha': {
                  items: 2,
                },
              },
            },
          },
        },
      },
    },
  },
}

export default (withStyles(styles)(RulesTableList))

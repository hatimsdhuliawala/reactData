import React from 'react'
import {
  withStyles,
  Paper,
  Card,
  Chip,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Grid,
} from '@material-ui/core'
import {
  Close,
  Add,
  MoreVert,
} from '@material-ui/icons'
import { styles } from '../../../../styles/rulesBuilderStyles'

export class RuleConditionViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openConditionMenu: -1,
      openConditionMenuLocation: undefined,
    }
  }

  componentDidMount () { }

  getConditionMenuItems (condition, conditionIndex) {
    return [
      {
        content: 'Add Values to Condition',
        action: () => this.props.editCondition(conditionIndex),
        icon: <Add />,
      },
      {
        content: 'Delete Condition',
        action: () => this.props.removeCondition({ conditionIndex }),
        icon: <Close />,
      },
    ]
  }

  getConditionCardMenu (condition, conditionIndex) {
    const { classes } = this.props
    let ITEM_HEIGHT = 48
    const {
      openConditionMenu,
      openConditionMenuLocation,
    } = this.state

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={openConditionMenu === conditionIndex ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={(event) => {
            this.setState({
              openConditionMenu: conditionIndex,
              openConditionMenuLocation: event.currentTarget,
            })
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={openConditionMenu === conditionIndex ? openConditionMenuLocation : undefined}
          open={openConditionMenu === conditionIndex}
          onClose={() => this.setState({
            openConditionMenu: -1,
          })}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 250,
            },
          }}
        >
          {
            this.getConditionMenuItems(condition, conditionIndex).map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    this.setState({
                      openConditionMenu: -1,
                    })
                    item.action()
                  }}>
                  <div className={classes.conditionMenuItemDiv}>
                    <div className={classes.ConditionMenuItemContent}>
                      {item.content}
                    </div>
                    <div className={classes.ConditionMenuItemIcon}>
                      {item.icon}
                    </div>
                  </div>
                </MenuItem>
              )
            })
          }
        </Menu>
      </div>
    )
  }

  getOperatorColor (operator) {
    /* const GREEN = 'rgb(153, 255, 153)'
    const RED = 'rgb(255, 153, 153)' */
    const WHITE = 'rgb(255,255,255)'

    switch (operator) {
      default: {
        return WHITE
      }
    }
  }

  getTitleExtra (operator) {
    switch (operator) {
      case 'out':
      case 'OUT': {
        return 'EXCLUDE: '
      }
      default: {
        return ''
      }
    }
  }

  getConditionCard (condition, conditionIndex) {
    const {
      classes,
    } = this.props
    const { display, displayValues, operator } = condition

    return (
      <Card
        key={conditionIndex}
        className={classes.conditionCard}
        style={
          {
            backgroundColor: this.getOperatorColor(operator),
          }
        }
      >
        <CardHeader
          className={classes.selectionContitionCardHeader}
          action={
            this.props.readOnly
              ? undefined
              : this.getConditionCardMenu(condition, conditionIndex)
          }
          title={this.getTitleExtra(operator) + display}
          titleTypographyProps={{ style: { fontSize: '18px' } }}
        />
        <CardContent>
          {
            displayValues.map((value, attributeIndex) => {
              return (
                <Chip
                  key={attributeIndex}
                  label={value}
                  onDelete={
                    this.props.readOnly
                      ? undefined
                      : () => this.props.removeConditionAttribute({
                        conditionIndex,
                        attributeIndex,
                      })
                  }
                  className={classes.selectionContditionChip}
                />
              )
            })
          }
        </CardContent>
      </Card>
    )
  }

  render () {
    const {
      classes,
      conditions,
      multiColumn,
    } = this.props
    let spacingProps
    if (multiColumn) {
      spacingProps = {
        xs: 12,
        sm: 6,
        md: 3,
      }
    } else {
      spacingProps = {
        xs: 12,
      }
    }
    return (
      <Paper className={classes.rulesConditionViewerMain}>
        <Typography
          className={this.props.readOnly ? classes.rulesConditionViewerTitle : classes.rulesBuilderCardHeader}
          style={{
            margin: '15px',
          }}
          variant="h3"
        >
          {'Current Rule Conditions'}
        </Typography>
        <div
          style={{
            height: 'calc(100% - 55px)',
            overflowY: 'auto',
          }}
        >
          <Grid
            container
            spacing={24}
            style={{
              marginLeft: '10px',
              marginRight: '10px',
              width: 'calc(100% - 20px)',
            }} xl={12}
          >
            {
              conditions.map((condition, conditionIndex) => {
                return (
                  // className={classes.rulesConditionViewerCardPadding}
                  <Grid key={conditionIndex} item {...spacingProps}>
                    {this.getConditionCard(condition, conditionIndex)}
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Paper>
    )
  }
}

RuleConditionViewer.defaultProps = {
  removeConditionAttribute: () => { },
  removeCondition: () => { },
  editCondition: () => { },
}

export default (withStyles(styles)(RuleConditionViewer))

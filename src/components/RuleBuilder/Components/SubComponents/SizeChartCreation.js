import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from '../../../../styles/sizeChartUI'

/*
 */

class SizeChartTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hoveredRow: -1,
      hoveredCol: -1,
    }
  }

  handleHover (row, col) {
    this.setState({
      hoveredRow: row,
      hoveredCol: col,
    })
  }

  render () {
    const {
      classes,
    } = this.props
    // creates a 10 by 10 list of empty strings for text
    // that goes inside the buttons
    var table = new Array(10)
    for (var i = 0; i < table.length; i++) {
      table[i] = ['', '', '', '', '', '', '', '', '', '']
    }
    var rowN = 0
    var colN = 0
    if (this.props.disabled === true) {
      return (
        <div />
      )
    }
    return (
      <div class={classes.creationMain} >

        <div class={classes.title}>
          Select Chart Body Size
        </div>

        <table class={classes.table}>
          {
            table.map(row => {
              var r = ++rowN
              colN = 0
              return (
                <tr>
                  {
                    row.map(col => {
                      var c = ++colN
                      return (
                        <td>
                          <Button
                            onClick={() => this.props.onClick(r, c)}
                            disableRipple
                            variant="contained"
                            class={
                              r <= this.state.hoveredRow && c <= this.state.hoveredCol
                                ? classes.creationButtonHovered
                                : classes.creationButton
                            }
                            size="large"
                            onMouseEnter={(e) => this.handleHover(r, c)}
                          >{' '}</Button>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </table>
        <div class={this.props.cancelAction ? classes.creationCancel : classes.hidden}>
          <Button
            onClick={() => this.props.cancelAction()}
            style={{ width: '100%' }}
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

SizeChartTable.defaultProps = {
  onChange: () => {},
  addRow: () => {},
  disabled: false,
}

SizeChartTable.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
}

export default (withStyles(styles)(SizeChartTable))

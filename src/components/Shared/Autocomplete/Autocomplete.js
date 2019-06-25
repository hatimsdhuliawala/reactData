import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './AutocompleteStyles'
import Downshift from 'downshift'
import { Paper, MenuItem, TextField } from '@material-ui/core'

/*
 */
const MAX_SUGGESTIONS = 100
class Autocomplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clicked: false,
    }
  }

  getSuggestions (value) {
    const { items } = this.props
    var out = []
    for (let i = 0; i < items.length && out.length < MAX_SUGGESTIONS; i++) {
      if (items[i].toLowerCase() === '') { continue }
      if (items[i].toLowerCase().includes(value.toLowerCase())) {
        out.push(items[i])
      }
    }
    return out
  }

  render () {
    const {
      classes,
      isDisabled,
    } = this.props
    const suggestions = this.getSuggestions(this.props.value)

    return (
      <div className={classes.suggestionDiv}>
        <Downshift
          className={classes.suggestionInput}
          onSelect={
            (e) => {
              this.setState({ clicked: false })
              this.props.onSelect(e)
            }
          }
          inputValue={this.props.value}
          onOuterClick={() => this.setState({ clicked: false })}
          isOpen={this.state.clicked}
        >
          {(
            {
              getInputProps,
              isOpen,
              getMenuProps,
              getItemProps,
              highlightedIndex,
            }) => {
            return (
              <div style={{ width: '100%' }}>
                <TextField
                  InputProps={
                    {
                      ...getInputProps({
                        placeholder: this.props.placeholder,
                        className: classes.input,
                        onChange: (e) => this.props.onChange(e),
                        onClick: () => this.setState({ clicked: true }),
                        endAdornment: this.props.endAdornment,
                      }),
                    }}
                  disabled={isDisabled}
                  fullWidth

                />
                <div {...getMenuProps({ className: classes.selectMenuStyles })}>
                  { (isOpen) && !isDisabled && suggestions.length <= MAX_SUGGESTIONS
                    ? <Paper className={classes.suggestionMenu} square>
                      {
                        suggestions.map((item, index) => {
                          return (
                            <MenuItem
                              {...getItemProps({
                                item: item,
                              })}
                              className={classes.suggestionMenuItem}
                              key={item}
                              selected={highlightedIndex === index}
                              component="div"
                              style={
                                {
                                  zIndex: '1',
                                  backgroundColor: highlightedIndex === index ? 'grey' : 'white',
                                  color: highlightedIndex === index ? 'white' : 'black',
                                }}
                            >
                              {item}
                            </MenuItem>
                          )
                        })
                      }
                    </Paper>
                    : null}
                </div>
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

export default (withStyles(styles)(Autocomplete))

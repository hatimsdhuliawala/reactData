import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

var suggestions = []

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

function NoOptionsMessage (props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent ({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control (props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option (props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder (props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue (props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

function ValueContainer (props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
}

function Menu (props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
}

class DepartmentFilterData extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      single: null,
    }
  }

  handleChange = name => value => {
    this.setState({
      [name]: value,
    })
  }

  render () {
    const { classes, theme } = this.props
    suggestions = this.props.selectedDepartmentData.map(suggestion => ({
      value: suggestion.value,
      label: suggestion.display,
    }))

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }

    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          styles={selectStyles}
          options={suggestions}
          components={components}
          value={this.state.single}
          onChange={this.handleChange('single')}
          placeholder="Department"
        />
      </div>
    )
  }
}

DepartmentFilterData.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default (withStyles(styles, { withTheme: true }))(DepartmentFilterData)

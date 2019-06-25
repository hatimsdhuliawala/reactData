import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'
const styles = theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonIndigo: {
    backgroundColor: indigo[500],
    '&:hover': {
      backgroundColor: indigo[700],
    },
  },
  marginRight: {
    marginRight: theme.spacing.unit * 2,
  },
  marginLeft: {
    marginLeft: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
  },
  marginTop: {
    marginTop: theme.spacing.unit * 4,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
})
export default styles

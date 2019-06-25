import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  dialogPaper: {
    minWidth: '100vh',
    maxWidth: '140vh',
  },
  button: {
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary[500],
    borderRadius: '5px',
    color: 'white',
    '&:hover': { backgroundColor: theme.palette.primary[700] },
    '&:disabled': { backgroundColor: '#ddd' },
  },
  smallButton: {
    fontSize: '0.875rem',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 400,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  jobDataContainer: {
    marginTop: theme.spacing.unit * 2,
  },
  marginTopMedium: {
    marginTop: theme.spacing.unit * 4,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  alignLeft: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  smallMargin: {
    margin: theme.spacing.unit * 0.5,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  copyDataroot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  cardStyle: {
    transitionDuration: '0.3s',
    height: '11vw',
  },
  itemDetailCard: {
    transitionDuration: '0.3s',
    height: '25vw',
  },
  cardActions: {
    justifyContent: 'center',
  },
  lightTooltip: {
    width: 300,
  },
  totalJob: {
    color: theme.palette.error.dark,
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  column: {
    flexBasis: '33.33%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  systemHealthCardStyle: {
    transitionDuration: '0.3s',
    height: '20vw',
  },
})

export { styles, variantIcon }


const styles = theme => ({
  button: {
    margin: '0px 0px 0px 5px',
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
    borderRadius: '5px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  iconColor: {
    iconColor: 'blue',
  },
  textFieldWidth: {
    width: '200px',
  },
  searchTcinButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginLeft: '10px',
    marginTop: '10px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginLeft: '10px',
      marginTop: '10px',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  startOverButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    margin: '20px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  stepperIcon: {
    '&$disabled': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&$active': {
      color: 'rgba(56, 94, 166, 1)',
    },
    '&$completed': {
      color: 'rgba(56, 94, 166, 1)',
    },
  },
  disabled: {},
  active: {},
  completed: {},
  imageBorder: {
    border: '2px solid rgba(123, 29, 43, 1)',
    margin: '10px',
  },
  imageWithoutBorder: {
    margin: '10px',
  },
  selectedCheck: {
    color: 'rgba(123, 29, 43, 1)',
    position: 'relative',
    left: '-22px',
    top: '3px',
  },
  marginTop10: {
    marginTop: '10px',
  },
  marginLeft10: {
    marginLeft: '10px',
  },
  tagCards: {
    minWidth: '180px',
    padding: '10px',
    margin: '0px 15px',
    marginTop: '10px',
    maxHeight: '280px',
    overflowY: 'auto',
  },
  similarImageContainer: {
    width: '395px',
    marginTop: '10px',
  },
  skipImageButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginLeft: '10px',
    marginRight: '5px',
    marginTop: '10px',
    width: '75%',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginLeft: '10px',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  startOverImageButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginLeft: '-35px',
    width: '75%',
    marginTop: '10px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  yesImageButton: {
    backgroundColor: 'rgba(56, 94, 166, 1)',
    color: 'white',
    border: '1px solid',
    marginLeft: '-35px',
    width: '75%',
    '&:disabled': {
      backgroundColor: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: 'rgba(56, 94, 166, 1)',
      color: 'white',
    },
  },
  noImageButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginLeft: '10px',
    marginRight: '5px',
    width: '75%',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginLeft: '10px',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  similarImage: {
    height: '300px',
    width: '300px',
    marginBottom: '13px',
    marginTop: '2px',
  },
  goBackSpan: {
    color: 'rgba(56, 94, 166, 1)',
    cursor: 'pointer',
  },
})

export default styles

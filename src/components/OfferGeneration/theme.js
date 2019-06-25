
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
  generateButton: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginLeft: '10px',
    marginTop: '10px',
    height: '38px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginLeft: '10px',
      marginTop: '10px',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  previewLargeTemp: {
    width: '99%',
    margin: '15px',
    height: '550px',
    marginRight: '30px',
  },
  previewLarge: {
    width: '1000px',
    height: '1000px',
  },
  previewLargeFull: {
    width: '100%',
    height: '100%',
  },
  textFieldWidth: {
    marginLeft: '15px',
    width: '200px',
  },
  textFieldPrinterWidth: {
    marginLeft: '15px',
    width: '300px',
  },
  printButton: {
    marginLeft: '20px',
    backgroundColor: 'rgba(56, 94, 166, 1)',
    color: 'white',
    border: '1px solid',
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
  offerGeneratedContainer: {
    marginTop: '20px',
  },
  linkToURL: {
    paddingLeft: '15px',
    marginBottom: '20px',
    '&:link': {
      color: 'blue',
    },
    '&:visited': {
      color: 'blue',
    },
    '&:hover': {
      color: 'blue',
    },
    '&:active': {
      color: 'blue',
    },
  },
  marginRight5: {
    marginRight: '5px',
  },
})

export default styles

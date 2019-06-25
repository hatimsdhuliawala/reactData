
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
  browseButton: {
    color: 'rgba(76, 144, 254, 1)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  dropZoneNotActive: {
    margin: 'auto',
    width: '500px',
    border: 'dashed 1px black',
    padding: '20px',
    marginTop: '50px',
  },
  dropZoneActive: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    margin: 'auto',
    width: '500px',
    border: 'dashed 1px rgba(33,150,243, 1)',
    padding: '20px',
    marginTop: '50px',
  },
  uploadIcon: {
    width: '75px',
    height: '75px',
  },
  DropZoneLargeText: {
    marginBottom: '0px !important',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '24px',
    color: '#999999',
    textAlign: 'center',
  },
  DropZoneSmallText: {
    marginTop: '0px !important',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: '16px',
    color: '#999999',
    textAlign: 'center',
  },
  progressBar: {
    marginTop: '30px',
    marginLeft: '50%',
  },
  buttonDiscard: {
    color: 'rgba(34, 150, 243, 1)',
    border: '1px solid',
    marginRight: '10px',
    marginTop: '10px',
    padding: '0px 30px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginRight: '10px',
      marginTop: '10px',
      padding: '0px 30px',
    },
    '&:hover': { backgroundColor: 'white' },
  },
  buttonPublish: {
    backgroundColor: 'rgba(34, 150, 243, 1)',
    color: 'white',
    marginLeft: '10px',
    marginTop: '10px',
    padding: '0px 30px',
    '&:disabled': {
      backgroundColor: 'rgba(153, 153, 153, 1)',
      marginLeft: '10px',
      marginTop: '10px',
      color: 'white',
      padding: '0px 30px',
    },
    '&:hover': {
      backgroundColor: 'rgba(34, 150, 243, 1)',
      color: 'white',
    },
  },
  numberOfUploadedData: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '20px',
    color: 'Black',
  },
  marginBottom10: {
    marginBottom: '10px',
  },
  itemImage: {
    maxWidth: '65px',
    maxHeight: '65px',
  },
  revertBack: {
    height: '50px',
    width: '50px',
    cursor: 'pointer',
  },
  marginTopMidium: {
    marginTop: theme.spacing.unit * 4,
  },
  marginTopBottom10: {
    margin: '10px 0px',
  },
  deleteButton: {
    cursor: 'pointer',
  },
  confirmDelete: {
    color: 'rgba(34, 150, 243, 1)',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  wrongFileTitle: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '20px',
    color: 'rgba(0, 0, 0, 1)',
  },
})

export default styles

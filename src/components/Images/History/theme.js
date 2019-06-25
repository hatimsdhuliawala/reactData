
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
    marginTop: '10px',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
  },
  sendToTargetButton: {
    margin: '30px 5px',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
  },
  cancelButton: {
    margin: '30px 40px',
    color: 'rgba(33, 33, 33, 1)',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  browseButtonText: {
    marginLeft: '5px',
  },
  dropZoneNotActive: {
    margin: 'auto',
    width: '80%',
    border: 'dashed 1px black',
    padding: '20px',
    marginTop: '50px',
    marginBottom: '50px',
  },
  dropZoneActive: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    margin: 'auto',
    width: '80%',
    border: 'dashed 1px rgba(33,150,243, 1)',
    padding: '20px',
    marginTop: '50px',
    marginBottom: '50px',
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
  marginTopBottom10: {
    margin: '10px 0px',
  },
  confirmDelete: {
    color: 'rgba(34, 150, 243, 1)',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  numberOfFilesText: {
    color: '#757575',
  },
  errorTitle: {
    color: '#F1453D',
  },
  totalHistoryData: {
    fontSize: '1.2em',
    color: '#8F1C20',
    padding: '30px 20px',
  },
  noResult: {
    textAlign: 'center',
    padding: '20px',
  },
  imageThumbnail: {
    height: '75px',
  },
  statusApproved: {
    color: '#50ae55',
  },
  statusInProcess: {
    color: '#E1B401',
  },
  statusPending: {
    color: '#fe9d27',
  },
  statusRejected: {
    color: '#f40d1a',
  },
  marginTop20: {
    marginTop: '20px',
  },
})

export default styles

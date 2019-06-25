
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
  sendToTargetUpload: {
    margin: '10px',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
  cancelButton: {
    margin: '30px 40px',
    color: 'rgba(33, 33, 33, 1)',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  browseButtonText: {
    margin: '0px 5px',
  },
  dropZoneNotActiveOptional: {
    width: '90%',
    border: 'dashed 2px black',
    padding: '20px',
    margin: '15px auto',
    height: '335px',
  },
  dropZoneNotActiveRequired: {
    width: '90%',
    padding: '20px',
    backgroundColor: 'rgba(240, 85, 69, .05)',
    border: '2px dashed #F05545',
    margin: '15px auto',
    height: '335px',
  },
  dropZoneActive: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    width: '90%',
    border: 'dashed 1px rgba(33,150,243, 1)',
    padding: '20px',
    margin: '15px auto',
    height: '335px',
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
    marginTop: '12px !important',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: '16px',
    color: 'rgba(102, 102, 102, .86)',
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
  videoUploadIcon: {
    width: '75px',
    height: '75px',
    color: 'rgba(102, 102, 102, .86)',
  },
  lineSeperator: {
    width: '250px',
    borderColor: 'rgba(0, 0, 0, 0.12);',
    margin: '25px auto',
    textAlign: 'center',
  },
  requiredTypeRequired: {
    fontSize: '.75em',
    color: 'red',
  },
  requiredTypeOptional: {
    fontSize: '.75em',
  },
  videoTitle: {
    marginLeft: '13px',
    marginTop: '12px',
  },
  videoFileTypeTitle: {
    fontSize: '1.2em',
    color: '#8F1C20',
    marginTop: '0',
  },
  errorOutline: {
    color: 'red',
    fontSize: '20px',
  },
  vuCcPreview: {
    overflow: 'auto',
    border: '1px solid grey',
    height: '330px',
    margin: '10px',
    padding: '10px',
  },
  vuCcPreviewLarge: {
    overflow: 'auto',
    border: '1px solid grey',
    height: '365px',
    margin: '10px',
    padding: '10px',
  },
  vuCcPreviewRejected: {
    overflow: 'auto',
    border: '1px solid grey',
    height: '270px',
    margin: '10px',
    padding: '10px',
  },
  vuVideoPreview: {
    maxHeight: '330px',
    margin: '10px',
    padding: '10px',
  },
  vuVideoPreviewlarge: {
    maxHeight: '375px',
    margin: '10px',
    padding: '10px',
  },
  vuVideoPreviewRejected: {
    maxHeight: '265px',
    margin: '10px',
    padding: '10px',
  },
  vuTranscriptPreview: {
    width: '100%',
    margin: '15px',
    height: '345px',
  },
  vuTranscriptPreviewLarge: {
    width: '100%',
    margin: '15px',
    height: '390px',
  },
  vuTranscriptPreviewRejected: {
    width: '100%',
    margin: '15px',
    height: '285px',
  },
  videoHeaderFileName: {
    color: 'grey',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '14px',
  },
  deleteIcon: {
    color: '#488DFB',
    fontSize: '32px',
    cursor: 'pointer',
  },
  vuAddTcinTitle: {
    fontSize: '1.2em',
    color: '#8F1C20',
    height: '50px',
  },
  vuTcinRequiredMessage: {
    color: '#d50000',
    marginTop: '10px',
  },
  errorChip: {
    border: '2px solid red',
    backgroundColor: 'rgba(255, 0, 0, .15)',
    margin: '0px 5px',
  },
  invalidErrorText: {
    color: '#d50000',
    marginBottom: '15px',
  },
  notOwnedErrorText: {
    color: '#d50000',
    marginBottom: '15px',
    marginTop: '15px',
  },
  expansionPanel: {
    margin: '0px 10px',
    width: '100%',
  },
  cloudDone: {
    color: 'green',
    marginLeft: '15px',
  },
  tcinAssociated: {
    margin: '0px 15px',
  },
  headerVttError: {
    backgroundColor: 'rgba(143, 28, 32, 1)',
  },
  headerVttErrorTitle: {
    fontSize: '20px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: '#FFFFFF',
  },
  closeIconCC: {
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  contentFileName: {
    marginTop: '20px',
  },
  contentFileNameText: {
    color: 'rgba(0, 0, 0, 1)',
  },
  vttErrorBox: {
    border: '1px solid #ccc',
    margin: '20px 0px',
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    overflowY: 'auto',
    height: '105px',
  },
  errorIconRed: {
    color: '#AF1100',
  },
  vttErrorContent: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 1)',
  },
  hmsVttFileBox: {
    border: '1px solid #ccc',
    margin: '20px 0px',
    paddingTop: '10px',
    paddingLeft: '25px',
    paddingRight: '10px',
    overflowY: 'auto',
    height: '175px',
  },
  hmsVttFileIndexError: {
    color: '#AF1100',
    fontWeight: '800',
    marginRight: '15px',
  },
  hmsVttFileIndex: {
    color: 'rgba(192, 192, 192, 1)',
    marginRight: '15px',
  },
  hmsVttErrorLine: {
    backgroundColor: 'rgba(250, 250, 0, 0.5)',
    padding: '2px',
    paddingRight: '5px',
  },
  marginFileLine: {
    margin: '2px 0px',
  },
  downloadVTT: {
    color: 'rgba(68, 138, 255, 1)',
    border: '1px solid',
    marginRight: '16px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    '&:hover': {
      color: 'rgba(41, 98, 255, 1)',
      marginRight: '16px',
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
  dismissVTT: {
    color: 'rgba(255, 255, 255, 1)',
    marginRight: '16px',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 1)',
      marginRight: '16px',
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
  },
  rejectedMessage: {
    backgroundColor: 'rgba(255,0,0,.15)',
    border: '2px dashed #F05545',
    margin: '10px 11px 5px',
    padding: '10px 0px',
    textAlign: 'center',
  },
  waitingForReviewMessage: {
    backgroundColor: 'rgba(225,180,1,.1)',
    border: '2px dashed #E18401',
    margin: '10px 11px 5px',
    padding: '10px 0px',
    textAlign: 'center',
  },
  approvedMessage: {
    backgroundColor: 'rgba(0,255,0,.15)',
    border: '2px dashed #55F045',
    margin: '10px 11px 5px',
    padding: '10px 0px',
    textAlign: 'center',
  },
  addReplacement: {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    margin: '20px 5px',
    '&:hover': {
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
  },
  paddingSide15: {
    padding: '0px 15px',
    paddingTop: '10px',
  },
  paddingRight5: {
    paddingRight: '5px',
  },
  helpLink: {
    paddingLeft: '10px',
    color: 'rgba(68, 138, 255, 1)',
    cursor: 'pointer',
  },
  referenceLink: {
    textDecoration: 'none',
    color: '#0000EE',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  helpText: {
    marginTop: '30px',
    fontSize: '18px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  closeHelp: {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    marginBottom: '20px',
    '&:hover': {
      color: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(41, 98, 255, 1)',
      marginBottom: '20px',
    },
  },
  helpContainer: {
    maxWidth: '494px',
  },
})

export default styles

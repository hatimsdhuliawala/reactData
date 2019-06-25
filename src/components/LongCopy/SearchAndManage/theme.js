// import { lighten } from 'material-ui/styles/colorManipulator'
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
  formControl: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  mediumMargin: {
    margin: theme.spacing.unit * 1,
  },
  smallMargin: {
    margin: theme.spacing.unit * 0.5,
  },
  saveTitleText: {
    color: theme.palette.common.white,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  copyDataroot: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  highlight:
  theme.palette.type === 'light'
    ? {
      color: 'white',
      backgroundColor: 'rgba(34, 150, 243, 1)',
    }
    : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark,
    },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: 'white',
  },
  progressBar: {
    marginLeft: '50%',
  },
  title: {
    flex: '0 0 auto',
  },
  backButtonLabel: {
    padding: 0,
    color: '#174C9F',
    cursor: 'pointer',
  },
  headerLabel: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#8F1C1F',
    textAlign: 'center',
    paddingTop: '15px',
  },
  additionalBulletLabel: {
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'left',
    marginTop: 8,
    lineHeight: '1em',
    minHeight: '1em',
  },
  helperTextLabel: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    marginTop: 8,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
  },
  secondaryHeading: {
    alignItems: 'center',
  },
  greyBackground: {
    backgroundColor: 'rgba(235, 235, 235, 0.9)',
    border: '1px',
  },
  buttonSaveDraft: {
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
  buttonSaveLongCopy: {
    backgroundColor: 'rgba(56, 94, 166, 1)',
    color: 'white',
    border: '1px solid',
    marginLeft: '10px',
    marginTop: '10px',
    '&:disabled': {
      backgroundColor: 'rgba(153, 153, 153, 1)',
      marginLeft: '10px',
      border: '1px solid',
      marginTop: '10px',
      color: 'white',
    },
    '&:hover': {
      backgroundColor: 'rgba(56, 94, 166, 1)',
      color: 'white',
    },
  },
  maxExceeded: {
    color: 'red',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    marginTop: 8,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
  },
  buttonSaveNote: {
    color: 'rgba(56, 94, 166, 1)',
    border: '1px solid',
    marginTop: '15px',
    marginRight: '15px',
    '&:disabled': {
      color: 'rgba(153, 153, 153, 1)',
      border: '1px solid',
      marginTop: '15px',
      marginRight: '15px',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  errorBorder: {
    border: '1px solid red',
  },
  gridList: {
    width: '510px',
  },
  selectedImage: {
    width: '794px',
    height: '794px',
    border: null,
  },
  gridListImage: {
    width: '154px',
    height: '154px',
    margin: '10px',
  },
  gridListImageSelected: {
    width: '154px',
    height: '154px',
    margin: '10px',
    border: '2px solid rgba(123, 29, 43, 1)',
  },
  heightImage: {
    maxHeight: '794px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  noHoverBachground: {
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  notesSectionDrawer: {
    width: '700px',
  },
  drawerButtonSave: {
    margin: '0px 0px 0px 5px',
    backgroundColor: 'rgba(34, 150, 243, 1)',
    borderRadius: '5px',
    color: 'white',
    '&:hover': { backgroundColor: 'rgba(34, 150, 243, 1)' },
    '&:disabled': { backgroundColor: 'rgba(153, 153, 153, 1)' },
  },
  drawerButtonCancel: {
    margin: '0px 0px 0px 5px',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid rgba(232, 44, 141, 1)',
    color: 'rgba(232, 44, 141, 1)',
    '&:hover': { backgroundColor: 'white' },
  },
  drawerFixedBottom: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
  noResult: {
    textAlign: 'center',
    padding: '20px',
  },
  saveFilterWidth: {
    width: '600px',
  },
  marginTop20: {
    marginTop: '20px',
  },
  linkButton: {
    boxShadow: 'none',
    textTransform: 'none',
    zDepthShadows: 'none',
    fontSize: 16,
    padding: '0px 0px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      shadows: 'none',
    },
  },
  prodcutDetail: {
    width: '526.66px',
    height: '293px',
    backgroundColor: 'rgba(235, 235, 235, 1)',
    marginBottom: '12px',
    borderBottom: '2px dotted grey',
  },
  prodcutDetailCopyWriter: {
    width: '526.66px',
    height: '293px',
    backgroundColor: 'rgba(235, 235, 235, 1)',
    marginTop: '7px',
    borderBottom: '2px dotted grey',
  },
  prodcutDetailHeader: {
    paddingLeft: '20px',
    paddingTop: '5px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#999999',
    lineHeight: '28px',
  },
  productDetailContainer: {
    maxHeight: '260px',
    paddingLeft: '20px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '15px',
    color: '#666666',
    lineHeight: '28px',
    overflowY: 'auto',
  },
  buttonNotReady: {
    width: '100px',
    height: '100px',
    borderRadius: '15px',
    margin: '15px 15px',
  },
  buttonDisplayName: {
    marginBottom: '15px',
    color: '#1B75D3',
    fontSize: '14px',
  },
  statusContainer: {
    width: '160px',
    cursor: 'pointer',
  },
  swatchImage: {
    width: '50px',
    height: '50px',
    margin: '10px',
    borderRadius: '10%',
    cursor: 'pointer',
  },
  marginTopSmall: {
    marginTop: theme.spacing.unit * 4,
  },
  swatchImageSelected: {
    width: '50px',
    height: '50px',
    margin: '10px',
    border: '2px solid rgba(123, 29, 43, 1)',
    borderRadius: '10%',
    cursor: 'pointer',
  },
  swatchContainer: {
    width: '520px',
    marginBottom: '20px',
  },
  selectedCheck: {
    color: 'rgba(123, 29, 43, 1)',
    position: 'relative',
    left: '-20px',
    top: '3px',
  },
  editLongCopy: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    width: '98%',
    overflowY: 'auto',
  },
  editFeatureBulletDiv: {
    marginTop: '16px',
    marginBottom: '9px',
    padding: '19px 8px',
    width: '96%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    overflowY: 'auto',
    height: '149px',
  },
  editFeatureBulletDivDisable: {
    marginTop: '16px',
    marginBottom: '9px',
    padding: '19px 6px',
    width: '96%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '4px',
    overflowY: 'auto',
    height: '149px',
    color: 'rgba(0, 0, 0, 1)',
  },
  counterContainer: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    marginTop: '16px',
    marginRight: '7px',
    border: 'solid 1px rgba(56, 94, 166, 1)',
    borderRadius: '4px',
    padding: '10px 6px',
    color: 'rgba(56, 94, 166, 1)',
  },
  numberCount: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '800',
    fontStyle: 'strong',
    fontSize: '38px',
    margin: '20px 2px',
  },
  boldText: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '600',
    fontStyle: 'strong',
    fontSize: '14px',
    textAlign: 'center',
  },
  headerHighlightText: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '600',
    fontStyle: 'strong',
    fontSize: '18px',
    marginLeft: '20px',
  },
  featurBulletDivUl: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    marginLeft: '20px',
  },
  historyLongCopy: {
    marginTop: '16px',
    marginBottom: '9px',
    padding: '19px 14px',
    width: '94%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '4px',
    overflowY: 'auto',
    maxHeight: '300px',
    color: 'rgba(0, 0, 0, 1)',
  },
  historyFeatureBullet: {
    marginTop: '16px',
    marginBottom: '9px',
    padding: '19px 6px',
    width: '96%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '4px',
    overflowY: 'auto',
    maxHeight: '300px',
    color: 'rgba(0, 0, 0, 1)',
  },
  historyheaderHighlightText: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '600',
    fontStyle: 'strong',
    fontSize: '18px',
    marginLeft: '5px',
  },
  historyfeaturBulletDivUl: {
    marginLeft: '5px',
  },
  filterTitle: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  marginBottom10: {
    marginBottom: '10px',
  },
  fixedAtBottom: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
  link: {
    marginRight: '20px',
  },
  totalElementsTitle: {
    color: '#8F1C20',
    padding: '30px 5px',
    fontSize: '1.2em',
  },
  deleteCopyFeatureTitle: {
    color: '#000000',
    fontSize: '1.2em',
    fontWeight: '600',
  },
  deleteCopyFeatureText: {
    fontSize: '0.8em',
  },
  deleteCopyFeatureButton: {
    color: 'rgba(34, 150, 243, 1)',
  },
  deleteCopyFeatureConfirmText: {
    color: '#000000',
    fontSize: '1.0em',
  },
  historyButtons: {
    cursor: 'pointer',
    border: '2px solid rgba(56, 94, 166, 1)',
    borderRadius: '5px',
    margin: '7px 0px',
    padding: '5px 10px',
    paddingBottom: '10px',
  },
  historyButtonsSelected: {
    cursor: 'pointer',
    backgroundColor: 'rgba(56, 94, 166, 1)',
    color: 'white',
    borderRadius: '5px',
    margin: '7px 0px',
    padding: '5px 10px',
    paddingBottom: '10px',
  },
  historyButtonContainer: {
    maxHeight: '275px',
    overflowY: 'auto',
    overflowX: 'auto',
  },
  notesWordCount: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    lineHeight: '1em',
    minHeight: '1em',
    marginRight: '18px',
  },
  marginTop10: {
    marginTop: '10px',
  },
  statusLabel: {
    marginTop: '30px',
  },
  marginTop30: {
    marginTop: '30px',
  },
  buttonSectionEditPage: {
    marginTop: '50px',
  },
  noHistoryData: {
    padding: '40px',
    margin: '20px',
  },
  buildFilterExpansion: {
    width: '100%',
    margin: '0px 13px',
  },
  buildFilterContainer: {
    marginRight: '20px',
  },
  newFilterContainer: {
    marginLeft: '20px',
  },
  minHeightCard: {
    minHeight: '217px',
  },
  paddingLeft20: {
    paddingLeft: '20px',
  },
  productModalContainer: {
    maxHeight: '260px',
    paddingLeft: '20px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: '15px',
    color: '#666666',
    lineHeight: '28px',
    overflowY: 'auto',
  },
  prodcutModalHeader: {
    paddingLeft: '20px',
    paddingTop: '5px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: '12px',
    color: '#999999',
    lineHeight: '28px',
  },
  tableNotes: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    maxWidth: '136px',
    maxHeight: '100px',
    overflowY: 'auto',
  },
})

export default styles

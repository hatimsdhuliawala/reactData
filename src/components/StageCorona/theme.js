const styles = theme => ({
  tcinList: {
    width: '400px',
  },
  closeHelp: {
    backgroundColor: '#EEEEEE',
    padding: '15px 10px',
  },
  closeHelpBackButton: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  closeHelpBackText: {
    fontWeight: 600,
  },
  closeHelpInner: {
    padding: '35px 15px',
  },
  nonProdImage: {
    maxWidth: '150px',
    maxHeight: '150px',
    marginTop: '10px',
  },
  helpInnerText: {
    padding: '10px 0px',
  },
  aboutPageButton: {
    cursor: 'pointer',
    color: 'rgba(56, 94, 166, 1)',
    fontSize: '12px',
    fontWeight: 600,
  },
  previewPublishButton: {
    backgroundColor: '#0D46A0',
    color: '#FFFFFF',
    border: '1px solid',
    marginLeft: '10px',
    marginTop: '10px',
    height: '36px',
    '&:disabled': {
      backgroundColor: '#EFEFEF',
      marginLeft: '10px',
      border: '1px solid',
      marginTop: '10px',
      color: '#BDBDBD',
    },
    '&:hover': {
      backgroundColor: '#002071',
      marginLeft: '10px',
      border: '1px solid',
      marginTop: '10px',
      color: '#FFFFFF',
    },
  },
  resetButton: {
    color: '#0D46A0',
    marginLeft: '10px',
    marginTop: '10px',
    border: '1px solid',
    backgroundColor: '#FFFFFF',
    height: '36px',
    '&:disabled': {
      color: '#BDBDBD',
      marginLeft: '10px',
      marginTop: '10px',
      backgroundColor: '#EFEFEF',
    },
    '&:hover': { backgroundColor: '#EFEFEF' },
  },
  stageImage: {
    width: '75px',
    height: '75px',
  },
  table: {
    marginTop: '30px',
    border: '1px solid grey',
    width: '620px',
    maxHeight: '550px',
    overflowY: 'auto',
    padding: '15px',
  },
  deleteicon: {
    cursor: 'pointer',
  },
  marginTop20: {
    marginTop: '20px',
  },
  textFieldWidth: {
    width: '450px',
  },
  helpText: {
    width: '400px',
  },
})

export default styles

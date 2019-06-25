const styles = theme => ({
  cepUploadMgr: {
    position: 'fixed',
    bottom: '10px',
    right: '22px',
    maxHeight: '200px',
    width: '400px',
    zIndex: '99',
    backgroundColor: 'white',
    borderRadius: '4px 4px 0 0',
  },
  cepUploadMgrBar: {
    height: '35px',
    fontSize: '14px',
    backgroundColor: '#8F1C20',
    color: 'white',
  },
  cepUploadMgrBody: {
    maxHeight: '150px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  uploadProgress: {
    float: 'right',
    marginRight: '19px',
  },
  uploadComplete: {
    float: 'right',
    marginRight: '19px',
    color: '#087F23',
  },
  uploadError: {
    float: 'right',
    marginRight: '19px',
    color: '#CC0000',
  },
})

export default styles

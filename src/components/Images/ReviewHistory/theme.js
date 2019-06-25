
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
})

export default styles

const styles = theme => ({
  singInBG: {
    backgroundImage: 'url("")',
    minHeight: '100vh',
  },
  signInButton: {
    marginLeft: '60px',
    marginRight: '60px',
    width: '200px',
    height: '50px',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(68, 138, 255, 1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(41, 98, 255, 1)',
    },
  },
})

export default styles

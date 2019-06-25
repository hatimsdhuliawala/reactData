/*
 * This is kept separate for the purpose of this being
 * a resuable component in other react projects
 */

const styles = {
  main: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 'calc(100% - 20px)',
    padding: '10px 0',
  },

  button: {
    height: '90%',
    maxHeight: '50px',
    width: '100%',
    maxWidth: '400px',
    borderColor: '#333333',
    borderStyle: 'solid',
    borderWidth: '1px',
  },

  buttonBar: {
    width: '100%',
    height: '60px',
    padding: '5px 0',
    textAlign: 'left',

  },

  buttonColumn: {
    width: 'calc(100% - 20px)',
    height: '100%',
    padding: '0px 10px',
  },

  hidden: {
    display: 'none',
  },

  buttonDiv: {
    margin: '10px auto',
    width: '100%',
    maxWidth: '400px',
  },
}

export default styles

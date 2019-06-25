import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from './ToolboxStyles'
import ReactFileReader from 'react-file-reader'

/*
 * This component makes a bar of buttons that can each have custom
 * callbacks, custom text and can be customly disabled, making them
 * inoperable.
 *
 * Additionally, buttons can have different 'types' which changes their
 * native functionality a bit, for example, a default button would just
 * use its callback when clicked, but a file reader passes that callback
 * to react-file-reader for reading a file upload to the page
 *
 * Ex:
 *  <Toolbox
 *    className={classes.toolbox}
 *    orientation={'vertical'}
 *    buttons={[{text:'b1', callback:()=>{},isDisabled:false},{text:'b2', callback:()=>readFiles(), type:'FileReader'}]} />
 *
 * Button Args:
 *  Text: the actual text the user of the page sees
 *  callback: what the button does when clicked
 *  isDisabled: whether to allow the callback to exucute when clicked or not (default false when ommitted)
 *  Type: the button type the be used, each button has different functionality
 *        either pre-render or when clicked (default is regular when ommitted or text isn't reconized)
 *
 * Types of buttons:
 *  FileReader:
 *    Desctiption: Uses react-file-reader to allow file io opps through the browser, and example use
 *    of this is reading data from a csv file
 *    Args: text,callback,isDisabled,type:'FileReader'
 *  Default:
 *    Desctiption: does what a basic button does
 *    Args: text,callback,isDisabled
 *
 * @author DaneJensen 
 *
 */

class Toolbox extends React.Component {
  getButtons () {
    const { buttons, classes } = this.props
    return (
      buttons.map((button, key) => {
        const { text, isDisabled, callback, type } = button
        // Add differnt types of buttons here
        switch (type) {
          case 'FileReader':
            // FileReaders can read files and put do stuff with their content
            // NOTE: The Callback is NOT on the button, but on the file reader
            return (
              <div class={classes.buttonDiv} key={key}>
                <ReactFileReader handleFiles={isDisabled ? () => {} : callback} fileTypes="*.csv">
                  <Button
                    className={classes.button}
                    disabled={isDisabled}
                  > {text} </Button>
                </ReactFileReader>
              </div>
            )
          default:
            return (
              <div name="toolboxbutton" className={classes.buttonDiv} key={key}>
                <Button
                  varient="outlined"
                  onClick={callback}
                  className={classes.button}
                  disabled={isDisabled}
                  disableRipple
                > { text } </Button>
              </div>
            )
        }
      })
    )
  }

  render () {
    const {
      classes,
      orientation,
    } = this.props
    if (this.props.disabled) {
      return (<div />)
    }
    return (
      <div class={classes.main} >
        <div id="buttonbarh" class={orientation === 'horrizontal' ? classes.buttonBar : classes.hidden}>
          {this.getButtons()}
        </div>
        <div id="buttonbarv" class={orientation === 'vertical' ? classes.buttonColumn : classes.hidden}>
          {this.getButtons()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout
  return {
    headerTitle: headerTitle,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

Toolbox.defaultProps = {
  disabled: false,
  orientation: 'horizontal',
  buttons: [],
}

Toolbox.propTypes = {
  classes: PropTypes.object,
  layoutActions: PropTypes.shape({
    setHeaderTitle: PropTypes.func,
  }),
  category: PropTypes.string,
  brand: PropTypes.string,
  size: PropTypes.string,
  data: PropTypes.object,
  header: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Toolbox))

import React from 'react'
import update from 'react-addons-update'
import '../../styles/chipComponent.css'
import _ from 'lodash'

class Chips extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: [],
      check: [],
      KEY: {
        backspace: 8,
        tab: 9,
        enter: 13,
        space: 32,
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^0-9]/g,
    }
    this.onKeyDown = this.onKeyDown.bind(this)
    this.clearInvalidChars = this.clearInvalidChars.bind(this)
    this.updateChips = this.updateChips.bind(this)
    this.focusInput = this.focusInput.bind(this)
    this.onBlurEvent = this.onBlurEvent.bind(this)
    this.onEnterEvent = this.onEnterEvent.bind(this)
    this.pasteFunction = this.pasteFunction.bind(this)
    this.updateTcinChips = this.updateTcinChips.bind(this)
  }

  componentDidMount () {
    this.setChips(this.props.chips)
  }

  componentWillReceiveProps (nextProps) {
    this.setChips(nextProps.chips)
  }

  setChips (chips) {
    if (chips && chips.length) this.setState({ chips: [] })
  }

  onKeyDown (event) {
    let keyPressed = event.which

    if (keyPressed === this.state.KEY.space ||
        (keyPressed === this.state.KEY.tab && event.target.value) || keyPressed === this.state.KEY.enter) {
      event.preventDefault()
      this.updateChips(event)
    } else if (keyPressed === this.state.KEY.backspace) {
      let chips = this.state.chips

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1])
      }
    }
  }

  pasteFunction (event) {
    let values = event.clipboardData.getData('text')
    var tcinList = _.words(values, /([0-9]{6,9})/gi)
    var checkChips = this.state.chips
    var vm = this
    event.preventDefault()
    _.forEach(tcinList, function (tcin) {
      let value = tcin

      if (!value) return

      let chip = value.trim().toLowerCase()

      if (chip && checkChips.indexOf(chip) < 0) {
        vm.setState({
          chips: update(
            checkChips,
            {
              $push: [chip],
            }
          ),
        })
        vm.onEnterEvent(checkChips.push(chip))
      }
    })
    event.target.value = ''
  }

  updateTcinChips (event, tcin) {
    if (!this.props.max ||
        this.state.chips.length < this.props.max) {
      let value = tcin

      if (!value) return

      let chip = value.trim().toLowerCase()
      if (chip && this.state.chips.indexOf(chip) < 0) {
        this.setState({
          chips: update(
            this.state.chips,
            {
              $push: [chip],
            }
          ),
        })
        this.onEnterEvent(this.state.chips.push(chip))
        this.props.tcinData.push(chip)
      }
    }
  }

  onBlurEvent () {
    if (this.state.chips && this.props.onBlur) {
      return this.props.onBlur(this.state.chips)
    }
  }

  onEnterEvent () {
    if (this.state.chips && this.props.onEnter) {
      return this.props.onEnter(this.state.chips)
    }
  }

  clearInvalidChars (event) {
    let value = event.target.value
    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '')
      // TODO Add the erro message for invalid character
      // alert('What are you doing')
    } else if (value.length > 9) {
      event.target.value = value.substr(0, 9)
    }
  }

  updateChips (event) {
    if (!this.props.max ||
        this.state.chips.length < this.props.max) {
      let value = event.target.value

      if (!value) return

      let chip = value.trim().toLowerCase()
      if (chip && this.state.chips.indexOf(chip) < 0) {
        this.setState({
          chips: update(
            this.state.chips,
            {
              $push: [chip],
            }
          ),
        })
        this.onEnterEvent(this.state.chips.push(chip))
      }
    }
    event.target.value = ''
  }

  deleteChip (chip) {
    let index = this.state.chips.indexOf(chip)

    if (index >= 0) {
      this.setState({
        chips: update(
          this.state.chips,
          {
            $splice: [[index, 1]],
          }
        ),
      })
      this.onBlurEvent(this.state.chips.splice(index, 1))
      this.onBlurEvent(this.props.tcinData.splice(index, 1))
    }
  }

  focusInput (event) {
    let children = event.target.children

    if (children.length) children[children.length - 1].focus()
  }

  render () {
    this.state.chips.map((chip) => { if (!_.includes(this.props.chips, chip)) { return (this.props.chips.push(chip)) } })
    let chips = this.state.chips.map((chip, index) => {
      return (
        <div className="chip" key={index}>
          <span className="chip-value">{chip}</span>
          <button type="button" className="chip-delete-button" onClick={this.deleteChip.bind(this, chip)}>x</button>
        </div>
      )
    })

    let placeholder = 'ENTER TCIN'
    let customClassName = this.props.containerClassName || ''
    let inputClassName = this.props.inputClassName || ''
    return (
      <div>
        <div className={'chips ' + customClassName}>
          {chips}
          <input type="text"
            className={'chips-input ' + inputClassName}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.clearInvalidChars}
            onBlur={this.onBlurEvent}
            onPaste={this.pasteFunction}
          />
        </div>
      </div>
    )
  }
}

export default Chips

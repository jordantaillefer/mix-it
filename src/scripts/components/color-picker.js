import React from 'react'
import { CirclePicker } from 'react-color'

const ColorPicker = React.createClass({
  getInitialState() {
    return ({color : this.props.color})
  },
  handleChangeComplete( color ) {
    this.setState({ color : color.hex })
    this.props.changeColor( color.hex )
  },
  render() {
    return (
      <div className="group-drawer">
        <div className="color-picker">
          <CirclePicker color={ this.state.color }
          onChangeComplete={ this.handleChangeComplete }/>
        </div>
      </div>
    )
  }
})

export default ColorPicker

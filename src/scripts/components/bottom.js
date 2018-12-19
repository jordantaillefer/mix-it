import React from 'react'

import '../../styles/bottom.css'


let Bottom = React.createClass({
  render() {
    let styleProgress1 = {
      backgroundColor : "pink",
      width : this.props.playerProgress1 + "%"
    }
    let styleProgress2 = {
      backgroundColor : "#E57373",
      width : this.props.playerProgress2 + "%"
    }
    return (
      <div className="bottom">
        <div style={ styleProgress1 } className="playerProgress1"></div>
        <div style={ styleProgress2 } className="playerProgress2"></div>
      </div>
    )
  }
})

export default Bottom

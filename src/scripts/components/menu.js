import React from 'react'

import '../../styles/menu.css'

const Menu = React.createClass({
  render() {
    return(
      <div className="panel-menu">
        <div className="boutonSetting" onClick={ this.props.clickSettings }></div>
        <div className="boutonLogo" onClick={ this.props.clickMixIt }></div>
        <div className="boutonDrinkIt"></div>
      </div>
    )
  }
})

export default Menu

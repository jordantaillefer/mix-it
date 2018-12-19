import React from 'react'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'

import SelectEndDuration from '../components/select-end-duration'
import ColorPicker from '../components/color-picker'

var DrawerSettings = React.createClass({
  render() {
    return (
      <Drawer width={ 300 } open={ this.props.open }
      docked={ false }
      onRequestChange={ this.props.requestChange }
      >
        <AppBar title="Paramètres" />
        <div className="panel-settings">
          <SelectEndDuration endDuration={ this.props.endDuration }
            updateEndDuration={ this.props.updateEndDuration }/>
          <Divider />
          <ColorPicker changeColor={ this.props.changeColor }
          color={ this.props.color }
          />
        </div>
      </Drawer>
    )
  }
})

export default DrawerSettings

import React from 'react'
import '../../styles/material.css'


import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

let LoadPlaylist = React.createClass({
  getInitialState() {
    return({
      idPlaylist : "PLEWd0RkNd-yoOLEladQmnze1zc1Qi_VpP"
    })
  },
  render(){
    return(
      <div className="group-drawer">
          <TextField
            hintText="Id de la playlist"
            floatingLabelText="Id de la playlist"
            value={ this.state.idPlaylist }
            fullWidth={ true }
            onChange={ ( idPlaylist ) => this.setState( {idPlaylist : idPlaylist.target.value})}
            ref="loadPlaylist"
          />
          <FlatButton primary={ true } onClick={ () =>
            this.props.newPlaylist( this.state.idPlaylist ) }
            label="Charger la playlist"
          />
      </div>
    )
  }
})

export default LoadPlaylist

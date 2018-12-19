import React from 'react'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import '../../styles/information-playlist.css'

var AddVideoToPlaylist = React.createClass({
  getInitialState() {
    return({
      idVideo : "",
    })
  },
  render() {
    const style = {
      color : 'white',
      fontSize : '0.7em'
    }
    return(
      <div className="group">
          <TextField
            hintText="url de la vidéo"
            floatingLabelText="url de la vidéo"
            value={ this.state.idVideo }
            onChange={ ( event ) => this.setState( { idVideo : event.target.value })}
          />
          <FlatButton className="add-button" labelStyle={ style } onClick={ () => {
            this.setState({ idVideo : "" })
            this.props.addVideo( this.state.idVideo ) }
          }
            label="Ajouter la vidéo"
          />
      </div>
    )
  }
})

export default AddVideoToPlaylist

import React from 'react'

import FlatButton from 'material-ui/FlatButton'

let Playlist = React.createClass({
  render() {
    return(
      <FlatButton primary={ true }
      onClick={ () =>
        this.props.newPlaylist( this.props.idPlaylist )
        }
        label={ this.props.name }
      />
    )
  }
})

export default Playlist

import React from 'react'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'

import LoadPlaylist from '../components/load-playlist'
import Playlist from '../components/playlist'

import playlists from '../api/playlist'

import '../../styles/drawer.css'

let DrawerPlaylist = React.createClass({
  afficherSuggestion() {
    let suggestion = []
    for (var i = 0; i < playlists.length; i++) {
      suggestion.push( <Playlist
            key={ playlists[i].idPlaylist }
            name={ playlists[i].name }
            idPlaylist={ playlists[i].idPlaylist }
            newPlaylist={ this.props.addNewPlaylist }
        />)

    }
    return suggestion
  },
  render() {
    let suggestion = this.afficherSuggestion()
    return (
      <Drawer width={ 300 } openSecondary={ true } open={ this.props.open }
      docked={ false }
      onRequestChange={ this.props.requestChange }
      >
        <AppBar title="Paramètres" />
        <div className="panel-settings">
          <LoadPlaylist newPlaylist={ this.props.addNewPlaylist }/>
          <Divider/>
          <div className="suggestion">
            { suggestion }
          </div>
        </div>
      </Drawer>
    )
  }
})

export default DrawerPlaylist

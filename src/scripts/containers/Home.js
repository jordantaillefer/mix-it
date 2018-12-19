import React from 'react'

import PlayerVevo from './PlayerVevo'

import DrawerSettings from './DrawerSettings'
import DrawerPlaylist from './DrawerPlaylist'
import Snackbar from 'material-ui/Snackbar';
import Bottom from '../components/bottom'
import Menu from '../components/menu'
import InformationPlaylist from '../components/information-playlist'

import '../../styles/material.css'

var Home = React.createClass({
  getInitialState() {
    return ({
      color : '#E57373',
      playlistTitle : '',
      urlPlayer1 : '',
      urlPlayer2 : '',
      player1Play : false,
      player2Play : false,
      volumePlayer1 : 1,
      volumePlayer2 : 0,
      playlist : [],
      videoPlay : 0,
      timeBeforeChange : 15,
      open : false,
      openPlaylist : false,
      openSnack : false,
      labelSnack : "",
    })
  },
  addNewPlaylist( input ) {
    let urlPlaylistTitle ="https://www.googleapis.com/youtube/v3/playlists"+
    "?part=snippet"+
    "&id=" + input +
    "&fields=items(snippet(title))"+
    "&key=AIzaSyDV92ga7wSwZ11Xys76F7HMiXo52q3lIl8"
    fetch( urlPlaylistTitle )
    .then(response => response.json())
    .then(responseJson => {
      let playlistTitle = responseJson["items"][0]["snippet"]["title"]
      this.setState({ playlistTitle })
    })

    let url ="https://www.googleapis.com/youtube/v3/playlistItems"+
    "?part=contentDetails,snippet"+
    "&maxResults=50"+
    "&playlistId=" + input +
    "&fields=items(snippet(title),contentDetails(videoId))"+
    "&key=AIzaSyDV92ga7wSwZ11Xys76F7HMiXo52q3lIl8"
    this.setState({ videoPlay : 0 })
    fetch( url )
    .then(response => response.json())
    .then(responseJson => {
        const videoId = responseJson["items"]
        const playlist = videoId.map(video => ({
            "videoId" : video["contentDetails"]["videoId"],
            "videoTitle" : video["snippet"]["title"],
        }))
        let urlPlayer1 = 'https://www.youtube.com/watch?v='
        + playlist[this.state.videoPlay]["videoId"]
        let videoTitle1 = playlist[this.state.videoPlay]["videoTitle"]
        let urlPlayer2 = 'https://www.youtube.com/watch?v='
        + playlist[this.state.videoPlay+1]["videoId"]
        let videoTitle2 = playlist[this.state.videoPlay+1]["videoTitle"]
        this.setState({
            playlist,
            urlPlayer1, videoTitle1, player1Play : true,
            urlPlayer2, videoTitle2, player2Play : false,
        })

      })
    // let urlPlayer1 = 'https://www.youtube.com/watch?v='
    // + this.refs.loadPlaylist.value
    // this.setState({ urlPlayer1 })
  },
  nextVideo( playerName ){
    this.setState({ videoPlay : this.state.videoPlay +1 })
    let videoId = this.state.playlist[this.state.videoPlay]["videoId"]
    let urlPlayer = 'https://www.youtube.com/watch?v='
    + videoId
    let videoTitle = this.state.playlist[this.state.videoPlay]["videoTitle"]
    if( playerName === "player1" ) {
      this.setState({
        urlPlayer2 : urlPlayer,
        videoTitle2 : videoTitle,
        player2Play : true
      })
    } else if ( playerName === "player2" ) {
      this.setState({
        urlPlayer1 : urlPlayer,
        videoTitle1 : videoTitle,
        player1Play : true
      })
    }
  },
  increaseOppositePlayer( playerName, volume ) {

    if( playerName === "player1" ) {

      if( this.state.player2Play === false) {
        this.nextVideo( playerName )
      }
      this.setState({ volumePlayer1 : volume, volumePlayer2 : 1-volume })
    } else if ( playerName === "player2" ) {
      if( this.state.player1Play === false) {
        this.nextVideo( playerName )
      }
      this.setState({ volumePlayer1 : 1-volume, volumePlayer2 : volume })
    }
  },
  updatePlayerState( playerName ) {
    if( playerName === "player1" ) {
      this.setState({ player1Play : false, progress1 : 0 })
    } else if ( playerName === "player2" ) {
      this.setState({ player2Play : false, progress2 : 0 })
    }
  },
  updateProgress( playerProgress, playerName ) {
    let progress = playerProgress.played * 100
    if( playerName === "player1" ) {
      this.setState({ progress1 : progress })
    } else if ( playerName === "player2" ) {
      this.setState({ progress2 : progress })
    }
  },
  setTitleByVideoId( videoId ) {
    let url = "https://www.googleapis.com/youtube/v3/videos?"+
    "id="+videoId+
    "&key=AIzaSyDV92ga7wSwZ11Xys76F7HMiXo52q3lIl8"+
    "&fields=items(snippet(title))"+
    "&part=snippet"
    let playlist = this.state.playlist
    let index = this.state.videoPlay+1
    fetch(url)
      .then((data) => data.json())
      .then((dataJson) => {
          let data = dataJson["items"]
          if( data.length === 0 ) {
            let labelSnack = "Une erreur est survenue dans l'ajout de la vidéo"
            this.setState({ playlist, openSnack : true, labelSnack })
          } else {
            playlist.splice( this.state.videoPlay + 1, 0, {"videoId" : videoId } )
            playlist[index]['videoTitle'] = data[0]["snippet"]["title"]
            let labelSnack = "La vidéo a bien été ajoutée"
            this.setState({ playlist, openSnack : true, labelSnack })

          }
      })
  },
  addVideo( idVideo ) {
    let video_id = idVideo.split('v=')[1]
    let ampersandPosition = video_id.indexOf('&')
    if(ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition)
    }
    this.setTitleByVideoId( video_id )

  },
  updateEndDuration( timeBeforeChange ) {
    this.setState({ timeBeforeChange })
  },
  handleRequestClose() {
    this.setState({ openSnack : false })
  },
  changeColor( color ) {
    this.setState({ color })
  },
  alertError ( playerName ) {
    playerName === 'player1' ? this.nextVideo('player2') : this.nextVideo('player1')
  },
  render() {
    return (
      <div className="wrapper">
        <Menu
          clickSettings= {() => this.setState({open : true})}
          clickMixIt= {() => this.setState({openPlaylist : true})}
        />
        <div className="home-panel">
          <div className="panel-home-player">
            <PlayerVevo
              key="player1"
              name="player1"
              color={ this.state.color }
              onProgress={ this.updateProgress }
              volume={ this.state.volumePlayer1 }
              play={ this.state.player1Play }
              urlPlayer={ this.state.urlPlayer1 }
              videoTitle={ this.state.videoTitle1 }
              timeBeforeChange={ this.state.timeBeforeChange }
              videoWillEnd={ ( playerName ) => this.updatePlayerState( playerName ) }
              increaseOppositePlayer={ this.increaseOppositePlayer }
              alertError={ this.alertError }
            />
            <InformationPlaylist
              color={ this.state.color }
              playlistTitle={ this.state.playlistTitle }
              progress1={ this.state.progress1 }
              progress2={ this.state.progress2 }
              click={ () => this.setState({ open : !this.state.open }) }
              playlist={ this.state.playlist }
              videoPlay={ this.state.videoPlay }
              addVideoToPlaylist={ this.addVideo }
            />
            <PlayerVevo
              key="player2"
              name="player2"
              color={ this.state.color }
              onProgress={ this.updateProgress }
              volume={ this.state.volumePlayer2 }
              play={ this.state.player2Play }
              urlPlayer={ this.state.urlPlayer2 }
              videoTitle={ this.state.videoTitle2 }
              timeBeforeChange={ this.state.timeBeforeChange }
              videoWillEnd={ ( playerName ) => this.updatePlayerState( playerName ) }
              increaseOppositePlayer={ this.increaseOppositePlayer }
            />
          </div>
          <Bottom playerProgress1={ this.state.progress1 }
            playerProgress2={ this.state.progress2 }/>
        </div>
        <DrawerSettings
          open={ this.state.open }
          addNewPlaylist={ this.addNewPlaylist }
          addVideoToPlaylist={ this.addVideo }
          updateEndDuration={ this.updateEndDuration }
          requestChange={ (open) => this.setState({open})}
          changeColor={ this.changeColor }
          color={ this.state.color }
          endDuration={ this.state.timeBeforeChange }
        />
        <DrawerPlaylist open={ this.state.openPlaylist }
          addNewPlaylist={ this.addNewPlaylist }
          updateEndDuration={ this.updateEndDuration }
          requestChange={ (openPlaylist) => this.setState({openPlaylist})}
        />
        <Snackbar
          open={ this.state.openSnack }
          message={ this.state.labelSnack }
          autoHideDuration={ 4000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    )
  }
})

export default Home

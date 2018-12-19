import React from 'react'

// import CircularProgress from 'material-ui/CircularProgress';
import AddVideoToPlaylist from './add-video-to-playlist'

import '../../styles/information-playlist.css'


var InformationPlaylist = React.createClass({
  getInitialState() {
    const style = {
      backgroundColor : {
          backgroundColor : this.props.color
      },
    }
    return({
      style : style
    })
  },
  afficherTitle() {
    let style = {
      backgroundColor : {
        backgroundColor : this.props.color
      },
    }
    if(this.props.playlist.length > 0 ) {
      let titles = []
      for (var i = 0; i < 4; i++) {
        let index = this.props.videoPlay + i
        let key = `title${index}`
        let className = i === 0 ? "currentVideoPlaylist" :  "videoPlaylist"
        if( this.props.playlist[index] !== undefined )   titles.push(
            <li className={ className } key={ key }>
              { index+1 }{ ' - '}{ this.props.playlist[index]["videoTitle"] }
            </li>
          )
      }
      return <div className="panel-info-playlist" style={ style.backgroundColor }>
              <div className="text-list">
                <h1 className="playlist-title">{ this.props.playlistTitle }</h1>
                <div className="panel-list-title">
                  <ol className="list-title">
                    { titles }
                  </ol>
                </div>
              </div>
              <AddVideoToPlaylist addVideo={ this.props.addVideoToPlaylist }/>
            </div>

    }
  },
  render() {

    return (
      <div className="information">
        <div className="information-circle">
        { this.afficherTitle()}

        </div>
      </div>
    )
  }
})

export default InformationPlaylist

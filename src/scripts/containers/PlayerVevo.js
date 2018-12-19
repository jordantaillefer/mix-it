import React from 'react'
import ReactPlayer from 'react-player'

import '../../styles/player.css'


const PlayerVevo = React.createClass({
  getInitialState() {
    return ({
      urlPlayer1 : this.props.urlPlayer,
      duration : 0,
      min : 0,
      sec : 0,
      percentBeforeChange : 0,
      minElapsed : 0,
      secElapsed : 0,
      durationElapsed : 0,
      videoTitle : "",
    })
  },
  getVideoDuration( duration ) {
    let min = ~~( duration / 60 )
    let sec = ~~( duration - min * 60 )
    let percentBeforeChange = (duration - this.props.timeBeforeChange ) / duration
    this.setState({ duration, min, sec, percentBeforeChange })
  },
  checkOnProgress( progress ) {
    let durationElapsed = this.state.duration * progress.played
    // let durationElapsed = this.state.durationElapsed+1
    let minElapsed = ~~( durationElapsed / 60 )
    let secElapsed = ~~( durationElapsed - minElapsed * 60 )
    this.setState({ durationElapsed, minElapsed, secElapsed })
    this.props.onProgress( progress, this.props.name )
    if( progress.played > this.state.percentBeforeChange ){
      let percentBeforeEnd = 1-progress.played
      let percentToEnd = 1-this.state.percentBeforeChange
      let volume = percentBeforeEnd/percentToEnd

      this.props.increaseOppositePlayer( this.props.name, volume )
    }
  },
  end() {
    // let durationElapsed = this.state.durationElapsed+1
    let minElapsed = this.state.min
    let secElapsed = this.state.sec
    this.setState({ minElapsed, secElapsed })
    this.props.increaseOppositePlayer( this.props.name, 0 )
    return this.props.videoWillEnd( this.props.name )
  },
  render() {
    let style = {
      backgroundColor : {
        backgroundColor : this.props.color
      },
      border : {
        border : "solid 20px " +  this.props.color,
      }
    }
    return (
      <div className="player-container">
        <div className="player-panel" style={ style.border }>
          <ReactPlayer
              onDuration={ this.getVideoDuration }
              onProgress={ this.checkOnProgress }
              className={ "player-vevo" }
              height="323px"
              volume={ this.props.volume }
              url={ this.props.urlPlayer }
              onPlay={ this.setInformation }
              onEnded={ this.end }
              playing={ this.props.play }
              onError={ (data) => this.props.alertError(this.props.name)}
              controls
          />
        </div>
        <div className={ "player-information" } style={ style.backgroundColor }>
          <div className="information-timer">
            <span>{ this.state.minElapsed }{ ':'}{ this.state.secElapsed }{ '/' }</span>
            <span>{ this.state.min }{ ':'}{ this.state.sec }</span>
          </div>
          <div className="information-title">
            <span>{ this.props.videoTitle }</span>
          </div>
        </div>
      </div>
    )
  }
})

export default PlayerVevo

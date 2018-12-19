import React from 'react'

import Slider from 'material-ui/Slider'
import FlatButton from 'material-ui/FlatButton'

var SelectEndDuration = React.createClass({
  getInitialState() {
    return ({
      endDuration : this.props.endDuration,
    })
  },
  render() {
    return (
      <div>
        <div className="group-drawer">
          <span>{ 'Temps avant changement de musique :  ' } { this.state.endDuration }</span>
          <Slider
            step={ 1 }
            defaultValue={ this.state.endDuration }
            min={ 8 }
            max={ 20 }
            onChange={ ( event, endDuration ) => {
                this.props.updateEndDuration( endDuration )
                this.setState({ endDuration })
              }
            }
            />
        </div>
      </div>

    )
  }
})

export default SelectEndDuration

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from './scripts/store/configureStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/app.css'
import './styles/reset.css'

import Home from './scripts/containers/Home'

const store = configureStore()

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider>
    <Router history={ browserHistory }>
      <Route path="*" component={ Home } />
    </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById( 'root' )
)

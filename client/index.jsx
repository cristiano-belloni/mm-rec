import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { fetchSymbolsIfNeeded, setGeometry } from './actions'
import rootReducer from './reducers'
import Main from './containers/main'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './theme'
import style from './index.scss' // eslint-disable-line no-unused-vars

injectTapEventPlugin()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Main />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root-element')
)

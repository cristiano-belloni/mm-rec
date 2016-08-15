import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Main from './containers/main'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './theme'
import style from './index.scss' // eslint-disable-line no-unused-vars

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Main />
  </MuiThemeProvider>
  , document.getElementById('root-element')
)

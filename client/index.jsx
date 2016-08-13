import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './theme'
import style from './index.scss'

injectTapEventPlugin()

ReactDOM.render(<div>Placeholder</div>, document.getElementById('root-element'))

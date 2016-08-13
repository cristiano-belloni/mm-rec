import { teal500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#000000',
    primary1Color: teal500
  },
  toolbar: {
    backgroundColor: '#455A64'
  },
  tabs: {
    backgroundColor: '#546E7A'
  },
  inkBar: {
    backgroundColor: '#F44336'
  }
})

export default muiTheme

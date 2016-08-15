import { indigo500, indigo300 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#000000',
    primary1Color: indigo500
  },
  toolbar: {
    backgroundColor: indigo300
  }
})

export default muiTheme

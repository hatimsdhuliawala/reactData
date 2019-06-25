import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignInSuccess from 'react-praxis-components/SignInSuccess'
import Layout from './Layout/Layout'
import muiTheme from '../config/themeConfig'

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <BrowserRouter>
      <Switch>
        {/* Display SignInSuccess without Layout */}
        <Route exact path="/auth/login" component={SignInSuccess} />
        <Route path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default App

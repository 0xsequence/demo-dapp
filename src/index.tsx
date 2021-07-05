import React from 'react'
import ReactDOM from 'react-dom'

import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import { createStore, StoreProvider } from '~/stores'

import App from './App'

const rootStore = createStore()

const browserHistory = createBrowserHistory()

ReactDOM.render(
  <>
    <StoreProvider store={rootStore}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </StoreProvider>
  </>,
  document.getElementById('app')
)

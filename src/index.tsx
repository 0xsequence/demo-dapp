import { ThemeProvider } from '@0xsequence/design-system'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import '@0xsequence/design-system/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

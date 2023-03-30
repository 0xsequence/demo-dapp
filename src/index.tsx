import { ThemeProvider } from '@0xsequence/design-system'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import '@0xsequence/design-system/styles.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

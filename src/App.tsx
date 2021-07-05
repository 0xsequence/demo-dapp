import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Routes from '~/routes'

import { Helmet } from 'react-helmet'
import { Reset, ThemeProvider, theme, Styled } from '~/style'


const App = () => {
  return (
    <>
      <Helmet>
        <title>Demo Dapp</title>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Barlow:400,500,600,700|Barlow+Condensed:400,500,600|Roboto+Mono:400,500|Roboto+Condensed:400,500,600"
        />
      </Helmet>

      <ThemeProvider theme={theme}>
        <Styled.root>
          <Routes />
        </Styled.root>

        <Reset />
      </ThemeProvider>
    </>
  )
}

export default hot(withRouter(App))

import React from 'react'
import { Global, css } from '@emotion/core'

export const Reset = () => <Global styles={theme => global(theme)} />

// TODO: perhaps grab from theme.styles.root and set values in here..
// check the 'get' helper method from theme-ui to query the values based on key

const global = theme => css`
  ${reset}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  body {
    text-size-adjust: none;
    touch-action: manipulation;
    font-family: Barlow;
  }

  html,
  body,
  #app {
    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    /* background-color: ${theme.colors.window.background}; */
  }

  #app {
    width: 100%;
  }

  #portal {
    width: auto;
    height: auto;
  }

  .outlet,
  .router-transition-group,
  .router-transition-item {
    height: 100%;
  }

  html {
    /* font-family: ${theme.fonts.monospace}; */
  }

  body {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    font-size: 1rem;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: black;
  }
`

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/
    v4.0 | 20180602
    License: none (public domain)
  */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

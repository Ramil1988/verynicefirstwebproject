import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    font-family: sans-serif
  }

  div {
    margin: 10px;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
/*  
html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 5px;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  html, body {
    background-color: white;
    max-width: 100vw;
  }

    body {
    line-height: 1.25;
    background: white;
    color: black;
  }
  
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)

*/
`;

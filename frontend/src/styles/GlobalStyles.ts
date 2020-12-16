import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    :root {
        --black: #2E2E2E;
        --darkGrey: #959599;
    }
    html {
        font-size: 10px;
    }
    h1 {
        margin: 0;
        font-size: 3rem;
        font-weight: 600;
    }
    a {
        text-decoration: none;
    }

    ${`.gatsby-image-wrapper img[src*=base64\\,]`} {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }
`

export default GlobalStyles

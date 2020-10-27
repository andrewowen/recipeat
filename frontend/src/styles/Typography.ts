import { createGlobalStyle } from "styled-components"
import font from "../assets/fonts/inter.ttf"

const Typography = createGlobalStyle`
    @font-face {
        font-family: Inter;
        src: url(${font})
    }
    html {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: var(--black)
    }
`

export default Typography

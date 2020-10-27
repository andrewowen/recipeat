import React, { FC } from "react"
import styled from "styled-components"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"

const SiteBorderStyles = styled.div`
  max-width: 1200px;
  display: grid;
  align-items: center;
  margin: auto auto 4rem auto;
  background: white;
  border-radius: 1rem;
`

const Layout: FC = ({ children }) => {
  return (
    <SiteBorderStyles>
      <>
        <GlobalStyles />
        <Typography />
        {children}
      </>
    </SiteBorderStyles>
  )
}

export default Layout

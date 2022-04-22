/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react"
import { PageProps } from "gatsby"

import { Navbar, SEO, SEOWithQueryProps } from "@components/index"
import { GlobalStyles, GlobalContainer, InnerContainer } from "./styles"

type GlobalLayoutProps = {
  location: PageProps["location"]
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, location }) => {
  const seoProps = React.useMemo<SEOWithQueryProps>(() => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Abacus Protocol",
        }
      default:
        return {
          title: "Abacus Protocol",
        }
    }
  }, [location.pathname])

  return (
    <>
      <SEO {...seoProps} />
      <GlobalStyles />
      <Navbar />
      <GlobalContainer>
        <InnerContainer>{children}</InnerContainer>
      </GlobalContainer>
    </>
  )
}

export default GlobalLayout

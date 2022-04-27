/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react"
import { PageProps } from "gatsby"
import Helmet from "react-helmet"

import { Navbar, SEO, SEOWithQueryProps } from "@components/index"
import { GlobalStyles, GlobalContainer, InnerContainer } from "./styles"

type GlobalLayoutProps = {
  location: PageProps["location"]
}

const fonts = [
  { type: "ttf", url: "/fonts/Inter-Regular.ttf" },
  { type: "ttf", url: "/fonts/Inter-SemiBold.ttf" },
  { type: "ttf", url: "/fonts/Inter-Bold.ttf" },
  { type: "otf", url: "/fonts/BluuNext-Bold.otf" },
]

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
      <Helmet>
        {fonts.map((font) => (
          <link
            key={font.url}
            rel="preload"
            href={font.url}
            as="font"
            type={`font/${font.type}`}
            crossOrigin="true"
          />
        ))}
      </Helmet>
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

import React, { useState } from "react"
import styled from "styled-components"
import { ChevronsLeft, AlignJustify } from "react-feather"
import { Row } from "shards-react"
import Button, { ButtonsWhite } from "../Button"
import Link from "gatsby-link"

const RowStyled = styled(Row)`
  margin: 0;
  padding: 0px;
  transition: 0.3s;
  @media ${({ theme }) => theme.media.phone} {
    margin: unset;
  }
`

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text1};
`

const CategoryList = styled.div`
  display: flex;
  margin-top: 15px;
  @media ${({ theme }) => theme.media.phone} {
    margin: 0;
    grid-gap: 8px;
  }
`

const CategoryLink = styled(Button)`
  border-radius: 53px;
  padding: 8px 16px;
  min-width: fit-content;
  transition: 0.1s;

  &:first-of-type {
    margin-right: 8px;
  }
`

const SecondaryCategoryLink = styled(ButtonsWhite)`
  border-radius: 53px;
  padding: 8px 16px;
  min-width: fit-content;
  transition: 0.1s;
`

const NavbarContainer = styled.div`
  display: flex;
  padding: 0;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  @media ${({ theme }) => theme.media.phone} {
    grid-gap: 30px;
    justify-content: flex-start;
    height: 60px;
    padding: 24px;
    flex-direction: row;
  }
`

const DashedLine = styled.div`
  height: 1px;
  padding: 0px 30px;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.text2};
`

const Navbar = () => {
  return (
    <RowStyled>
      <NavbarContainer>
        <Logo to="/">Abacus</Logo>
        <DashedLine />
        <CategoryList>
          <CategoryLink as={"a"} href="https://app.abacus.wtf">
            Launch App
          </CategoryLink>
          <SecondaryCategoryLink
            target={"_blank"}
            as={"a"}
            href="/Abacus_White_Paper.pdf"
          >
            Whitepaper
          </SecondaryCategoryLink>
        </CategoryList>
      </NavbarContainer>
    </RowStyled>
  )
}

export default Navbar

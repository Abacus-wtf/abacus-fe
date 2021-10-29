import React, {useState} from 'react'
import styled from 'styled-components'
import { ChevronsLeft, AlignJustify } from "react-feather";
import {Row} from 'shards-react'
import Button, {ButtonsWhite} from '../Button'
import Link from 'gatsby-link'

const RowStyled = styled(Row)`
  padding: 0px;
  transition: 0.3s;
`

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text1};
`

const CategoryList = styled.div`
  display: flex;
  grid-gap: 8px;
`

const CategoryLink = styled(Button)`
  border-radius: 53px;
  padding: 8px 16px;
  min-width: fit-content;
  transition: 0.1s;
`

const SecondaryCategoryLink = styled(ButtonsWhite)`
  border-radius: 53px;
  padding: 8px 16px;
  min-width: fit-content;
  transition: 0.1s;
`

const NavbarContainer = styled.div`
  height: 60px;
  display: flex;
  grid-gap: 30px;
  padding: 24px;
  align-items: center;
`

const DashedLine = styled.div`
  height: 1px;
  padding: 0px 30px;
  width: 250px;
  background-color: ${({theme}) => theme.colors.text2};
`

const Navbar = () => {
  return (
    <RowStyled>
      <NavbarContainer>
        <Logo to="/">
          Abacus
        </Logo>
        <DashedLine />
        <CategoryList>
          <CategoryLink as={Link} to="/">
            Launch App
          </CategoryLink>
          <SecondaryCategoryLink target={'_blank'} as={'a'} href="/Abacus_White_Paper.pdf">
            Whitepaper
          </SecondaryCategoryLink>
        </CategoryList>
      </NavbarContainer>
    </RowStyled>
  )
}

export default Navbar
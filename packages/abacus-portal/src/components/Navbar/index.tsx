import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { ChevronsLeft, AlignJustify } from "react-feather";
import {Row} from 'shards-react'
import Button, {ButtonClear} from '../Button'
import {useActiveWeb3React} from '@hooks/index'
import {shortenAddress} from '@config/utils'
import {useToggleWalletModal} from '@state/application/hooks'

const RowStyled = styled(Row)`
  padding: 0px;
  transition: 0.3s;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text1};
`

const activeClassName = "ACTIVE"

const LinkList = styled.div`
  display: flex;
  grid-gap: 40px;
`

const HeaderLink = styled(ButtonClear).attrs(props => ({
  activeClassName,
}))`
  min-width: fit-content;
  opacity: 0.4;
  transition: 0.2s;
  font-size: 1rem;

  &.${activeClassName} {
    opacity: 1;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  grid-gap: 30px;
  padding: 45px 80px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e4e6ee;
  background-color: ${({ theme }) => theme.colors.bg1};
`

const Navbar = () => {
  const {account, chainId, library} = useActiveWeb3React()
  const toggleWalletModal = useToggleWalletModal()

  return (
    <RowStyled>
      <NavbarContainer>
        <Logo to="/">Abacus</Logo>
        <LinkList>
          <HeaderLink as={Link} to="/">
            Home
          </HeaderLink>
          <HeaderLink as={Link} to="/my-sessions">
            My Sessions
          </HeaderLink>
          <HeaderLink as={Link} to="/claim-pool">
            Claim Pool
          </HeaderLink>
        </LinkList>
        <Button onClick={() => toggleWalletModal()}>
          {account ? shortenAddress(account) : 'Connect Wallet'}
        </Button>
      </NavbarContainer>
    </RowStyled>
  )
}

export default Navbar

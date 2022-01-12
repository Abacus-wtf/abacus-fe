import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Title, Subheader, UniversalContainer } from "@components/global.styles"
import Button, { ButtonsWhite } from "@components/Button"
import SearchBar from "@components/SeachBar"
import Card from "@components/Card"
import {
  useGetMultiSessionData,
  useMultiSessionState,
  useMultiSessionData,
} from "@state/sessionData/hooks"
import _ from "lodash"
import Link from "gatsby-link"
import { PromiseStatus } from "@models/PromiseStatus"
import { BackgroundIMG, HeaderBar, CardContainer, Header, HeaderBarContainer } from "./Home.styles"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { useActiveWeb3React } from "@hooks/index"

const Home: React.FC = () => {
  const getMultiSessionData = useGetMultiSessionData()
  const multiSessionData = useMultiSessionData()
  const [searchValue, setSearchValue] = useState("")
  const multiSessionState = useMultiSessionState()
  const isLoading = multiSessionState.fetchStatus === PromiseStatus.Pending
  const networkSymbol = useGetCurrentNetwork()

  useEffect(() => {
    if (networkSymbol) {
      getMultiSessionData()
    }
  }, [networkSymbol])

  return (
    <UniversalContainer>
      <BackgroundIMG />
      <HeaderBar>
        <Header>
          <Title>Highlighted</Title>
          <Subheader>
            Browse {multiSessionData ? multiSessionData.length : "-"} Total
            Sessions
          </Subheader>
        </Header>
        <HeaderBarContainer>
          {/* <ButtonsWhite>Filter</ButtonsWhite>
          <SearchBar
            input={searchValue}
            changeInput={input => setSearchValue(input)}
            placeholder={"Find something"}
            onEnter={() => {}}
          /> */}
          <Button
            style={{ display: "flex", alignItems: "center" }}
            as={Link}
            to="/create-session"
          >
            Create Session
          </Button>
        </HeaderBarContainer>
      </HeaderBar>
      {isLoading ? (
        <UniversalContainer style={{ alignItems: "center" }}>
          Loading... {/* TODO: find a loader */}
        </UniversalContainer>
      ) : (
        <CardContainer>
          {_.map(multiSessionData, (i) => (
            <Card key={`${i.address}-${i.tokenId}-${i.nonce}`} {...i} />
          ))}
        </CardContainer>
      )}
    </UniversalContainer>
  )
}

export default Home
